
import { PageHeader } from '@/components/page-header';
import { NetworkMaskValidator } from './network-mask-validator';

export const metadata = {
    title: 'Network Mask Validator | ICT Toolbench',
    description: 'Instantly validate any IPv4 network mask. Check for valid formats (dot-decimal, CIDR), see the wildcard and binary equivalents, and learn the rules of subnet masking.',
};

export default function NetworkMaskValidatorPage() {
  return (
    <>
      <PageHeader
        title="Network Mask Validator"
        description="Check if a subnet mask is valid, see its properties, and learn the rules that govern network masks in IPv4."
      />
      <NetworkMaskValidator />
    </>
  );
}
