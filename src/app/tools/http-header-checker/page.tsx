
import { PageHeader } from '@/components/page-header';
import { HttpHeaderChecker } from './http-header-checker';

export const metadata = {
    title: 'HTTP Header Checker | ICT Toolbench',
    description: 'Instantly view the full HTTP response headers for any URL. A free tool for developers, SEOs, and security analysts to debug and inspect header information.',
};

export default function HttpHeaderCheckerPage() {
  return (
    <>
      <PageHeader
        title="HTTP Header Checker"
        description="Enter any URL to inspect the full list of HTTP response headers sent by the server. Ideal for debugging, SEO analysis, and security checks."
      />
      <HttpHeaderChecker />
    </>
  );
}
