import { allTools } from '@/lib/tools';
import ToolRenderer from './tool-renderer';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} | ICT Toolbench`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | ICT Toolbench`,
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
