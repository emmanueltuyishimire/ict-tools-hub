
import { PageHeader } from '@/components/page-header';
import { UrlEncoderDecoder } from './url-encoder-decoder';

export const metadata = {
    title: 'URL Encoder / Decoder | ICT Toolbench',
    description: 'Instantly encode or decode URLs and text strings. Handles special characters for web-safe URLs, with detailed explanations on URI components and percent-encoding.',
};

export default function UrlEncoderDecoderPage() {
  return (
    <>
      <PageHeader
        title="URL Encoder / Decoder"
        description="Easily encode strings for safe use in URLs or decode URL-encoded strings back to their original form. This tool handles percent-encoding for all special characters."
      />
      <UrlEncoderDecoder />
    </>
  );
}
