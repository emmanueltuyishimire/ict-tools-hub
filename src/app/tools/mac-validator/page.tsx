
import { PageHeader } from '@/components/page-header';
import { MacValidator } from './mac-validator';

export const metadata = {
    title: 'MAC Address Validator | ICT Toolbench',
    description: 'Instantly validate any MAC address format. Check for correctness and identify the hardware manufacturer using our OUI lookup tool.',
};

export default function MacValidatorPage() {
  return (
    <>
      <PageHeader
        title="MAC Address Validator"
        description="Instantly validate a MAC address, identify its format, and look up the hardware manufacturer using its OUI."
      />
      <MacValidator />
    </>
  );
}
