
import { PageHeader } from '@/components/page-header';
import { SslExpiryChecker } from './ssl-expiry-checker';

export const metadata = {
    title: 'SSL Certificate Expiration Checker | ICT Toolbench',
    description: 'Check the expiration date and validity of any SSL/TLS certificate in real-time. Verify issuer details, days remaining, and learn why SSL is critical for web security.',
};

export default function SslExpiryCheckerPage() {
  return (
    <>
      <PageHeader
        title="SSL Certificate Expiration Checker"
        description="Enter a domain name to check the validity and expiration date of its SSL/TLS certificate, ensuring your connection is secure and trusted."
      />
      <SslExpiryChecker />
    </>
  );
}
