'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { HelpCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NormalizationChecker() {
    const [checks1NF, setChecks1NF] = useState({ pkExists: false, isAtomic: false });
    const [checks2NF, setChecks2NF] = useState({ is1NF: false, hasCompositeKey: false, noPartialDeps: false });
    const [checks3NF, setChecks3NF] = useState({ is2NF: false, noTransitiveDeps: false });

    const is1NF = checks1NF.pkExists && checks1NF.isAtomic;
    const is2NF = is1NF && (!checks2NF.hasCompositeKey || checks2NF.noPartialDeps);
    const is3NF = is2NF && checks3NF.noTransitiveDeps;
    
    const handleReset = () => {
        setChecks1NF({ pkExists: false, isAtomic: false });
        setChecks2NF({ is1NF: false, hasCompositeKey: false, noPartialDeps: false });
        setChecks3NF({ is2NF: false, noTransitiveDeps: false });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interactive Normalization Checklist</CardTitle>
                <CardDescription>
                    Walk through the steps of normalization for your table design. Answer the questions to see if your table structure meets the normal forms.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    {/* 1NF Section */}
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                {is1NF ? <Check className="h-5 w-5 text-green-600"/> : <X className="h-5 w-5 text-destructive"/>}
                                First Normal Form (1NF)
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4 pl-8">
                            <p className="text-sm text-muted-foreground">To be in 1NF, your table must have a primary key and all columns must contain atomic (indivisible) values.</p>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="pkExists" checked={checks1NF.pkExists} onCheckedChange={(checked) => setChecks1NF(prev => ({...prev, pkExists: !!checked}))} />
                                <Label htmlFor="pkExists" className="leading-snug">Does the table have a primary key that uniquely identifies each row?</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="isAtomic" checked={checks1NF.isAtomic} onCheckedChange={(checked) => setChecks1NF(prev => ({...prev, isAtomic: !!checked}))} />
                                <Label htmlFor="isAtomic" className="leading-snug">Does each column contain only one value per row (no comma-separated lists)?</Label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2NF Section */}
                    <AccordionItem value="item-2">
                         <AccordionTrigger disabled={!is1NF}>
                            <div className="flex items-center gap-2">
                               {is1NF ? (is2NF ? <Check className="h-5 w-5 text-green-600"/> : <X className="h-5 w-5 text-destructive"/>) : <HelpCircle className="h-5 w-5 text-muted-foreground"/>}
                                Second Normal Form (2NF)
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4 pl-8">
                            <p className="text-sm text-muted-foreground">To be in 2NF, the table must first be in 1NF. This form is only relevant for tables with a composite primary key.</p>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="is1NF" checked={is1NF} disabled />
                                <Label htmlFor="is1NF" className="leading-snug text-muted-foreground">Is the table in 1NF?</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="hasCompositeKey" checked={checks2NF.hasCompositeKey} onCheckedChange={(checked) => setChecks2NF(prev => ({...prev, hasCompositeKey: !!checked}))} />
                                <Label htmlFor="hasCompositeKey" className="leading-snug">Does the table use a composite primary key (a key made of 2+ columns)?</Label>
                            </div>
                            {checks2NF.hasCompositeKey && (
                                 <div className="flex items-center space-x-2 pl-6">
                                    <Checkbox id="noPartialDeps" checked={checks2NF.noPartialDeps} onCheckedChange={(checked) => setChecks2NF(prev => ({...prev, noPartialDeps: !!checked}))} />
                                    <Label htmlFor="noPartialDeps" className="leading-snug">Are all non-key columns dependent on the <strong>entire</strong> composite key (no partial dependencies)?</Label>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3NF Section */}
                    <AccordionItem value="item-3">
                         <AccordionTrigger disabled={!is2NF}>
                            <div className="flex items-center gap-2">
                                {is2NF ? (is3NF ? <Check className="h-5 w-5 text-green-600"/> : <X className="h-5 w-5 text-destructive"/>) : <HelpCircle className="h-5 w-5 text-muted-foreground"/>}
                                Third Normal Form (3NF)
                            </div>
                        </AccordionTrigger>
                         <AccordionContent className="space-y-4 pt-4 pl-8">
                             <p className="text-sm text-muted-foreground">To be in 3NF, the table must be in 2NF and all its columns must be dependent only on the primary key, not on other non-key columns.</p>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="is2NF" checked={is2NF} disabled />
                                <Label htmlFor="is2NF" className="leading-snug text-muted-foreground">Is the table in 2NF?</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="noTransitiveDeps" checked={checks3NF.noTransitiveDeps} onCheckedChange={(checked) => setChecks3NF(prev => ({...prev, noTransitiveDeps: !!checked}))} />
                                <Label htmlFor="noTransitiveDeps" className="leading-snug">Do all non-key columns depend directly on the primary key (no transitive dependencies)?</Label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className='flex justify-between items-center pt-4'>
                    <div>
                        <h4 className="font-semibold">Final Result:
                            <span className={`ml-2 font-bold ${is3NF ? 'text-green-600' : 'text-destructive'}`}>
                                {is3NF ? "In 3rd Normal Form" : is2NF ? "In 2nd Normal Form" : is1NF ? "In 1st Normal Form" : "Not Normalized"}
                            </span>
                        </h4>
                    </div>
                    <Button variant="outline" onClick={handleReset}>Reset Checklist</Button>
                </div>
            </CardContent>
        </Card>
    );
}