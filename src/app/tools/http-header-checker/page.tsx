
import { PageHeader } from '@/components/page-header';
import { HttpHeaderChecker } from './http-header-checker';

export const metadata = {
    title: 'Live HTTP Header Checker | Check & Analyze Response Headers | ICT Toolbench',
    description: 'Instantly inspect the HTTP response headers of any URL in real-time. Analyze status codes, cache-control, redirects, and security headers (CSP, HSTS) with our free tool. Essential for developers, SEOs, and sysadmins.',
};

export default function HttpHeaderCheckerPage() {
  return (
    <>
      <PageHeader
        title="HTTP Header Checker"
        description="Enter a URL to see the full list of HTTP response headers returned by the server. Useful for debugging redirects, caching, and security configurations."
      />
      <HttpHeaderChecker />
    </>
  );
}

