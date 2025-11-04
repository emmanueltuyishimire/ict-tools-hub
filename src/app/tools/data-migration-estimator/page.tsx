
import React from 'react';
import DataMigrationEstimator from './data-migration-estimator';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Data Migration Estimator & Planning Guide | ICT Toolbench',
    description: 'A comprehensive guide to planning and estimating your data migration project. Learn about strategies, costs, and potential pitfalls when moving data between systems.',
    openGraph: {
        title: 'Data Migration Estimator & Planning Guide | ICT Toolbench',
        description: 'Plan your data migration successfully with our step-by-step guide, from calculating transfer times to choosing the right strategy.',
        url: '/tools/data-migration-estimator',
    }
};

const DataMigrationEstimatorPage = () => {
    return (
        <>
            <DataMigrationEstimator />
        </>
    );
};

export default DataMigrationEstimatorPage;
