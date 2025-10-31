import { PageHeader } from '@/components/page-header';
import { VlsmCalculator } from './vlsm-calculator';

export const metadata = {
    title: 'VLSM Calculator | ICT Toolbench',
    description: 'Design efficient IP addressing schemes using our Variable Length Subnet Mask (VLSM) calculator. Optimize your network by allocating IP addresses precisely based on host requirements.',
};

export default function VlsmCalculatorPage() {
  return (
    <>
      <PageHeader
        title="VLSM Calculator"
        description="Design efficient network schemes with Variable Length Subnet Masking. Allocate IP address space precisely according to the needs of each subnet, minimizing waste and maximizing scalability."
      />
      <VlsmCalculator />
    </>
  );
}
