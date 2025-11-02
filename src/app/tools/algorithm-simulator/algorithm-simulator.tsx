
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Play, Pause, RotateCcw, SkipForward, Shuffle, Search, Lightbulb, Gamepad } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type Algorithm = 'bubbleSort' | 'linearSearch';
type SimulationStatus = 'idle' | 'playing' | 'paused' | 'finished' | 'challenge';

interface Step {
  array: number[];
  highlight: number[];
  compare?: number[]; // The two elements being compared right now
  sorted: number[];
  message: string;
}

const generateRandomArray = (size = 10) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
};

// --- Algorithm Implementations ---
function* bubbleSort(arr: number[]): Generator<Step> {
  const array = [...arr];
  const n = array.length;
  let sortedIndices: number[] = [];

  yield { array: [...array], highlight: [], sorted: [...sortedIndices], message: "Starting Bubble Sort on the initial array." };

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield { array: [...array], highlight: [j, j + 1], sorted: [...sortedIndices], compare: [j, j + 1], message: `Comparing elements at index ${j} (${array[j]}) and ${j + 1} (${array[j + 1]}).` };
      if (array[j] > array[j + 1]) {
        swapped = true;
        yield { array: [...array], highlight: [j, j + 1], sorted: [...sortedIndices], message: `Swapping ${array[j]} and ${array[j + 1]}.` };
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield { array: [...array], highlight: [j, j + 1], sorted: [...sortedIndices], message: `Swap complete.` };
      }
    }
    sortedIndices.push(n - 1 - i);
    yield { array: [...array], highlight: [], sorted: [...sortedIndices], message: `Pass ${i + 1} complete. ${array[n - 1 - i]} is now in its final sorted position.` };
    if (!swapped) {
      const remaining = Array.from({ length: n - 1 - i }, (_, k) => k);
      sortedIndices = [...sortedIndices, ...remaining.map(k => k + sortedIndices.length)];
      yield { array: [...array], highlight: [], sorted: Array.from({length: n}, (_, i) => i), message: "No swaps in the last pass. The array is fully sorted." };
      break;
    }
  }
  const allSorted = Array.from({ length: n }, (_, i) => i);
  yield { array: [...array], highlight: [], sorted: allSorted, message: "Bubble Sort finished. The array is sorted." };
}

function* linearSearch(arr: number[], target: number): Generator<Step> {
    const array = [...arr];
    yield { array: [...array], highlight: [], sorted: [], message: `Starting Linear Search for target value: ${target}.` };

    for (let i = 0; i < array.length; i++) {
        yield { array: [...array], highlight: [i], sorted: [], compare: [i], message: `Checking element at index ${i} (${array[i]}).` };
        if (array[i] === target) {
            yield { array: [...array], highlight: [i], sorted: [i], message: `Target ${target} found at index ${i}.` };
            return;
        }
    }

    yield { array: [...array], highlight: [], sorted: [], message: `Target ${target} not found in the array.` };
}

