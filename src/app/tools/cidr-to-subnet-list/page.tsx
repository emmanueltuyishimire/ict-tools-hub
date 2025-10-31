
import { PageHeader } from '@/components/page-header';
import { CidrToSubnetListGenerator } from './cidr-to-subnet-list-generator';

export const metadata = {
    title: 'CIDR to Subnet List Generator | ICT Toolbench',
    description: 'Easily divide a large network block into multiple, equal-sized subnets using fixed-length subnet masking (FLSM). Generate a complete list of subnets from a given CIDR.',
};

export default function CidrToSubnetListPage() {
  return (
    <>
      <PageHeader
        title="CIDR to Subnet List Generator"
        description="Divide a large network CIDR block into a list of smaller, equal-sized subnets. Ideal for fixed-length subnet mask (FLSM) planning and documentation."
      />
      <CidrToSubnetListGenerator />
    </>
  );
}
