import { PageHeader } from '@/components/page-header';
import { HtmlEntityEncoderDecoder } from './html-entity-encoder-decoder';

export const metadata = {
    title: 'HTML Entity Encoder / Decoder | ICT Toolbench',
    description: 'Easily encode and decode HTML entities to safely display special characters and code snippets on your website. Real-time, client-side conversion.',
};

export default function HtmlEntityEncoderDecoderPage() {
  return (
    <>
      <PageHeader
        title="HTML Entity Encoder / Decoder"
        description="Convert text to HTML entities to safely display special characters and code, or decode entities back to plain text."
      />
      <HtmlEntityEncoderDecoder />
    </>
  );
}
