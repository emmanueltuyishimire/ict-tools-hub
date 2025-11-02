'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Cpu, MemoryStick, HardDrive, Shield, Check, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const checklistItems = [
    { 
        id: 'perf_cpu', 
        category: 'Performance', 
        icon: Cpu,
        label: "CPU Usage is Healthy",
        description: "Average CPU utilization is consistently below 75-80% during peak hours."
    },
    { 
        id: 'perf_memory', 
        category: 'Performance',
        icon: MemoryStick, 
        label: "Memory Usage is Optimal",
        description: "Sufficient free memory is available, and there is no significant use of swap space."
    },
    { 
        id: 'perf_cache', 
        category: 'Performance', 
        icon: MemoryStick,
        label: "High Cache Hit Ratio",
        description: "The database cache hit ratio is consistently above 98-99%."
    },
    { 
        id: 'perf_queries', 
        category: 'Performance', 
        icon: Cpu,
        label: "No Persistent Slow Queries",
        description: "The slow query log has been reviewed, and any long-running queries have been optimized."
    },
    { 
        id: 'storage_disk', 
        category: 'Storage', 
        icon: HardDrive,
        label: "Sufficient Disk Space",
        description: "All critical disk partitions have at least 20-25% free space available."
    },
    { 
        id: 'storage_io', 
        category: 'Storage', 
        icon: HardDrive,
        label: "Disk I/O is Not Bottlenecked",
        description: "Disk I/O latency is low, and IOPS are not maxed out during peak load."
    },
    { 
        id: 'storage_bloat', 
        category: 'Storage', 
        icon: HardDrive,
        label: "Low Index/Table Bloat",
        description: "Indexes and tables are regularly maintained (e.g., REINDEX/VACUUM) and have low bloat."
    },
    { 
        id: 'security_access', 
        category: 'Security', 
        icon: Shield,
        label: "Least-Privilege Access",
        description: "Application database users have the minimum necessary permissions and not administrative rights."
    },
    { 
        id: 'security_patches', 
        category: 'Security', 
        icon: Shield,
        label: "Database is Patched",
        description: "The database version is actively supported and has all recent security patches applied."
    },
    { 
        id: 'backups_running', 
        category: 'Backups', 
        icon: Shield,
        label: "Automated Backups are Running",
        description: "There are automated, daily backups that are consistently completing successfully."
    },
    { 
        id: 'backups_pitr', 
        category: 'Backups', 
        icon: Shield,
        label: "Point-in-Time Recovery (PITR) is Enabled",
        description: "Transaction log archiving is enabled, allowing for recovery to a specific point in time."
    },
    { 
        id: 'backups_tested', 
        category: 'Backups', 
        icon: Shield,
        label: "Backup Restores are Tested",
        description: "The backup restoration process is tested regularly (e.g., quarterly) to ensure backups are valid."
    },
];

type CheckedState = {
    [key: string]: boolean;
};

export function DatabaseHealthChecker() {
    const [checked, setChecked] = useState<CheckedState>({});
    
    const handleCheckChange = (id: string, isChecked: boolean) => {
        setChecked(prev => ({ ...prev, [id]: isChecked }));
    };
    
    const handleReset = () => {
        setChecked({});
    };

    const categories = ['Performance', 'Storage', 'Security', 'Backups'];
    const totalChecks = checklistItems.length;
    const completedChecks = Object.values(checked).filter(Boolean).length;
    const progress = totalChecks > 0 ? (completedChecks / totalChecks) * 100 : 0;
    
    const getCategoryStatusIcon = (category: string) => {
        const categoryItems = checklistItems.filter(item => item.category === category);
        const allChecked = categoryItems.every(item => checked[item.id]);
        const someChecked = categoryItems.some(item => checked[item.id]);

        if (allChecked) {
            return <Check className="h-5 w-5 text-green-600" />;
        }
        if (someChecked) {
            return <X className="h-5 w-5 text-yellow-500" />;
        }
        return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Database Health Checklist</CardTitle>
                <CardDescription>
                    Review each item against your database's monitoring tools and check them off as you verify their health.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label>Overall Progress</Label>
                    <div className="flex items-center gap-4">
                        <Progress value={progress} className="h-3" />
                        <span className="font-bold text-lg">{Math.round(progress)}%</span>
                    </div>
                </div>

                <Accordion type="multiple" defaultValue={['item-0']} className="w-full">
                    {categories.map((category, index) => (
                        <AccordionItem key={category} value={`item-${index}`}>
                             <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    {getCategoryStatusIcon(category)}
                                    {category}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4 pl-8">
                                {checklistItems.filter(item => item.category === category).map(item => (
                                    <div key={item.id} className="flex items-start space-x-3">
                                        <Checkbox 
                                            id={item.id} 
                                            checked={!!checked[item.id]} 
                                            onCheckedChange={(c) => handleCheckChange(item.id, !!c)}
                                            className="mt-1"
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                                            <p className="text-xs text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="flex justify-end">
                    <Button variant="outline" onClick={handleReset}>Reset Checklist</Button>
                </div>
            </CardContent>
        </Card>
    );
}