export function AlgorithmStepSimulator() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('bubbleSort');
  const [initialArray, setInitialArray] = useState<number[]>(generateRandomArray());
  const [history, setHistory] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<SimulationStatus>('idle');
  const [speed, setSpeed] = useState(500);
  const [target, setTarget] = useState<number>(() => initialArray[Math.floor(initialArray.length / 2)]);
  const [challengeMode, setChallengeMode] = useState(false);
  const [challengeSelection, setChallengeSelection] = useState<number[]>([]);
  const [challengeScore, setChallengeScore] = useState({ correct: 0, incorrect: 0 });

  const generator = useMemo(() => {
    if (selectedAlgorithm === 'bubbleSort') {
        return bubbleSort(initialArray);
    }
    if (selectedAlgorithm === 'linearSearch') {
        const numTarget = Number(target);
        if (isNaN(numTarget)) return null;
        return linearSearch(initialArray, numTarget);
    }
    return null;
  }, [initialArray, selectedAlgorithm, target]);

  const loadHistory = useCallback(() => {
    if (!generator) return;
    const allSteps = Array.from(generator);
    setHistory(allSteps);
    setStepIndex(0);
    setStatus(challengeMode ? 'challenge' : 'idle');
    setChallengeSelection([]);
    setChallengeScore({ correct: 0, incorrect: 0 });
  }, [generator, challengeMode]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleReset = useCallback(() => {
    setStatus(challengeMode ? 'challenge' : 'idle');
    setStepIndex(0);
    setChallengeSelection([]);
    setChallengeScore({ correct: 0, incorrect: 0 });
  }, [challengeMode]);
  
  const handleRandomize = useCallback(() => {
      const newArray = generateRandomArray();
      setInitialArray(newArray);
      setTarget(newArray[Math.floor(newArray.length / 2)]);
      // history will be re-calculated by effect
  }, []);

  const handleStep = useCallback((force = false) => {
    if (!force && status === 'challenge') return;
    if (stepIndex < history.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      setStatus('finished');
    }
  }, [stepIndex, history.length, status]);
  
  const handleChallengeClick = (index: number) => {
      if (status !== 'challenge') return;
      const newSelection = [...challengeSelection, index];
      setChallengeSelection(newSelection);

      const currentCompare = history[stepIndex]?.compare;
      if (!currentCompare) return;

      const requiredSelections = currentCompare.length;

      if (newSelection.length === requiredSelections) {
          const isCorrect = newSelection.every(sel => currentCompare.includes(sel)) && newSelection.length === currentCompare.length;
          if (isCorrect) {
              setChallengeScore(s => ({ ...s, correct: s.correct + 1 }));
              setTimeout(() => {
                  handleStep(true);
                  setChallengeSelection([]);
              }, 500);
          } else {
              setChallengeScore(s => ({ ...s, incorrect: s.incorrect + 1 }));
              setTimeout(() => setChallengeSelection([]), 500); // Reset selection after a delay
          }
      }
  };


  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'playing' && stepIndex < history.length - 1) {
      interval = setInterval(() => {
        handleStep();
      }, speed);
    } else if (status === 'playing') {
      setStatus('finished');
    }
    return () => clearInterval(interval);
  }, [status, stepIndex, history, speed, handleStep]);
  
  useEffect(() => {
      handleReset();
  }, [challengeMode, handleReset]);

  const currentStep = history[stepIndex];
  const nextCompare = history[stepIndex]?.compare;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Algorithm Simulator</CardTitle>
        <CardDescription>Visualize algorithms in action or test your knowledge in challenge mode.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
         <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-muted/30 border rounded-lg">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                    <Label htmlFor="algorithm-select">Algorithm</Label>
                     <Select value={selectedAlgorithm} onValueChange={(v) => setSelectedAlgorithm(v as Algorithm)} disabled={status === 'playing'}>
                        <SelectTrigger id="algorithm-select"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                            <SelectItem value="linearSearch">Linear Search</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 {selectedAlgorithm === 'linearSearch' && (
                    <div className="space-y-2">
                        <Label htmlFor="target-value">Value to Find</Label>
                        <Input id="target-value" type="number" value={target} onChange={e => setTarget(parseInt(e.target.value) || 0)} disabled={status === 'playing'} />
                    </div>
                )}
                 <div className="flex gap-2">
                     <Button onClick={handleRandomize} variant="outline" className="w-full" disabled={status === 'playing'}><Shuffle className="mr-2 h-4 w-4" /> Randomize</Button>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="challenge-mode" checked={challengeMode} onCheckedChange={setChallengeMode} />
                <Label htmlFor="challenge-mode" className="flex items-center gap-2"><Gamepad className="h-4 w-4"/> Challenge Mode</Label>
            </div>
         </div>

        {challengeMode && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Challenge Mode Active!</AlertTitle>
            <AlertDescription>
              {`Click on the element(s) you think the algorithm will check next. Your score is ${challengeScore.correct} correct and ${challengeScore.incorrect} incorrect.`}
            </AlertDescription>
          </Alert>
        )}

        <div className="min-h-[100px] bg-muted/50 p-4 rounded-lg flex justify-center items-center gap-2 border">
            {currentStep?.array.map((value, index) => {
                 const isHighlighted = currentStep.highlight.includes(index);
                 const isSorted = currentStep.sorted.includes(index);
                 const isSelected = challengeSelection.includes(index);
                 const isCorrectTarget = challengeMode && nextCompare?.includes(index);

                 return (
                    <div key={index} className="flex flex-col items-center gap-1">
                         <div
                            onClick={() => challengeMode && handleChallengeClick(index)}
                            className={cn(
                                "h-12 w-12 flex items-center justify-center font-bold text-lg rounded-md transition-all duration-300 relative",
                                challengeMode && "cursor-pointer hover:ring-2 hover:ring-primary",
                                isSorted ? "bg-green-500 text-white" :
                                isHighlighted && !challengeMode ? "bg-primary text-primary-foreground" :
                                "bg-background border",
                                isSelected && "ring-2 ring-offset-2 ring-primary",
                                challengeMode && isSelected && !isCorrectTarget && 'ring-destructive',
                                challengeMode && isSelected && isCorrectTarget && 'ring-green-500'
                            )}
                        >
                            {value}
                        </div>
                        <span className="text-xs text-muted-foreground">{index}</span>
                    </div>
                );
            })}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="flex gap-2">
                <Button onClick={() => setStatus(status === 'playing' ? 'paused' : 'playing')} disabled={status === 'finished' || challengeMode}>
                    {status === 'playing' ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {status === 'playing' ? 'Pause' : 'Play'}
                </Button>
                <Button onClick={() => handleStep()} disabled={status === 'playing' || status === 'finished' || challengeMode} variant="outline">
                    <SkipForward className="mr-2 h-4 w-4" />
                    Step
                </Button>
                <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                </Button>
            </div>
             <div className="flex items-center gap-2">
                <Label htmlFor="speed-select" className="text-sm">Speed</Label>
                 <Select value={speed.toString()} onValueChange={(v) => setSpeed(parseInt(v))} disabled={challengeMode}>
                    <SelectTrigger id="speed-select" className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1000">Slow</SelectItem>
                        <SelectItem value="500">Medium</SelectItem>
                        <SelectItem value="200">Fast</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="min-h-[6rem] bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">Log</h4>
            <p className="font-mono text-sm text-muted-foreground">{currentStep?.message || "Click 'Play' or 'Step' to begin the simulation."}</p>
        </div>

      </CardContent>
    </Card>
  );
}
