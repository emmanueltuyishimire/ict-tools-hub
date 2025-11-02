
'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle, Lightbulb, Timer, Play, Pause, RefreshCw, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CodeBlock } from '@/components/code-block';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type QuestionLevel = 'Beginner' | 'Intermediate' | 'Pro';

const allQuizQuestions = [
    {
        code: `function findFirst(items) {\n  return items[0];\n}`,
        options: ['O(1)', 'O(n)', 'O(log n)'],
        correctAnswer: 'O(1)',
        explanation: 'This function performs a single operation (accessing the first element) regardless of the size of the input array. Its runtime is constant, making it O(1).',
        level: 'Beginner' as QuestionLevel
    },
    {
        code: `function containsValue(items, value) {\n  for (let item of items) {\n    if (item === value) {\n      return true;\n    }\n  }\n  return false;\n}`,
        options: ['O(n²)', 'O(log n)', 'O(n)'],
        correctAnswer: 'O(n)',
        explanation: 'In the worst-case scenario, this function has to loop through every single item in the array to find the value. The runtime grows linearly with the number of items (n), making it O(n).',
        level: 'Beginner' as QuestionLevel
    },
    {
        code: `function hasDuplicates(items) {\n  for (let i = 0; i < items.length; i++) {\n    for (let j = 0; j < items.length; j++) {\n      if (i !== j && items[i] === items[j]) {\n        return true;\n      }\n    }\n  }\n  return false;\n}`,
        options: ['O(n log n)', 'O(n²)', 'O(n)'],
        correctAnswer: 'O(n²)',
        explanation: 'This function contains a nested loop where it compares every item to every other item. This results in n * n operations, leading to quadratic time complexity, O(n²), which is very inefficient for large inputs.',
        level: 'Beginner' as QuestionLevel
    },
    {
        code: `function sumAndProduct(items) {\n  let sum = 0; // O(1)\n  let product = 1; // O(1)\n\n  for (let item of items) { // O(n)\n    sum += item;\n  }\n\n  for (let item of items) { // O(n)\n    product *= item;\n  }\n\n  return [sum, product];\n}`,
        options: ['O(n²)', 'O(n)', 'O(1)'],
        correctAnswer: 'O(n)',
        explanation: 'The function has two separate loops that each run `n` times. The total complexity is O(n + n), which simplifies to O(2n). In Big O notation, we drop constant factors, so the final complexity is O(n).',
        level: 'Beginner' as QuestionLevel
    },
    {
        code: `// Assuming 'sortedItems' is a sorted array\nfunction findInSorted(sortedItems, value) {\n  let low = 0;\n  let high = sortedItems.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (sortedItems[mid] === value) return true;\n    if (sortedItems[mid] < value) low = mid + 1;\n    else high = mid - 1;\n  }\n  return false;\n}`,
        options: ['O(1)', 'O(log n)', 'O(n)'],
        correctAnswer: 'O(log n)',
        explanation: 'This is a binary search algorithm. With each step, it cuts the search space in half. This logarithmic growth is extremely efficient, as doubling the input size only adds one extra operation. This is O(log n).',
        level: 'Intermediate' as QuestionLevel
    },
    {
        code: `// Recursive factorial calculation\nfunction factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}`,
        options: ['O(n)', 'O(1)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'The function calls itself `n` times before reaching the base case (n=0). This creates a call stack of depth `n`, leading to linear time complexity, O(n).',
        level: 'Intermediate' as QuestionLevel
    },
    {
        code: `// Merge Sort\nfunction mergeSort(items) {\n  if (items.length <= 1) return items;\n  const middle = Math.floor(items.length / 2);\n  const left = items.slice(0, middle);\n  const right = items.slice(middle);\n  return merge(mergeSort(left), mergeSort(right));\n}`,
        options: ['O(n²)', 'O(n log n)', 'O(n)'],
        correctAnswer: 'O(n log n)',
        explanation: 'This represents the Merge Sort algorithm. The list is recursively divided in half (which gives the log n part), and then each element is merged back together (which gives the n part). The resulting complexity is O(n log n), a hallmark of efficient sorting algorithms.',
        level: 'Intermediate' as QuestionLevel
    },
    {
        code: `function findFirstTwo(items) {\n  console.log(items[0]);\n  console.log(items[1]);\n}`,
        options: ['O(1)', 'O(n)', 'O(2)'],
        correctAnswer: 'O(1)',
        explanation: 'This function performs a fixed number of operations (two lookups) regardless of the input array\'s size. Since the work does not grow with `n`, the complexity is constant, or O(1).',
        level: 'Beginner' as QuestionLevel
    },
    {
        code: `// Optimized duplicate check\nfunction hasDuplicatesOptimized(items) {\n  const seen = new Set();\n  for (const item of items) {\n    if (seen.has(item)) {\n      return true;\n    }\n    seen.add(item);\n  }\n  return false;\n}`,
        options: ['O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'This version iterates through the list once. Set lookups (`.has()`) and insertions (`.add()`) are, on average, O(1) operations. Therefore, the overall complexity is dominated by the single loop, making it O(n).',
        level: 'Intermediate' as QuestionLevel
    },
     {
        code: `// Naive recursive Fibonacci\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}`,
        options: ['O(n log n)', 'O(2ⁿ)', 'O(n²)'],
        correctAnswer: 'O(2ⁿ)',
        explanation: 'This naive recursive implementation of Fibonacci has exponential complexity. Each call to fib(n) generates two more calls, leading to a tree of calls that grows exponentially. The number of operations is roughly proportional to 2 to the power of n.',
        level: 'Pro' as QuestionLevel
    },
    {
        code: `function allSubsets(items) {\n  const subsets = [[]];\n  for (const item of items) {\n    const currentSubsets = [];\n    for (const subset of subsets) {\n      currentSubsets.push([...subset, item]);\n    }\n    subsets.push(...currentSubsets);\n  }\n  return subsets;\n}`,
        options: ['O(n * 2ⁿ)', 'O(n²)', 'O(2ⁿ)'],
        correctAnswer: 'O(n * 2ⁿ)',
        explanation: 'Generating all subsets (the power set) of a set of size n results in 2ⁿ subsets. The loops in this algorithm iterate through all existing subsets to create new ones for each item, leading to a complexity of roughly n times 2ⁿ.',
        level: 'Pro' as QuestionLevel
    },
    {
        code: `function printAllPermutations(items, prefix = '') {\n  if (items.length === 0) {\n    console.log(prefix);\n  } else {\n    for (let i = 0; i < items.length; i++) {\n      const rem = items.slice(0, i).concat(items.slice(i + 1));\n      printAllPermutations(rem, prefix + items[i]);\n    }\n  }\n}`,
        options: ['O(n!)', 'O(n log n)', 'O(n * 2ⁿ)'],
        correctAnswer: 'O(n!)',
        explanation: 'This recursive function generates all possible orderings (permutations) of the input items. The number of permutations for n items is n factorial (n!). The complexity grows extremely fast, making it only feasible for very small inputs.',
        level: 'Pro' as QuestionLevel
    }
];

function BigOQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
    const [quizState, setQuizState] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');
    const [quizQuestions, setQuizQuestions] = useState<(typeof allQuizQuestions[0])[]>([]);
    const [settings, setSettings] = useState({ numQuestions: 5, timeLimit: '2', level: 'Beginner' as QuestionLevel });
    const [timeLeft, setTimeLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const score = useMemo(() => {
        if (quizQuestions.length === 0) return 0;
        return userAnswers.reduce((total, answer, index) => {
            return total + (answer === quizQuestions[index]?.correctAnswer ? 1 : 0);
        }, 0);
    }, [userAnswers, quizQuestions]);

    const finishQuiz = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setQuizState('finished');
        setIsPaused(false);
    }, []);

    useEffect(() => {
        if (quizState === 'in-progress' && !isPaused && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && quizState === 'in-progress' && settings.timeLimit !== 'None') {
            finishQuiz();
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [quizState, timeLeft, finishQuiz, isPaused, settings.timeLimit]);

    const handleAnswer = (answer: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishQuiz();
        }
    };
    
    const handleStart = () => {
        const filteredQuestions = allQuizQuestions.filter(q => q.level === settings.level);
        const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, settings.numQuestions);
        
        setQuizQuestions(selectedQuestions);
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(selectedQuestions.length).fill(null));
        if (settings.timeLimit !== 'None') {
            setTimeLeft(parseInt(settings.timeLimit) * 60);
        } else {
            setTimeLeft(-1); // Use -1 to indicate no time limit
        }
        setIsPaused(false);
        setQuizState('in-progress');
    };

    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(quizQuestions.length).fill(null));
        if (settings.timeLimit !== 'None') {
            setTimeLeft(parseInt(settings.timeLimit) * 60);
        }
        setIsPaused(false);
    };
    
    const getFeedback = () => {
        const percentage = (score / quizQuestions.length) * 100;
        if (percentage === 100) return { title: 'Perfect Score!', message: 'Flawless execution! You have a masterful understanding of time complexity.' };
        if (percentage >= 80) return { title: 'Great Job!', message: 'Excellent performance! You clearly have a strong grasp of these concepts.' };
        if (percentage >= 60) return { title: 'Good Effort!', message: 'Solid work! Keep practicing to solidify your understanding of the trickier concepts.' };
        if (percentage >= 40) return { title: 'Keep Trying!', message: 'You\'re on the right track! Review the explanations for the questions you missed.' };
        return { title: 'Practice Makes Perfect!', message: 'Don\'t be discouraged! Every expert was once a beginner. Review the concepts and try again.' };
    };

    if (quizState === 'not-started') {
        const questionsInLevel = allQuizQuestions.filter(q => q.level === settings.level).length;
        const numQuestionsValue = Math.min(settings.numQuestions, questionsInLevel);

        return (
             <Card>
                <CardHeader>
                    <CardTitle>Quiz Setup</CardTitle>
                    <CardDescription>Configure your quiz then click Start.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="level-select">Difficulty</Label>
                            <Select value={settings.level} onValueChange={(v) => setSettings(s => ({...s, level: v as QuestionLevel}))}>
                                <SelectTrigger id="level-select"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Pro">Pro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="num-questions">Number of Questions</Label>
                            <Input
                                id="num-questions"
                                type="number"
                                min="1"
                                max={questionsInLevel}
                                value={numQuestionsValue}
                                onChange={(e) => setSettings(s => ({...s, numQuestions: Math.max(1, Math.min(questionsInLevel, parseInt(e.target.value) || 1))}))}
                            />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="time-limit">Time Limit</Label>
                            <Select value={settings.timeLimit} onValueChange={v => setSettings(s => ({...s, timeLimit: v}))}>
                                <SelectTrigger id="time-limit"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Minute</SelectItem>
                                    <SelectItem value="2">2 Minutes</SelectItem>
                                    <SelectItem value="5">5 Minutes</SelectItem>
                                    <SelectItem value="None">None</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={handleStart}>Start Quiz</Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (quizState === 'finished') {
        const feedback = getFeedback();
        return (
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">{feedback.title}</CardTitle>
                    <CardDescription className="pt-2">{feedback.message}</CardDescription>
                    <p className="text-5xl font-bold text-primary pt-4">{score} / {quizQuestions.length}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <h3 className="font-semibold text-lg">Review Your Answers:</h3>
                    {quizQuestions.map((q, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${userAnswers[index] === q.correctAnswer ? 'border-green-500/50 bg-green-500/5' : 'border-destructive/50 bg-destructive/5'}`}>
                            <p className="font-medium">Question {index + 1}:</p>
                            <CodeBlock code={q.code} language="javascript" className="my-2"/>
                            <p className="text-sm">Your answer: <span className="font-semibold">{userAnswers[index] || 'No Answer'}</span></p>
                            <p className="text-sm">Correct answer: <span className="font-semibold">{q.correctAnswer}</span></p>
                             {userAnswers[index] !== q.correctAnswer && (
                                <p className="text-xs text-muted-foreground mt-2">{q.explanation}</p>
                            )}
                        </div>
                    ))}
                     <div className="flex justify-center gap-4">
                        <Button onClick={handleReset} variant="outline"><RotateCcw className="mr-2 h-4 w-4"/> Try Again</Button>
                        <Button onClick={() => setQuizState('not-started')}><RefreshCw className="mr-2 h-4 w-4"/> New Quiz</Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (!currentQuestion) return null; // Should not happen
    
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const minutes = timeLeft > 0 ? Math.floor(timeLeft / 60) : 0;
    const seconds = timeLeft > 0 ? timeLeft % 60 : 0;

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center flex-wrap gap-2">
                    <CardTitle>Question {currentQuestionIndex + 1} of {quizQuestions.length}</CardTitle>
                    {settings.timeLimit !== 'None' && (
                        <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                            <Timer className="h-5 w-5" />
                            <span className='font-mono'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
                        </div>
                    )}
                </div>
                 <Progress value={progress} className="w-full h-2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <p>What is the time complexity (Big O) of the following function?</p>
                <CodeBlock code={currentQuestion.code} language="javascript" />
                <RadioGroup onValueChange={handleAnswer} value={userAnswers[currentQuestionIndex] || ''} disabled={isPaused}>
                    {currentQuestion.options.map(option => (
                        <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${option}`} />
                            <Label htmlFor={`option-${option}`} className="font-mono">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        {settings.timeLimit !== 'None' && (
                             <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
                                {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                                {isPaused ? 'Resume' : 'Pause'}
                            </Button>
                        )}
                         <Button variant="destructive" onClick={() => setQuizState('not-started')}>End Quiz</Button>
                    </div>
                    <Button onClick={handleNext} disabled={!userAnswers[currentQuestionIndex] || isPaused}>
                        {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

const BigOComplexityQuizPage = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer.replace(/<[^>]*>?/gm, ''),
        },
    })),
  };

  const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Big-O Complexity Quiz",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An interactive quiz to test knowledge of Big O notation and algorithm time complexity.",
      "url": "https://www.icttoolbench.com/tools/big-o-quiz"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Big-O Complexity Quiz"
                    description="Test your understanding of Big O notation by identifying the time complexity of various code snippets. A quick and effective way to sharpen your algorithm analysis skills."
                />
                
                <BigOQuiz />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Quiz</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This quiz is designed to be a quick and interactive learning tool.</p>
                        <ol>
                            <li><strong>Configure Your Quiz:</strong> Choose the difficulty, number of questions you want and set a time limit in minutes.</li>
                            <li><strong>Start the Quiz:</strong> Click the "Start Quiz" button to begin. A random set of questions will be selected.</li>
                            <li><strong>Analyze the Code:</strong> For each question, carefully read the provided JavaScript code snippet. Pay attention to loops, nested loops, and how the function's operations relate to the size of the input.</li>
                            <li><strong>Select an Answer:</strong> Choose the Big O notation that best represents the worst-case time complexity of the function.</li>
                             <li><strong>Proceed or Finish:</strong> Click "Next Question" to continue. After the final question, or when the timer runs out, click "Finish Quiz" to see your score.</li>
                             <li><strong>Review Your Results:</strong> At the end, the tool will show you which questions you got right and wrong, along with detailed explanations for the incorrect answers to help you learn.</li>
                        </ol>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: Finding a User in a List (Linear Time - O(n))</CardTitle>
                                <CardDescription>A common task is searching for an item in a collection. If the collection is unsorted, the approach is straightforward but has clear performance implications.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You have an array of 1,000 user objects, and you need to find the user with a specific email address.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li>The algorithm starts at the first user in the array.</li>
                                       <li>It checks if that user's email matches the one you're looking for.</li>
                                       <li>If it doesn't match, it moves to the next user and repeats the process.</li>
                                   </ol>
                               </div>
                               <p className="text-sm text-muted-foreground"><strong>Worst Case:</strong> The user you are looking for is the very last one in the array, or not in the array at all. The algorithm must check all 1,000 users. If the list grows to 1,000,000 users, the worst-case scenario requires 1,000,000 checks. The number of operations grows in a straight, linear line with the number of users, `n`. This is <strong>O(n)</strong> complexity.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Finding Duplicates (Quadratic Time - O(n²))</CardTitle>
                                <CardDescription>A naive approach to finding if any duplicates exist in a list involves comparing every item to every other item.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You have a list of 100 product IDs and you need to verify if there are any duplicates.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li>The algorithm takes the first product ID.</li>
                                       <li>It then loops through the entire list again, comparing the first ID to every other ID.</li>
                                       <li>Once finished, it takes the second product ID and repeats the process, comparing it to every other ID.</li>
                                       <li>This continues until every item has been compared to every other item.</li>
                                   </ol>
                               </div>
                               <p className="text-sm text-muted-foreground"><strong>Worst Case:</strong> For a list of 100 items, this results in 100 × 100 = 10,000 comparisons. If the list grows to 1,000 items, it becomes 1,000,000 comparisons. The number of operations grows with the square of the input size, `n`. This is <strong>O(n²)</strong> complexity and becomes very slow, very quickly. A more efficient approach would use a hash set, which has an average time complexity of O(n).</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                
                <section>
                   <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
                   <Card>
                      <CardContent className="p-6">
                          <dl className="space-y-4">
                              {keyTerminologies.map((item) => (
                                  <div key={item.term}>
                                      <dt className="font-semibold">{item.term}</dt>
                                      <dd className="text-muted-foreground text-sm">{item.definition}</dd>
                                  </div>
                              ))}
                          </dl>
                      </CardContent>
                   </Card>
                </section>

                 <Card className='bg-secondary/30 border-primary/20'>
                    <CardHeader>
                        <div className='flex items-center gap-2 text-primary'>
                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                            <CardTitle className="text-primary">Educational Deep Dive: A Developer's Guide to Big O</CardTitle>
                        </div>
                        <CardDescription>From constant time to exponential growth, understand the language of algorithmic efficiency and write code that scales.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is Big O Notation?</h3>
                            <p>
                                Big O notation is a mathematical way to describe the performance and complexity of an algorithm. It answers the fundamental question: "As the input to my algorithm gets bigger, how much slower will it run?" It's not about measuring the exact time in seconds, but about describing the <strong>growth rate</strong> of the algorithm's runtime in the worst-case scenario. This allows developers to compare different solutions and choose the one that will remain efficient and scalable as data volumes increase.
                            </p>
                            <p>
                                When analyzing an algorithm, Big O simplifies the complexity by ignoring constant factors and lower-order terms. For example, an algorithm that takes <strong>3n² + 10n + 5</strong> operations is simply described as <strong>O(n²)</strong>. This is because as the input size `n` becomes very large, the `n²` term will overwhelmingly dominate the runtime, making the other terms insignificant. Understanding this helps in making informed decisions.
                            </p>
                        </section>
                         <section>
                            <h3>The Hierarchy of Common Complexities</h3>
                            <p>Understanding the common Big O complexities is essential for any developer. They form a hierarchy from best to worst performance at scale:</p>
                             <div className="overflow-x-auto my-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Notation</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Typical Example</TableHead>
                                            <TableHead>Performance</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow><TableCell className='font-code'>O(1)</TableCell><TableCell>Constant</TableCell><TableCell>Accessing an array index</TableCell><TableCell className='text-green-600 font-semibold'>Excellent</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(log n)</TableCell><TableCell>Logarithmic</TableCell><TableCell>Binary search</TableCell><TableCell className='text-green-600 font-semibold'>Excellent</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n)</TableCell><TableCell>Linear</TableCell><TableCell>Looping through a list</TableCell><TableCell className='text-lime-600 font-semibold'>Good</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n log n)</TableCell><TableCell>Linearithmic</TableCell><TableCell>Efficient sorting (Merge Sort)</TableCell><TableCell className='text-yellow-600 font-semibold'>Fair</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n²)</TableCell><TableCell>Quadratic</TableCell><TableCell>Nested loops (Bubble Sort)</TableCell><TableCell className='text-orange-600 font-semibold'>Poor</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(2ⁿ)</TableCell><TableCell>Exponential</TableCell><TableCell>Recursive Fibonacci</TableCell><TableCell className='text-red-600 font-semibold'>Terrible</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n!)</TableCell><TableCell>Factorial</TableCell><TableCell>Traveling Salesman (brute force)</TableCell><TableCell className='text-red-800 font-semibold'>Unusable</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                             </div>
                        </section>
                        <section>
                            <h3>Why This Quiz Matters</h3>
                             <p>
                                Being able to look at a piece of code and quickly identify its time complexity is a fundamental skill for any software engineer. It's a common topic in technical interviews and a crucial part of writing performant code. This quiz is designed to help you practice that skill in a fast, interactive format. By internalizing these patterns, you can start to think more critically about the performance implications of the code you write every day. For a more visual exploration, try our <Link href="/tools/big-o-calculator" className="text-primary hover:underline">Time Complexity Estimator</Link>.
                            </p>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Practical Tips</h2>
                     <Card>
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Identify the Core Loop</h4>
                                        <p className="text-sm text-muted-foreground">
                                            When analyzing your own code, the first step is to find the main loops. A single loop that goes through the input once is likely O(n). A pair of nested loops is often O(n²).
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Divide and Conquer is Logarithmic</h4>
                                        <p className="text-sm text-muted-foreground">
                                            If your algorithm works by repeatedly dividing the problem set in half (like binary search), it's likely to have an O(log n) component. You can see this in action with our <Link href="/tools/algorithm-simulator" className="text-primary hover:underline">Algorithm Step Simulator</Link>.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Use the Right Data Structure</h4>
                                        <p className="text-sm text-muted-foreground">
                                           A hash map (or `Object`/`Map` in JavaScript) provides, on average, O(1) constant time for insertions, deletions, and lookups. Using a hash map to check for duplicates is an O(n) operation, which is vastly better than the O(n²) nested loop approach.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                     </Card>
                </section>
                
               <section>
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <Card>
                      <CardContent className="p-6">
                          <Accordion type="single" collapsible className="w-full">
                              {faqData.map((item, index) => (
                                  <AccordionItem value={`item-${index}`} key={index}>
                                      <AccordionTrigger>{item.question}</AccordionTrigger>
                                      <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                      </AccordionContent>
                                  </AccordionItem>
                              ))}
                          </Accordion>
                      </CardContent>
                  </Card>
              </section>

              <section>
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/tools/big-o-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Time Complexity Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Visualize the growth curves of different Big O notations on a graph.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/algorithm-simulator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Algorithm Step Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Watch algorithms like Bubble Sort (O(n²)) execute step-by-step to see their complexity in action.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default BigOComplexityQuizPage;
