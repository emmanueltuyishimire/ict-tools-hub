'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { CodeBlock } from '@/components/code-block';
import { cn } from '@/lib/utils';
import { allTools } from '@/lib/tools';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Complexity = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n²)' | 'O(2ⁿ)';

const complexities: Complexity[] = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'];

const complexityData: Record<Complexity, {
    label: string,
    description: string,
    color: string,
    func: (n: number) => number,
    code: string,
    language: string
}> = {
    'O(1)': {
        label: 'Constant',
        description: 'Excellent. The algorithm\'s execution time is constant, regardless of the input size. This is the most scalable complexity.',
        color: 'hsl(var(--chart-1))',
        func: n => 1,
        code: `// Accessing an array element by index.
function getFirstElement(arr) {
  return arr[0]; // Always takes the same amount of time
}`,
        language: 'javascript'
    },
    'O(log n)': {
        label: 'Logarithmic',
        description: 'Excellent. The execution time grows very slowly as the input size increases. Typically seen in algorithms that divide the problem in half with each step.',
        color: 'hsl(var(--chart-2))',
        func: n => n > 0 ? Math.log2(n) : 0,
        code: `// Binary search in a sorted array.
function binarySearch(sortedArr, value) {
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === value) return mid;
    if (sortedArr[mid] < value) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
        language: 'javascript'
    },
    'O(n)': {
        label: 'Linear',
        description: 'Good. The execution time grows linearly with the input size. This is a common and generally acceptable complexity for many tasks.',
        color: 'hsl(var(--chart-3))',
        func: n => n,
        code: `// Finding an item in an unsorted list.
function findValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i; // The loop may run up to 'n' times
    }
  }
  return -1;
}`,
        language: 'javascript'
    },
    'O(n log n)': {
        label: 'Linearithmic',
        description: 'Fair. Slower than linear but still very efficient for large datasets. This is the complexity of the most efficient general-purpose sorting algorithms.',
        color: 'hsl(var(--chart-4))',
        func: n => n > 0 ? n * Math.log2(n) : 0,
        code: `// Efficient sorting algorithms like Merge Sort or Quick Sort.
function mergeSort(arr) {
  // (Implementation is complex, but the key is that it divides
  // the array and merges it back together)
  if (arr.length <= 1) return arr;
  // ... recursive splitting and merging logic ...
  return sortedArray;
}`,
        language: 'javascript'
    },
    'O(n²)': {
        label: 'Quadratic',
        description: 'Poor. The execution time grows with the square of the input size. Becomes very slow with large inputs. Often involves nested loops over the data.',
        color: 'hsl(var(--chart-5))',
        func: n => n * n,
        code: `// A simple bubble sort or checking for duplicate pairs.
function hasDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === arr[j]) {
        return true; // Nested loops lead to n*n comparisons
      }
    }
  }
  return false;
}`,
        language: 'javascript'
    },
    'O(2ⁿ)': {
        label: 'Exponential',
        description: 'Terrible. The execution time doubles with each new element in the input. This is extremely slow and only practical for very small input sizes.',
        color: 'hsl(var(--destructive))',
        func: n => Math.pow(2, n),
        code: `// Recursive calculation of Fibonacci numbers (inefficiently).
function fibonacci(n) {
  if (n <= 1) return n;
  // Two recursive calls for each 'n' lead to exponential growth.
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        language: 'javascript'
    },
};

export function BigOCalculator() {
    const [selectedComplexity, setSelectedComplexity] = useState<Complexity>('O(n)');
    const [n, setN] = useState(100);

    const chartConfig = {
        operations: {
            label: 'Operations',
            color: complexityData[selectedComplexity].color,
        },
    };

    const chartData = useMemo(() => {
        const data = [];
        const step = Math.max(1, Math.floor(n / 100));
        for (let i = 1; i <= n; i += step) {
            data.push({
                n: i,
                operations: complexityData[selectedComplexity].func(i),
            });
        }
        return data;
    }, [n, selectedComplexity]);
    
    const currentData = complexityData[selectedComplexity];

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="complexity-select">Complexity</Label>
                        <Select value={selectedComplexity} onValueChange={(v) => setSelectedComplexity(v as Complexity)}>
                            <SelectTrigger id="complexity-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {complexities.map(c => <SelectItem key={c} value={c}>{c} ({complexityData[c].label})</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="n-slider">Input Size (n)</Label>
                        <div className="flex items-center gap-4">
                            <Slider id="n-slider" min={1} max={1000} step={1} value={[n]} onValueChange={(v) => setN(v[0])} />
                            <span className="font-mono text-muted-foreground w-12 text-right">{n}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Card className="bg-muted/30">
                    <CardHeader>
                         <CardTitle className={cn("text-xl", currentData.color.replace('hsl(var(--','text-').replace('))', ''))}>
                            {selectedComplexity} - {currentData.label}
                        </CardTitle>
                        <CardDescription>{currentData.description}</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <ChartContainer config={chartConfig} className="h-64">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={currentData.color} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={currentData.color} stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="n" tickLine={false} axisLine={false} tickMargin={8} label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -10 }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} label={{ value: 'Operations', angle: -90, position: 'insideLeft' }} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <Area dataKey="operations" type="natural" fill="url(#fillColor)" stroke={currentData.color} stackId="a" />
                            </AreaChart>
                        </ChartContainer>
                     </CardContent>
                </Card>
                <div className="space-y-2">
                    <Label>Code Example</Label>
                    <CodeBlock code={currentData.code} language={currentData.language} />
                </div>
            </CardContent>
        </Card>
    );
}
