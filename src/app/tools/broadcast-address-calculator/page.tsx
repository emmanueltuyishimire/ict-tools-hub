
import { PageHeader } from '@/components/page-header';
import { BroadcastAddressCalculator } from './broadcast-address-calculator';

export const metadata = {
    title: 'Broadcast Address Calculator | ICT Toolbench',
    description: 'Quickly find the broadcast address for any IPv4 network subnet. Enter an IP and mask to calculate the correct broadcast IP for your network segment.',
};

export default function BroadcastAddressCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Broadcast Address Calculator"
        description="Easily determine the broadcast address for any IPv4 subnet by providing an IP address and its corresponding subnet mask."
      />
      <BroadcastAddressCalculator />
    </>
  );
}
