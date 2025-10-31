
import { PageHeader } from '@/components/page-header';
import { IpRangeGenerator } from './ip-range-generator';

export const metadata = {
    title: 'IP Address Range Generator | ICT Toolbench',
    description: 'Generate a complete list of IP addresses from a start/end range or a CIDR block. Ideal for creating configuration lists, scripting, and network documentation.',
};

export default function IpRangeGeneratorPage() {
  return (
    <>
      <PageHeader
        title="IP Address Range Generator"
        description="Quickly generate a list of IPv4 addresses from a start and end IP, or from a CIDR network block. Perfect for scripting, configuration, and documentation."
      />
      <IpRangeGenerator />
    </>
  );
}
