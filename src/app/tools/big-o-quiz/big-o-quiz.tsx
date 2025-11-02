'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CodeBlock } from '@/components/code-block';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Timer, Play, Pause, RefreshCw, RotateCcw, ChevronRight } from 'lucide-react';
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
        code: `function findFirstTwo(items) {\n  console.log(items[0]);\n  console.log(items[1]);\n}`,
        options: ['O(1)', 'O(n)', 'O(2)'],
        correctAnswer: 'O(1)',
        explanation: 'This function performs a fixed number of operations (two lookups) regardless of the input array\'s size. Since the work does not grow with `n`, the complexity is constant, or O(1).',
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

export default function BigOQuiz() {
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
        const questionsToSelect = Math.min(settings.numQuestions, filteredQuestions.length);
        const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, questionsToSelect);
        
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