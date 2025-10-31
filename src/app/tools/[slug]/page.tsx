import { allTools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export async function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }));
}

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export default function ToolPage({ params }: ToolPageProps) {
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const bgImage = PlaceHolderImages.find(img => img.id === 'tech-background');

  return (
    <>
      <PageHeader title={tool.name} description={tool.description} />

      <Card className="mt-8 overflow-hidden">
        <CardHeader className="relative h-48 md:h-64 flex items-center justify-center text-center p-0">
          {bgImage && (
            <Image
              src={bgImage.imageUrl}
              alt="Under Construction"
              fill
              className="object-cover"
              data-ai-hint={bgImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
          <div className="relative z-10 text-primary-foreground p-6">
            <Construction className="mx-auto h-16 w-16 mb-4" />
            <CardTitle className="text-3xl font-bold">Tool Coming Soon!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg text-center text-muted-foreground">
            We are working hard to bring this tool to you. Please check back later!
          </p>
        </CardContent>
      </Card>
    </>
  );
}
