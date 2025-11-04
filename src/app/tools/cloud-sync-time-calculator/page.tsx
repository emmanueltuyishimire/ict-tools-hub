import React from 'react';
import CloudSyncTimeCalculator from './cloud-sync-time-calculator';

export const metadata = {
    title: 'Cloud Sync Time Calculator | Estimate Upload & Download Time | ICT Toolbench',
    description: 'Estimate how long it will take to upload or sync your data to the cloud. A crucial tool for planning initial cloud backups, data migrations, and large file transfers.',
    openGraph: {
        title: 'Cloud Sync Time Calculator | ICT Toolbench',
        description: 'Plan your cloud data migrations and backups by calculating transfer times based on data size and network speed.',
        url: '/tools/cloud-sync-time-calculator',
    }
};

export default function CloudSyncTimeCalculatorPage() {
    // This is now a Server Component that wraps the client component
    return <CloudSyncTimeCalculator />;
}
