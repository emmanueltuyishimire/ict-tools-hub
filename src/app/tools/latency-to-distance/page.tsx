import { PageHeader } from '@/components/page-header';
import { LatencyToDistanceEstimator } from './latency-to-distance-estimator';

export const metadata = {
    title: 'Advanced Latency to Distance Estimator | ICT Toolbench',
    description: 'Estimate straight-line distance from network latency (ping). Adjust for medium velocity, path inflation, and jitter for a more accurate calculation.',
};

export default function LatencyToDistanceEstimatorPage() {
  return (
    <>
      <PageHeader
        title="Ping Latency to Distance Estimator"
        description="Estimate the straight-line distance from measured network latency. Adjust for medium velocity, path inflation and jitter."
      />
      <LatencyToDistanceEstimator />
    </>
  );
}
