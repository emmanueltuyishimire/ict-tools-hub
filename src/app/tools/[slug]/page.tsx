import { allTools } from '@/lib/tools';
import ToolRenderer from './tool-renderer';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const metadataModule = await import(`@/app/tools/${tool.slug}/page.tsx`)
    .catch(() => ({ metadata: null }));

  return metadataModule.metadata || {
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
