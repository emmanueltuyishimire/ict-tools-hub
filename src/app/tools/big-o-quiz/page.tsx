
'use client';

import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CodeBlock } from '@/components/code-block';
import { Progress } from '@/components/ui/progress';

const quizQuestions = [
    {
        code: `function findFirst(items) {\n  return items[0];\n}`,
        options: ['O(1)', 'O(n)', 'O(log n)'],
        correctAnswer: 'O(1)',
        explanation: 'This function performs a single operation (accessing the first element) regardless of the size of the input array. Its runtime is constant, making it O(1).'
    },
    {
        code: `function containsValue(items, value) {\n  for (let item of items) {\n    if (item === value) {\n      return true;\n    }\n  }\n  return false;\n}`,
        options: ['O(n²)', 'O(log n)', 'O(n)'],
        correctAnswer: 'O(n)',
        explanation: 'In the worst-case scenario, this function has to loop through every single item in the array to find the value. The runtime grows linearly with the number of items (n), making it O(n).'
    },
    {
        code: `function hasDuplicates(items) {\n  for (let i = 0; i < items.length; i++) {\n    for (let j = 0; j < items.length; j++) {\n      if (i !== j && items[i] === items[j]) {\n        return true;\n      }\n    }\n  }\n  return false;\n}`,
        options: ['O(n log n)', 'O(n²)', 'O(n)'],
        correctAnswer: 'O(n²)',
        explanation: 'This function contains a nested loop where it compares every item to every other item. This results in n * n operations, leading to quadratic time complexity, O(n²), which is very inefficient for large inputs.'
    },
    {
        code: `// Assuming 'sortedItems' is a sorted array\nfunction findInSorted(sortedItems, value) {\n  let low = 0;\n  let high = sortedItems.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (sortedItems[mid] === value) return true;\n    if (sortedItems[mid] < value) low = mid + 1;\n    else high = mid - 1;\n  }\n  return false;\n}`,
        options: ['O(1)', 'O(log n)', 'O(n)'],
        correctAnswer: 'O(log n)',
        explanation: 'This is a binary search algorithm. With each step, it cuts the search space in half. This logarithmic growth is extremely efficient, as doubling the input size only adds one extra operation. This is O(log n).'
    },
    {
        code: `function printPairs(items) {\n  for (let item of items) {\n    console.log('---');\n    for (let otherItem of items) {\n      // O(1) operation\n    }\n  }\n}`,
        options: ['O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n²)',
        explanation: 'The nested loops are the key here. The outer loop runs n times, and for each of those iterations, the inner loop also runs n times. The total number of operations is approximately n * n, resulting in O(n²) complexity.'
    }
];

function BigOQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>(new Array(quizQuestions.length).fill(null));
    const [quizState, setQuizState] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');

    const score = useMemo(() => {
        return userAnswers.reduce((total, answer, index) => {
            return total + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
        }, 0);
    }, [userAnswers]);

    const handleAnswer = (answer: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizState('finished');
        }
    };
    
    const handleStart = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(quizQuestions.length).fill(null));
        setQuizState('in-progress');
    };
    
    if (quizState === 'not-started') {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Test Your Knowledge</CardTitle>
                    <CardDescription>This short quiz will test your ability to identify the time complexity of common algorithms.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button onClick={handleStart}>Start Quiz</Button>
                </CardContent>
            </Card>
        )
    }

    if (quizState === 'finished') {
        return (
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Quiz Complete!</CardTitle>
                    <CardDescription>You scored</CardDescription>
                    <p className="text-4xl font-bold text-primary">{score} / {quizQuestions.length}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <h3 className="font-semibold text-lg">Review Your Answers:</h3>
                    {quizQuestions.map((q, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${userAnswers[index] === q.correctAnswer ? 'border-green-500/50 bg-green-500/5' : 'border-destructive/50 bg-destructive/5'}`}>
                            <p className="font-medium">Question {index + 1}:</p>
                            <CodeBlock code={q.code} language="javascript" className="my-2"/>
                            <p className="text-sm">Your answer: <span className="font-semibold">{userAnswers[index]}</span></p>
                            <p className="text-sm">Correct answer: <span className="font-semibold">{q.correctAnswer}</span></p>
                             {userAnswers[index] !== q.correctAnswer && (
                                <p className="text-xs text-muted-foreground mt-2">{q.explanation}</p>
                            )}
                        </div>
                    ))}
                     <div className="flex justify-center">
                        <Button onClick={handleStart}>Try Again</Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1} of {quizQuestions.length}</CardTitle>
                 <Progress value={progress} className="w-full h-2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <p>What is the time complexity (Big O) of the following function?</p>
                <CodeBlock code={currentQuestion.code} language="javascript" />
                <RadioGroup onValueChange={handleAnswer} value={userAnswers[currentQuestionIndex] || ''}>
                    {currentQuestion.options.map(option => (
                        <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${option}`} />
                            <Label htmlFor={`option-${option}`} className="font-mono">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
                <div className="flex justify-end">
                    <Button onClick={handleNext} disabled={!userAnswers[currentQuestionIndex]}>
                        {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
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
                            <li><strong>Start the Quiz:</strong> Click the "Start Quiz" button to begin.</li>
                            <li><strong>Analyze the Code:</strong> For each question, carefully read the provided JavaScript code snippet. Pay attention to loops, nested loops, and how the function's operations relate to the size of the input.</li>
                            <li><strong>Select an Answer:</strong> Choose the Big O notation that best represents the worst-case time complexity of the function.</li>
                            <li><strong>Proceed or Finish:</strong> Click "Next Question" to continue. After the final question, click "Finish Quiz" to see your score.</li>
                             <li><strong>Review Your Results:</strong> At the end, the tool will show you which questions you got right and wrong, along with detailed explanations for the incorrect answers to help you learn.</li>
                        </ol>
                    </Card>
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
                            <h3>Why This Quiz Matters</h3>
                             <p>
                                Being able to look at a piece of code and quickly identify its time complexity is a fundamental skill for any software engineer. It's a common topic in technical interviews and a crucial part of writing performant code. This quiz is designed to help you practice that skill in a fast, interactive format. By internalizing these patterns, you can start to think more critically about the performance implications of the code you write every day. For a more visual exploration, try our <Link href="/tools/big-o-calculator" className="text-primary hover:underline">Time Complexity Estimator</Link>.
                            </p>
                        </section>
                    </CardContent>
                </Card>
                
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
