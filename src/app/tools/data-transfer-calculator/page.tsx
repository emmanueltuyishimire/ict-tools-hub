
import { PageHeader } from '@/components/page-header';
import { DataTransferTimeCalculator } from './data-transfer-calculator';

export const metadata = {
    title: 'Data Transfer Time Calculator | ICT Toolbench',
    description: 'Estimate the time it takes to download or upload a file based on its size and your network or internet speed. Perfect for planning large file transfers.',
};

export default function DataTransferTimeCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Data Transfer Time Calculator"
        description="Estimate how long a file transfer will take. Input the file size and your connection speed to get a precise calculation for downloads, uploads, and backups."
      />
      <DataTransferTimeCalculator />
    </>
  );
}

    