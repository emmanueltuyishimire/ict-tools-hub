
import { allTools, toolCategories } from '@/lib/tools';
import ToolRenderer from './tool-renderer';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | ICT Tools Hub',
    };
  }

  const canonicalUrl = `https://ict.calculation.site/tools/${tool.slug}`;
  const category = toolCategories.find(cat => cat.tools.some(t => t.slug === tool.slug));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ICT Tools Hub',
        item: `https://ict.calculation.site`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category?.name || 'Tools',
        // Since category pages don't exist, we can link back to the main page
        // or to the tool page itself. Linking to the tool is simpler here.
        item: canonicalUrl, 
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: canonicalUrl,
      },
    ],
  };

  const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.name,
      "operatingSystem": "All",
      "applicationCategory": "Utilities",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": tool.description,
      "url": canonicalUrl
  };

  return {
    title: `${tool.name} | ICT Tools Hub`,
    description: tool.description,
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: `${tool.name} | ICT Tools Hub`,
        description: tool.description,
        url: canonicalUrl,
    },
    other: {
      'structured-data-breadcrumb': JSON.stringify(breadcrumbSchema),
      'structured-data-software': JSON.stringify(softwareAppSchema)
    }
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  // All metadata including structured data is now handled in generateMetadata.
  // The component is now only responsible for rendering the tool.
  return (
    <>
        <ToolRenderer slug={params.slug} />
    </>
  );
}

export function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }));
}
