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
        description="A comprehensive suite of 200+ free online tools for students, developers, network admins, and tech enthusiasts. Explore the categories below to find the tool you need."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toolCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <category.icon className="h-5 w-5 text-primary" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {category.tools.slice(0, 3).map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="flex items-center justify-between hover:text-primary transition-colors"
                    >
                      {tool.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
                 {category.tools.length > 3 && (
                   <li>...and {category.tools.length - 3} more</li>
                 )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
