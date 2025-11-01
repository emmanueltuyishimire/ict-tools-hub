
import { PageHeader } from '@/components/page-header';
import { HtmlEntityEncoderDecoder } from './html-entity-encoder-decoder';

export const metadata = {
    title: 'HTML Entity Encoder / Decoder | ICT Toolbench',
    description: 'Safely encode and decode HTML entities. Convert special characters to their HTML-safe equivalents to prevent XSS attacks and display code correctly. A key tool for web developers.',
};

export default function HtmlEntityEncoderDecoderPage() {
  return (
    <>
      <PageHeader
        title="HTML Entity Encoder / Decoder"
        description="Easily encode special characters for safe inclusion in HTML or decode entities back to their original form. An essential tool for displaying code and preventing XSS."
      />
      <HtmlEntityEncoderDecoder />
    </>
  );
}
