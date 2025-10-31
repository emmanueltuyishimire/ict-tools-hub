
import { PageHeader } from '@/components/page-header';
import { NetworkAddressCalculator } from './network-address-calculator';

export const metadata = {
    title: 'Network Address Calculator (Network ID) | ICT Toolbench',
    description: 'Quickly find the network address (Network ID) for any IPv4 subnet. Enter an IP and mask to calculate the correct starting address for your network segment.',
};

export default function NetworkAddressCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Network Address Calculator"
        description="Easily determine the network address (Network ID) for any IPv4 subnet by providing an IP address and its corresponding subnet mask."
      />
      <NetworkAddressCalculator />
    </>
  );
}
