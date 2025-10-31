
import { PageHeader } from '@/components/page-header';
import { HostCountCalculator } from './host-count-calculator';

export const metadata = {
    title: 'Host Count Calculator | ICT Toolbench',
    description: 'Quickly calculate the total and usable number of hosts for any given IPv4 CIDR prefix. Essential for network planning and subnetting.',
};

export default function HostCountCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Host Count Calculator"
        description="Instantly determine the number of available host addresses for any network size based on its CIDR prefix."
      />
      <HostCountCalculator />
    </>
  );
}
