import React from 'react';
import DataMigrationEstimator from './data-migration-estimator';

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
    return <DataMigrationEstimator />;
};

export default CloudMigrationPlanningGuidePage;
