
import { PageHeader } from '@/components/page-header';
import { IpSummarizationTool } from './ip-summarization-tool';

export const metadata = {
    title: 'IP Summarization Tool (Route Aggregator) | ICT Toolbench',
    description: 'Calculate the optimal summary route (supernet) from a list of IP networks. Simplify your routing tables with our IP summarization tool.',
};

export default function IpSummarizationPage() {
  return (
    <>
      <PageHeader
        title="IP Summarization Tool (Route Aggregation)"
        description="Calculate the most efficient summary route from a list of IP networks to simplify routing tables and improve network performance."
      />
      <IpSummarizationTool />
    </>
  );
}

    