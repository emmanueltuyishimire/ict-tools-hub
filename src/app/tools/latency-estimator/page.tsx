import { PageHeader } from '@/components/page-header';
import { LatencyEstimator } from './latency-estimator';

export const metadata = {
    title: 'Ping / Latency Estimator | ICT Toolbench',
    description: 'Estimate the theoretical best-case network latency (ping) between two points on Earth based on the speed of light in fiber optic cables.',
};

export default function LatencyEstimatorPage() {
  return (
    <>
      <PageHeader
        title="Ping / Latency Estimator"
        description="Calculate the theoretical minimum round-trip time (RTT) between any two locations based on the speed of light. Understand the physical limits of network speed."
      />
      <LatencyEstimator />
    </>
  );
}
