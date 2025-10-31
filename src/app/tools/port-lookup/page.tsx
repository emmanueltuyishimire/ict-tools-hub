
import { PageHeader } from '@/components/page-header';
import { PortLookupTool } from './port-lookup-tool';

export const metadata = {
    title: 'Port Number Lookup – Find Service, Protocol, and Port Info Instantly | ICT Toolbench',
    description: 'Instantly identify which service or protocol a port number uses, or find the port for any service name. Educational guide + lookup tool.',
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
