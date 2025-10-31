import { PageHeader } from '@/components/page-header';
import { RecommendForm } from '@/app/recommend-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <PageHeader
        title="AI Tool Recommendation"
        description="Describe a task or problem, and our AI will suggest the best tools from the ICT Toolbench to help you out."
      />
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Tool Finder</CardTitle>
          <CardDescription>
            Let us know what you're trying to accomplish. For example: "I need to calculate the subnet masks for a /24 network" or "check if a password is strong".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendForm />
        </CardContent>
      </Card>
    </>
  );
}
