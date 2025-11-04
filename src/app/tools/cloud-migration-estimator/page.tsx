
import React from 'react';
import DataMigrationEstimator from './data-migration-estimator';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { PageHeader } from '@/components/page-header';

export const metadata = {
    title: 'Cloud Migration Planning Guide | ICT Toolbench',
    description: 'A comprehensive guide to planning your cloud migration. Learn how to estimate costs, choose a strategy (rehost, refactor, etc.), and avoid common pitfalls.',
    openGraph: {
        title: 'Cloud Migration Planning Guide | ICT Toolbench',
        description: 'Your step-by-step guide to successfully planning and executing a cloud migration. From cost estimation to choosing the right strategy.',
        url: '/tools/cloud-migration-estimator',
    }
};

const CloudMigrationPlanningGuidePage = () => {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Cloud Migration Planning Guide",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A comprehensive guide to planning your cloud migration, including cost estimation, strategy selection, and common pitfalls.",
      "url": "https://www.icttoolbench.com/tools/cloud-migration-estimator"
    };

     const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer.replace(/<[^>]*>?/gm, ''),
            },
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <DataMigrationEstimator />
        </>
    );
};

export default CloudMigrationPlanningGuidePage;
