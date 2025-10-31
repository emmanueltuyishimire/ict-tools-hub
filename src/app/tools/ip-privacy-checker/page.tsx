
import { PageHeader } from '@/components/page-header';
import { IpPrivacyChecker } from './ip-privacy-checker';

export const metadata = {
    title: 'Public vs. Private IP Address Checker | ICT Toolbench',
    description: 'Instantly determine if an IPv4 address is public or private (RFC 1918). Learn about NAT, loopback, and link-local addresses with our tool.',
};

export default function IpPrivacyCheckerPage() {
  return (
    <>
      <PageHeader
        title="Public vs. Private IP Checker"
        description="Determine if an IPv4 address is public, private, loopback, or reserved with this instant checker and educational guide."
      />
      <IpPrivacyChecker />
    </>
  );
}
