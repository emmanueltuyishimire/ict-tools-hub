import { allTools } from '@/lib/tools';
import ToolRenderer from './tool-renderer';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  // The metadata is now handled by each tool's dedicated page file.
  // This dynamic import is no longer needed here.
  // We will rely on the default metadata generation logic.
  return {
    title: `${tool.name} | ICT Tools Hub`,
    description: tool.description,
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
