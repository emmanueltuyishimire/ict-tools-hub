'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Play, Pause, RefreshCw, StepForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/code-block';
import { AnimatePresence, motion } from 'framer-motion';

type CallStackFrame = {
    id: number;
    n: number;
    status: 'calling' | 'returning' | 'base-case';
    returnValue?: bigint;
};

let callId = 0;

export function RecursionSimulator() {
    const [numberInput, setNumberInput] = useState<number | ''>(5);
    const [callStack, setCallStack] = useState<CallStackFrame[]>([]);
    const [finalResult, setFinalResult] = useState<bigint | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [steps, setSteps] = useState<CallStackFrame[][]>([]);

    useEffect(() => {
        if (isPlaying && stepIndex < steps.length - 1) {
            const timer = setTimeout(() => {
                setStepIndex(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timer);
        } else if (isPlaying) {
            setIsPlaying(false);
        }
    }, [isPlaying, stepIndex, steps.length]);

    useEffect(() => {
        if (steps.length > 0) {
            setCallStack(steps[stepIndex]);
        }
    }, [stepIndex, steps]);

    const handleSimulate = () => {
        const num = Number(numberInput);
        if (isNaN(num) || num < 0 || num > 15 || !Number.isInteger(num)) {
            alert('Please enter a non-negative integer up to 15.');
            return;
        }

        callId = 0;
        const simulationSteps: CallStackFrame[][] = [];
        let tempStack: CallStackFrame[] = [];

        function factorial(n: number): bigint {
            const currentId = ++callId;
            // Push 'calling' state
            tempStack.push({ id: currentId, n, status: 'calling' });
            simulationSteps.push([...tempStack]);

            if (n === 0) {
                // Push 'base-case' state
                tempStack[tempStack.length - 1].status = 'base-case';
                tempStack[tempStack.length - 1].returnValue = 1n;
                simulationSteps.push([...tempStack]);
                return 1n;
            }

            const result = BigInt(n) * factorial(n - 1);
            
            // The call to factorial(n-1) has returned.
            // Update current frame to 'returning'
            const returningFrame = tempStack.find(f => f.id === currentId);
            if (returningFrame) {
                 returningFrame.status = 'returning';
                 returningFrame.returnValue = result;
            }
           
            simulationSteps.push([...tempStack]);
            
            // Pop the stack
            tempStack.pop();
            simulationSteps.push([...tempStack]);

            return result;
        }

        const result = factorial(num);
        setFinalResult(result);
        setSteps(simulationSteps);
        setStepIndex(0);
        setCallStack(simulationSteps[0]);
    };
    
    const handleStep = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(prev => prev + 1);
        }
    };
    
    const handleReset = () => {
        setCallStack([]);
        setFinalResult(null);
        setIsPlaying(false);
        setStepIndex(0);
        setSteps([]);
    }

    const currentFrame = callStack[callStack.length - 1];
    let explanation = '';
    if (currentFrame) {
        if (currentFrame.status === 'calling') {
            explanation = `Calling factorial(${currentFrame.n}). Since ${currentFrame.n} is not 0, we must first compute factorial(${currentFrame.n - 1}).`;
        } else if (currentFrame.status === 'base-case') {
            explanation = `Base case reached: factorial(0) returns 1. The stack will now unwind.`;
        } else if (currentFrame.status === 'returning') {
            explanation = `factorial(${currentFrame.n + 1}) returned ${currentFrame.returnValue! / BigInt(currentFrame.n)}. Now calculating ${currentFrame.n} \u00d7 ${currentFrame.returnValue! / BigInt(currentFrame.n)} = ${currentFrame.returnValue}. Returning this value.`;
             if (currentFrame.n === Number(numberInput)) {
                explanation = `Final calculation: ${currentFrame.n} \u00d7 ${currentFrame.returnValue! / BigInt(currentFrame.n)} = ${currentFrame.returnValue}. The final result is returned.`;
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recursion Simulator: Factorial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="number-input">Calculate factorial of (n)</Label>
                        <Input
                            id="number-input"
                            type="number"
                            value={numberInput}
                            onChange={(e) => setNumberInput(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                            placeholder="Enter a number (0-15)"
                            className="font-code"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button onClick={handleSimulate} className="flex-1">Start</Button>
                        <Button onClick={handleReset} variant="outline" className="flex-1">Reset</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Code</h3>
                        <CodeBlock language="javascript" code={`function factorial(n) {
  if (n === 0) {
    return 1; // Base Case
  } else {
    // Recursive Case
    return n * factorial(n - 1);
  }
}`}/>
                        {steps.length > 0 && (
                            <div className="flex gap-2">
                                <Button onClick={() => setIsPlaying(p => !p)} disabled={stepIndex >= steps.length - 1}>
                                    {isPlaying ? <Pause className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4"/>}
                                    {isPlaying ? 'Pause' : 'Play'}
                                </Button>
                                 <Button onClick={handleStep} variant="outline" disabled={isPlaying || stepIndex >= steps.length - 1}>
                                    <StepForward className="mr-2 h-4 w-4"/> Step
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                         <h3 className="font-semibold">Call Stack</h3>
                         <div className="h-[280px] bg-muted/50 p-4 rounded-lg border flex flex-col-reverse justify-start gap-2 overflow-hidden">
                             <AnimatePresence>
                                {callStack.map((frame, index) => (
                                    <motion.div
                                        key={frame.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className={cn(
                                            "p-2 rounded-md border text-sm font-mono text-center transition-all",
                                            frame.status === 'calling' && 'bg-blue-100 dark:bg-blue-900/30 border-blue-300',
                                            frame.status === 'base-case' && 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400',
                                            frame.status === 'returning' && 'bg-green-100 dark:bg-green-900/30 border-green-400',
                                        )}
                                    >
                                        factorial({frame.n})
                                        {frame.status === 'returning' && ` -> returns ${frame.returnValue}`}
                                        {frame.status === 'base-case' && ` -> returns 1`}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                         </div>
                    </div>
                </div>

                {steps.length > 0 && (
                    <div className="space-y-2">
                         <h3 className="font-semibold">Explanation</h3>
                         <div className="min-h-[6rem] bg-muted/50 p-4 rounded-lg border">
                             <p className="font-mono text-sm text-muted-foreground">{explanation || 'Click "Start" to begin simulation.'}</p>
                         </div>
                    </div>
                )}
                
                {finalResult !== null && stepIndex >= steps.length -1 && (
                     <Card className="bg-green-100 dark:bg-green-900/30 border-green-400 text-center p-6">
                        <CardTitle>Final Result</CardTitle>
                         <p className="text-3xl font-bold font-mono mt-2">{finalResult.toString()}</p>
                     </Card>
                )}
            </CardContent>
        </Card>
    );
}
