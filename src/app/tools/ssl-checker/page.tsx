
import { PageHeader } from '@/components/page-header';
import { SslChecker } from './ssl-checker';

export const metadata = {
    title: 'SSL Certificate Checker | ICT Toolbench',
    description: 'Check the expiration date, issuer, and validity of any SSL/TLS certificate. Ensure your website connection is secure and trusted.',
};

export default function SslCheckerPage() {
  return (
    <>
      <PageHeader
        title="SSL Certificate Checker"
        description="Enter a domain name to check the validity and details of its SSL/TLS certificate, ensuring your connection is secure and trusted."
      />
      <SslChecker />
    </>
  );
}
