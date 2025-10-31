import { PageHeader } from '@/components/page-header';
import { PasswordStrengthChecker } from './password-strength-checker';

export const metadata = {
    title: 'Password Strength Checker | ICT Toolbench',
    description: 'Analyze password strength in real-time. Check for length, complexity, and entropy to create more secure passwords.',
};

export default function PasswordStrengthCheckerPage() {
  return (
    <>
      <PageHeader
        title="Password Strength Checker"
        description="Analyze your password's strength against modern security criteria. Get instant feedback on length, character variety, and crack time estimates."
      />
      <PasswordStrengthChecker />
    </>
  );
}
