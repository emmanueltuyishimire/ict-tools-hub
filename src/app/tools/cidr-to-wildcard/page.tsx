
import { PageHeader } from '@/components/page-header';
import { CidrToWildcardConverter } from './cidr-to-wildcard-converter';

export const metadata = {
    title: 'CIDR to Wildcard Mask Converter | ICT Toolbench',
    description: 'Instantly convert any CIDR prefix (e.g., /24) to its corresponding wildcard mask for use in ACLs and routing protocols. Includes binary views and explanations.',
};

export default function CidrToWildcardPage() {
  return (
    <>
      <PageHeader
        title="CIDR to Wildcard Mask Converter"
        description="Quickly convert a CIDR prefix into its wildcard mask equivalent for firewall ACLs and router configurations."
      />
      <CidrToWildcardConverter />
    </>
  );
}
