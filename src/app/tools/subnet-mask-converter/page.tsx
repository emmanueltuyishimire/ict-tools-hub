
import { PageHeader } from '@/components/page-header';
import { SubnetMaskConverter } from './subnet-mask-converter';

export const metadata = {
    title: 'Subnet Mask Converter | ICT Toolbench',
    description: 'Instantly convert between CIDR, subnet mask, and wildcard mask formats. An essential tool for network engineers configuring routers and firewalls.',
};

export default function SubnetMaskConverterPage() {
  return (
    <>
      <PageHeader
        title="Subnet Mask Converter"
        description="Seamlessly convert between CIDR notation, dot-decimal subnet masks, and wildcard masks. Get all the formats you need for your network configurations."
      />
      <SubnetMaskConverter />
    </>
  );
}
