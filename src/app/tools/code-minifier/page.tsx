
import { PageHeader } from '@/components/page-header';
import { CodeMinifier } from './code-minifier';

export const metadata = {
    title: 'HTML, CSS, & JS Minifier | ICT Toolbench',
    description: 'Reduce the file size of your HTML, CSS, and JavaScript code. Paste your code to get a minified version for faster web page loading.',
};

export default function CodeMinifierPage() {
  return (
    <>
      <PageHeader
        title="HTML, CSS, & JS Minifier"
        description="Paste your code into the appropriate tab to get a minified version. Minifying your assets can significantly improve your website's performance."
      />
      <CodeMinifier />
    </>
  );
}
