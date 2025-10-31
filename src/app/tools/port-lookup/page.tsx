
import { PageHeader } from '@/components/page-header';
import { PortLookupTool } from './port-lookup-tool';

export const metadata = {
    title: 'Port Number Lookup | ICT Toolbench',
    description: 'Quickly look up common TCP/UDP port numbers and their associated services. A vital tool for network administrators, security professionals, and developers.',
};

export default function PortLookupPage() {
  return (
    <>
      <PageHeader
        title="Port Number Lookup"
        description="Find common TCP and UDP port numbers and their associated services. Search by port, protocol, or service name."
      />
      <PortLookupTool />
    </>
  );
}
