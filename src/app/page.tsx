
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toolCategories } from '@/lib/tools';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <PageHeader
        title="Welcome to ICT Tools Hub"
        description="A comprehensive suite of 100+ free online tools for students, developers, network admins, and tech enthusiasts. Explore the categories below to find the tool you need."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {toolCategories.map((category) => (
          <Card key={category.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <category.icon className="h-6 w-6 text-primary" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {category.tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="flex items-center justify-between rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {tool.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
