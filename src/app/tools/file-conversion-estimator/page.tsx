
// This tool is currently a placeholder
import { Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';

export default function FileConversionEstimatorPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <PageHeader
                title="File Conversion Estimator"
                description="This tool is under construction. Please check back later!"
            />
            <Card>
                <CardHeader>
                    <CardTitle>Tool Under Construction</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                        <Construction className="w-16 h-16 text-muted-foreground" />
                        <p className="text-muted-foreground">This tool is currently under construction. Please check back later!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
