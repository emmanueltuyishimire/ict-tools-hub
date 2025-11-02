
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Timer, AlertCircle, HardDrive, Cpu, Database } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const diskPerf = {
  'hdd-7200': { iops: 80, seqReadMb: 100 },
  'hdd-15000': { iops: 180, seqReadMb: 150 },
  'ssd-sata': { iops: 500, seqReadMb: 500 },
  'ssd-nvme': { iops: 5000, seqReadMb: 3000 },
};

const PAGE_SIZE_KB = 8;
const CPU_TIME_PER_ROW_MS = 0.001; // 1 microsecond per row

export function QueryTimeEstimator() {
  const [tableRows, setTableRows] = useState(1000000);
  const [diskType, setDiskType] = useState('ssd-sata');
  const [queryType, setQueryType] = useState<'indexed' | 'scan'>('indexed');
  const [rowsToRead, setRowsToRead] = useState(1);
  const [rowsToReturn, setRowsToReturn] = useState(1);

  const estimatedTime = useMemo(() => {
    const disk = diskPerf[diskType as keyof typeof diskPerf];
    
    let ioTimeMs = 0;
    const actualRowsToRead = queryType === 'scan' ? tableRows : rowsToRead;

    if (queryType === 'indexed') {
      // For indexed reads, assume a few random I/Os to traverse the B-Tree + read the data pages
      const btreeHops = Math.max(1, Math.ceil(Math.log2(tableRows) / 8)); // Very rough estimate
      const randomReads = btreeHops + Math.ceil(rowsToRead / (PAGE_SIZE_KB * 1024 / 512)); // Assume 512 byte rows
      ioTimeMs = (randomReads / disk.iops) * 1000;
    } else { // Full table scan
      const tableSizeMb = (tableRows * 512) / (1024 * 1024); // Assuming 0.5KB per row avg
      ioTimeMs = (tableSizeMb / disk.seqReadMb) * 1000;
    }

    const cpuTimeMs = actualRowsToRead * CPU_TIME_PER_ROW_MS;
    const totalTimeMs = ioTimeMs + cpuTimeMs;

    return {
      ioTime: ioTimeMs,
      cpuTime: cpuTimeMs,
      totalTime: totalTimeMs,
    };
  }, [tableRows, diskType, queryType, rowsToRead, rowsToReturn]);

  const getTimeLabel = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(2)} ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(2)} s`;
    return `${(ms / 60000).toFixed(2)} min`;
  };

  const getTimeColor = (ms: number) => {
    if (ms < 200) return 'text-green-500';
    if (ms < 1000) return 'text-yellow-500';
    return 'text-red-500';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Query Estimator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="border p-4 rounded-lg space-y-4">
          <legend className="-ml-1 px-1 text-sm font-medium">System Parameters</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="table-rows">Rows in Table</Label>
              <Input id="table-rows" type="number" value={tableRows} onChange={e => setTableRows(parseInt(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disk-type">Disk Type</Label>
              <Select value={diskType} onValueChange={setDiskType}>
                <SelectTrigger id="disk-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hdd-7200">HDD (7200 RPM)</SelectItem>
                  <SelectItem value="hdd-15000">HDD (15,000 RPM)</SelectItem>
                  <SelectItem value="ssd-sata">SATA SSD</SelectItem>
                  <SelectItem value="ssd-nvme">NVMe SSD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-lg space-y-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Query Parameters</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="query-type">Query Type</Label>
              <Select value={queryType} onValueChange={(v) => setQueryType(v as any)}>
                <SelectTrigger id="query-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="indexed">Indexed Read</SelectItem>
                  <SelectItem value="scan">Full Table Scan</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="rows-to-return">Rows to Return</Label>
              <Input id="rows-to-return" type="number" value={rowsToReturn} onChange={e => setRowsToReturn(parseInt(e.target.value) || 0)} />
            </div>
             {queryType === 'indexed' && (
                <div className="space-y-2">
                    <Label htmlFor="rows-to-read">Rows to Read (via index)</Label>
                    <Input id="rows-to-read" type="number" value={rowsToRead} onChange={e => setRowsToRead(parseInt(e.target.value) || 0)} />
                </div>
            )}
          </div>
        </fieldset>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Estimated Execution Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">Total Estimated Time</p>
              <p className={cn("text-4xl font-bold", getTimeColor(estimatedTime.totalTime))}>
                {getTimeLabel(estimatedTime.totalTime)}
              </p>
            </div>
            <div className="w-full space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <Label className="text-sm flex items-center gap-2"><HardDrive className="h-4 w-4"/>Disk I/O Time</Label>
                        <span className="text-sm font-mono">{getTimeLabel(estimatedTime.ioTime)}</span>
                    </div>
                    <Progress value={(estimatedTime.ioTime / estimatedTime.totalTime) * 100} className="h-3" />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <Label className="text-sm flex items-center gap-2"><Cpu className="h-4 w-4"/>CPU Processing Time</Label>
                        <span className="text-sm font-mono">{getTimeLabel(estimatedTime.cpuTime)}</span>
                    </div>
                    <Progress value={(estimatedTime.cpuTime / estimatedTime.totalTime) * 100} className="h-3" />
                </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

