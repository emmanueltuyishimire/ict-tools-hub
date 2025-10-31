import { PageHeader } from '@/components/page-header';
import { BandwidthEstimator } from './bandwidth-estimator';

export const metadata = {
    title: 'Network Bandwidth Estimator | ICT Toolbench',
    description: 'Estimate your network bandwidth needs for home or office. Calculate requirements for streaming, gaming, downloading, and more to choose the right internet plan.',
};

export default function BandwidthEstimatorPage() {
  return (
    <>
      <PageHeader
        title="Network Bandwidth Estimator"
        description="Plan your network with confidence. Estimate the bandwidth required for your home or office based on devices, applications, and usage patterns."
      />
      <BandwidthEstimator />
    </>
  );
}
