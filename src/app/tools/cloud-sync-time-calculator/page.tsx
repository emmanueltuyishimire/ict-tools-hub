
import React from 'react';
import CloudSyncTimeCalculator from './cloud-sync-time-calculator';
import { PageHeader } from '@/components/page-header';
import { faqData, howToSchema, keyTerminologies, softwareAppSchema } from './schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Cloud Sync Time Calculator | Estimate Upload & Download Time | ICT Toolbench',
    description: 'Estimate how long it will take to upload or sync your data to the cloud. A crucial tool for planning initial cloud backups, data migrations, and large file transfers.',
    openGraph: {
        title: 'Cloud Sync Time Calculator | ICT Toolbench',
        description: 'Plan your cloud data migrations and backups by calculating transfer times based on data size and network speed.',
        url: '/tools/cloud-sync-time-calculator',
    }
};

const CloudSyncTimeCalculatorPage = () => {
    // This is now a Server Component that renders the client component
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <CloudSyncTimeCalculator />
        </>
    );
}

export default CloudSyncTimeCalculatorPage;
