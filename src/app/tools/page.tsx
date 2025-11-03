import { allTools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import ToolRenderer from '@/app/tools/[slug]/tool-renderer';

export async function generateMetadata({ params: rawParams }: { params: { slug: string } }) {
  const params = await rawParams;
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} | ICT Tools Hub`,
    description: tool.description,
    openGraph: {
        title: `${tool.name} | ICT Tools Hub`,
        description: tool.description,
        url: `/tools/${tool.slug}`,
    }
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  return <ToolRenderer slug={params.slug} />;
}

export function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }));
}
