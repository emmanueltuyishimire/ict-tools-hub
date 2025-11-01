
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CodeBlock } from '@/components/code-block';

const complexityData = {
  'O(1)': {
    name: 'Constant Time',
    description: 'The algorithm takes the same amount of time, regardless of the input size. This is the ideal complexity.',
    exampleCode: `function getFirstElement(arr) {\n  return arr[0];\n}`,
    performance: 'Excellent',
    data: Array.from({ length: 100 }, (_, i) => ({ n: (i + 1) * 10, time: 1 })),
  },
  'O(log n)': {
    name: 'Logarithmic Time',
    description: 'The time taken increases with the size of the input, but it does so very slowly. Doubling the input size does not double the time taken.',
    exampleCode: `function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
    performance: 'Great',
    data: Array.from({ length: 100 }, (_, i) => ({ n: (i + 1) * 10, time: Math.log2((i + 1) * 10) })),
  },
  'O(n)': {
    name: 'Linear Time',
    description: 'The time taken grows linearly with the size of the input. Doubling the input size roughly doubles the time taken.',
    exampleCode: `function findValue(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}`,
    performance: 'Good',
    data: Array.from({ length: 100 }, (_, i) => ({ n: (i + 1) * 10, time: (i + 1) * 10 })),
  },
  'O(n log n)': {
    name: 'Log-Linear Time',
    description: 'The time taken is a multiple of n and log n. This is common for efficient sorting algorithms.',
    exampleCode: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  // Merge logic omitted for brevity\n  return [...left, ...right].sort((a,b) => a-b);\n}`,
    performance: 'Fair',
    data: Array.from({ length: 100 }, (_, i) => ({ n: (i + 1) * 10, time: (i + 1) * 10 * Math.log2((i + 1) * 10) })),
  },
  'O(n^2)': {
    name: 'Quadratic Time',
    description: 'The time taken grows with the square of the input size. Doubling the input size quadruples the time taken. Avoid this for large datasets.',
    exampleCode: `function hasDuplicates(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] === arr[j]) {\n        return true;\n      }\n    }\n  }\n  return false;\n}`,
    performance: 'Poor',
    data: Array.from({ length: 100 }, (_, i) => ({ n: (i + 1) * 10, time: ((i + 1) * 10) ** 2 })),
  },
  'O(2^n)': {
    name: 'Exponential Time',
    description: 'The time taken doubles with each addition to the input size. These algorithms are only practical for very small input sizes.',
    exampleCode: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
    performance: 'Very Poor',
    data: Array.from({ length: 20 }, (_, i) => ({ n: i + 1, time: 2 ** (i + 1) })), // Limited length due to rapid growth
  },
};

export function BigOCalculator() {
  const [selectedComplexity, setSelectedComplexity] = useState('O(n)');
  const complexity = complexityData[selectedComplexity as keyof typeof complexityData];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Complexity Explorer</CardTitle>
        <CardDescription>Select a Big O notation to see how its performance scales with input size.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="complexity-select">Select Time Complexity</Label>
          <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
            <SelectTrigger id="complexity-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(complexityData).map(key => (
                <SelectItem key={key} value={key}>
                  {key} - {complexityData[key as keyof typeof complexityData].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {complexity && (
          <Card className="bg-muted/50 p-6 space-y-6">
            <div>
              <h3 className="font-bold text-xl mb-2">{complexity.name} - {selectedComplexity}</h3>
              <p className="text-sm text-muted-foreground">{complexity.description}</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={complexity.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="n" label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Operations (Time)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="time" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Example Code</h4>
              <CodeBlock code={complexity.exampleCode} language="javascript" />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Performance</TableHead>
                  <TableHead>Input Size (n=10)</TableHead>
                  <TableHead>Input Size (n=100)</TableHead>
                  <TableHead>Input Size (n=1,000)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{complexity.performance}</TableCell>
                  <TableCell>{Math.round(complexity.data.find(d => d.n === 10)?.time || 0).toLocaleString()}</TableCell>
                  <TableCell>{Math.round(complexity.data.find(d => d.n === 100)?.time || 0).toLocaleString()}</TableCell>
                   <TableCell>
                    { selectedComplexity === 'O(2^n)' ? 'Too Large' :
                      Math.round(
                      selectedComplexity === 'O(1)' ? 1 :
                      selectedComplexity === 'O(log n)' ? Math.log2(1000) :
                      selectedComplexity === 'O(n)' ? 1000 :
                      selectedComplexity === 'O(n log n)' ? 1000 * Math.log2(1000) :
                      1000 ** 2
                    ).toLocaleString()
                   }
                   </TableCell>
                </TableRow>
              </TableBody>
            </Table>

          </Card>
        )}
      </CardContent>
    </Card>
  );
}
