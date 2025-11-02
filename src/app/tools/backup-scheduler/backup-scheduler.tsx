'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar, AlertCircle } from 'lucide-react';
import { add, format, setDate, setDay } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type ScheduleType = 'daily' | 'weekly' | 'monthly';

const generateSchedule = (
    startDate: Date, 
    scheduleType: ScheduleType, 
    dayOfWeek: number, 
    dayOfMonth: number | 'last', 
    count: number
): Date[] => {
    const schedule: Date[] = [];
    let currentDate = new Date(startDate);
    
    // Adjust for timezone to avoid date shifting
    const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
    currentDate = new Date(currentDate.getTime() + timezoneOffset);


    while (schedule.length < count) {
        switch (scheduleType) {
            case 'daily':
                schedule.push(new Date(currentDate));
                currentDate = add(currentDate, { days: 1 });
                break;
            case 'weekly':
                currentDate = setDay(currentDate, dayOfWeek);
                if (schedule.length === 0 && currentDate < startDate) {
                    currentDate = add(currentDate, { weeks: 1 });
                }
                schedule.push(new Date(currentDate));
                currentDate = add(currentDate, { weeks: 1 });
                break;
            case 'monthly':
                if (dayOfMonth === 'last') {
                    // Move to start of next month, then subtract one day
                    let nextMonth = add(currentDate, { months: 1 });
                    nextMonth = setDate(nextMonth, 1);
                    let lastDay = add(nextMonth, { days: -1 });
                    currentDate = lastDay;
                } else {
                    currentDate = setDate(currentDate, dayOfMonth as number);
                }
                 if (schedule.length === 0 && currentDate < startDate) {
                    currentDate = add(currentDate, { months: 1 });
                }
                schedule.push(new Date(currentDate));
                currentDate = add(currentDate, { months: 1 });
                break;
        }
    }
    return schedule;
};


export function BackupScheduler() {
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [scheduleType, setScheduleType] = useState<ScheduleType>('daily');
    const [dayOfWeek, setDayOfWeek] = useState(0); // Sunday
    const [dayOfMonth, setDayOfMonth] = useState<number | 'last'>(1);
    const [count, setCount] = useState(10);
    const [error, setError] = useState('');
    const [schedule, setSchedule] = useState<Date[]>([]);
    
    const handleGenerate = () => {
        setError('');
        const start = new Date(startDate);
        if (isNaN(start.getTime())) {
            setError('Invalid start date.');
            return;
        }
        if (count <= 0 || count > 100) {
            setError('Please enter a count between 1 and 100.');
            return;
        }
        const generated = generateSchedule(start, scheduleType, dayOfWeek, dayOfMonth, count);
        setSchedule(generated);
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Backup Schedule Generator</CardTitle>
                <CardDescription>
                    Plan your backup rotation by generating a list of dates for your backup jobs.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="schedule-type">Schedule Frequency</Label>
                        <Select value={scheduleType} onValueChange={(v) => setScheduleType(v as ScheduleType)}>
                            <SelectTrigger id="schedule-type"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {scheduleType === 'weekly' && (
                     <div className="space-y-2">
                        <Label htmlFor="day-of-week">Day of the Week</Label>
                        <Select value={dayOfWeek.toString()} onValueChange={(v) => setDayOfWeek(parseInt(v))}>
                            <SelectTrigger id="day-of-week"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Sunday</SelectItem>
                                <SelectItem value="1">Monday</SelectItem>
                                <SelectItem value="2">Tuesday</SelectItem>
                                <SelectItem value="3">Wednesday</SelectItem>
                                <SelectItem value="4">Thursday</SelectItem>
                                <SelectItem value="5">Friday</SelectItem>
                                <SelectItem value="6">Saturday</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
                 {scheduleType === 'monthly' && (
                     <div className="space-y-2">
                        <Label htmlFor="day-of-month">Day of the Month</Label>
                        <Select value={dayOfMonth.toString()} onValueChange={(v) => setDayOfMonth(v === 'last' ? 'last' : parseInt(v))}>
                            <SelectTrigger id="day-of-month"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                    <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                                ))}
                                <SelectItem value="last">Last Day of Month</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                 <div className="space-y-2">
                    <Label htmlFor="count">Number of Dates to Generate</Label>
                    <Input
                        id="count"
                        type="number"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                        min="1"
                        max="100"
                    />
                </div>

                <Button onClick={handleGenerate} className="w-full sm:w-auto"><Calendar className="mr-2 h-4 w-4" /> Generate Schedule</Button>
                
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {schedule.length > 0 && (
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Generated Backup Dates</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="rounded-md border h-64 overflow-y-auto bg-background">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">#</TableHead>
                                            <TableHead>Scheduled Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {schedule.map((date, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell className="font-mono">{format(date, 'EEEE, MMMM d, yyyy')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}
