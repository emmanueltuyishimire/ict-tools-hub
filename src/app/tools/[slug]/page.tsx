import { allTools } from '@/lib/tools';
import ToolRenderer from './tool-renderer';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const PageComponent = (await import(`../tools/${tool.slug}/page`)).default;
  if (PageComponent.metadata) {
    return PageComponent.metadata;
  }

  return {
    title: `${tool.name} | ICT Tools Hub`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | ICT Tools Hub`,
      description: tool.description,
      url: `/tools/${tool.slug}`,
    },
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
