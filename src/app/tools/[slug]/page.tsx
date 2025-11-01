

import { allTools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BinaryToIpConverter } from '@/app/tools/binary-to-ip/binary-to-ip-converter';
import { IpToBinaryConverter } from '@/app/tools/ip-to-binary/ip-to-binary-converter';
import { SubnetCalculator } from '@/app/tools/subnet-calculator/subnet-calculator';
import { SubnetMaskConverter } from '@/app/tools/subnet-mask-converter/subnet-mask-converter';
import { VlsmCalculator } from '@/app/tools/vlsm-calculator/vlsm-calculator';
import { BandwidthEstimator } from '@/app/tools/bandwidth-estimator/bandwidth-estimator';
import { LatencyEstimator } from '@/app/tools/latency-estimator/latency-estimator';
import { PasswordStrengthChecker } from '@/app/tools/password-strength-checker/password-strength-checker';
import { DataTransferTimeCalculator } from '@/app/tools/data-transfer-calculator/data-transfer-calculator';
import { MacValidator } from '@/app/tools/mac-validator/mac-validator';
import { PortLookupTool } from '@/app/tools/port-lookup/port-lookup-tool';
import { NetworkMaskValidator } from '@/app/tools/network-mask-validator/network-mask-validator';
import { IpPrivacyChecker } from '@/app/tools/ip-privacy-checker/ip-privacy-checker';
import { IpClassFinder } from '@/app/tools/ip-class-finder/ip-class-finder';
import { IpRangeGenerator } from '@/app/tools/ip-range-generator/ip-range-generator';
import { BroadcastAddressCalculator } from '@/app/tools/broadcast-address-calculator/broadcast-address-calculator';
import { HostCountCalculator } from '@/app/tools/host-count-calculator/host-count-calculator';
import { NetworkAddressCalculator } from '@/app/tools/network-address-calculator/network-address-calculator';
import { CidrToSubnetListGenerator } from '@/app/tools/cidr-to-subnet-list/cidr-to-subnet-list-generator';
import { CidrToWildcardConverter } from '@/app/tools/cidr-to-wildcard/cidr-to-wildcard-converter';
import { IpSummarizationTool } from '@/app/tools/ip-summarization/ip-summarization-tool';
import { HttpHeaderChecker } from '@/app/tools/http-header-checker/http-header-checker';
import { SslExpiryChecker } from '@/app/tools/ssl-expiry-checker/ssl-expiry-checker';
import { UrlEncoderDecoder } from '@/app/tools/url-encoder-decoder/url-encoder-decoder';
import { HtmlEntityEncoderDecoder } from '@/app/tools/html-entity-encoder-decoder/html-entity-encoder-decoder';
import { SslChecker } from '@/app/tools/ssl-checker/ssl-checker';
import { CodeMinifier } from '@/app/tools/code-minifier/code-minifier';
import { RobotsTxtTool } from '@/app/tools/robots-txt-tool/robots-txt-tool';
import { SitemapGenerator } from '@/app/tools/sitemap-generator/sitemap-generator';
import { ResponseTimeCalculator } from '@/app/tools/response-time-calculator/response-time-calculator';
import { DomainExpiryCountdown } from '@/app/tools/domain-expiry-countdown/domain-expiry-countdown';
import { UptimeCalculator } from '@/app/tools/uptime-calculator/uptime-calculator';
import { DnsLookupTool } from '@/app/tools/dns-lookup/dns-lookup-tool';
import { ReverseDnsLookupTool } from '@/app/tools/reverse-dns-lookup/reverse-dns-lookup-tool';
import { WhoisLookupTool } from '@/app/tools/whois-lookup/whois-lookup-tool';
import { WebpageLoadTimeEstimator } from '@/app/tools/load-time-estimator/load-time-estimator';
import { CacheExpirationCalculator } from '@/app/tools/cache-expiry-calculator/cache-expiry-calculator';
import { CompressionEstimator } from '@/app/tools/compression-estimator/compression-estimator';
import { CdnBandwidthEstimator } from '@/app/tools/cdn-bandwidth-estimator/cdn-bandwidth-estimator';
import { CodeFormatter } from '@/app/tools/code-formatter/code-formatter';
import { RegexTester } from '@/app/tools/regex-tester/regex-tester';
import { Base64EncoderDecoder } from '@/app/tools/base64-encoder-decoder/base64-encoder-decoder';
import { ColorConverter } from '@/app/tools/color-converter/color-converter';
import { ColorPaletteGenerator } from '@/app/tools/color-palette-generator/color-palette-generator';
import { NumberConverter } from '@/app/tools/number-converter/number-converter';
import { HashGenerator } from '@/app/tools/hash-generator-md5-sha/hash-generator';
import { Rot13EncoderDecoder } from '@/app/tools/rot13-encoder-decoder/rot13-encoder-decoder';
import { CaesarCipher } from '@/app/tools/caesar-cipher/caesar-cipher';
import { PrimeChecker } from '@/app/tools/prime-checker/prime-checker';
import { PrimeNumberGeneratorTool } from '@/app/tools/prime-number-generator/prime-number-generator';
import { FibonacciGeneratorTool } from '@/app/tools/fibonacci-generator/fibonacci-generator';
import { FactorialCalculator } from '@/app/tools/factorial-calculator/factorial-calculator';
import { AlgorithmStepSimulator } from '@/app/tools/algorithm-simulator/algorithm-simulator';
import { RandomStringGenerator } from '@/app/tools/random-string-generator/random-string-generator';

export async function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }));
}

type ToolPageProps = {
  params: {
    slug: string;
  };
};

const toolComponents: Record<string, React.ComponentType> = {
    'binary-to-ip': BinaryToIpConverter,
    'ip-to-binary': IpToBinaryConverter,
    'subnet-calculator': SubnetCalculator,
    'subnet-mask-converter': SubnetMaskConverter,
    'vlsm-calculator': VlsmCalculator,
    'bandwidth-estimator': BandwidthEstimator,
    'latency-estimator': LatencyEstimator,
    'password-strength-checker': PasswordStrengthChecker,
    'data-transfer-calculator': DataTransferTimeCalculator,
    'mac-validator': MacValidator,
    'port-lookup': PortLookupTool,
    'network-mask-validator': NetworkMaskValidator,
    'ip-privacy-checker': IpPrivacyChecker,
    'ip-class-finder': IpClassFinder,
    'ip-range-generator': IpRangeGenerator,
    'broadcast-address-calculator': BroadcastAddressCalculator,
    'host-count-calculator': HostCountCalculator,
    'network-address-calculator': NetworkAddressCalculator,
    'cidr-to-subnet-list': CidrToSubnetListGenerator,
    'cidr-to-wildcard': CidrToWildcardConverter,
    'ip-summarization': IpSummarizationTool,
    'http-header-checker': HttpHeaderChecker,
    'ssl-expiry-checker': SslExpiryChecker,
    'url-encoder-decoder': UrlEncoderDecoder,
    'html-entity-encoder-decoder': HtmlEntityEncoderDecoder,
    'ssl-checker': SslChecker,
    'code-minifier': CodeMinifier,
    'robots-txt-tool': RobotsTxtTool,
    'sitemap-generator': SitemapGenerator,
    'response-time-calculator': ResponseTimeCalculator,
    'domain-expiry-countdown': DomainExpiryCountdown,
    'uptime-calculator': UptimeCalculator,
    'dns-lookup': DnsLookupTool,
    'reverse-dns-lookup': ReverseDnsLookupTool,
    'whois-lookup': WhoisLookupTool,
    'load-time-estimator': WebpageLoadTimeEstimator,
    'cache-expiry-calculator': CacheExpirationCalculator,
    'compression-estimator': CompressionEstimator,
    'cdn-bandwidth-estimator': CdnBandwidthEstimator,
    'code-formatter': CodeFormatter,
    'regex-tester': RegexTester,
    'base64-encoder-decoder': Base64EncoderDecoder,
    'color-converter': ColorConverter,
    'color-palette-generator': ColorPaletteGenerator,
    'number-converter': NumberConverter,
    'hash-generator-md5-sha': HashGenerator,
    'rot13-encoder-decoder': Rot13EncoderDecoder,
    'caesar-cipher': CaesarCipher,
    'prime-checker': PrimeChecker,
    'prime-number-generator': PrimeNumberGeneratorTool,
    'fibonacci-generator': FibonacciGeneratorTool,
    'factorial-calculator': FactorialCalculator,
    'algorithm-simulator': AlgorithmStepSimulator,
    'random-string-generator': RandomStringGenerator,
};


export default function ToolPage({ params }: ToolPageProps) {
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }
  
  const ToolComponent = toolComponents[params.slug];

  return (
    <>
      <PageHeader title={tool.name} description={tool.description} />
      
      {ToolComponent ? <ToolComponent /> : <ComingSoon />}
    </>
  );
}

function ComingSoon() {
    const bgImage = PlaceHolderImages.find(img => img.id === 'tech-background');
    const tool = allTools.find((t) => t.slug === 'binary-to-ip');
    
    return (
        <Card className="mt-8 overflow-hidden">
        <CardHeader className="relative h-48 md:h-64 flex items-center justify-center text-center p-0">
          {bgImage && (
            <Image
              src={bgImage.imageUrl}
              alt="Under Construction"
              fill
              className="object-cover"
              data-ai-hint={bgImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
          <div className="relative z-10 text-primary-foreground p-6">
            <Construction className="mx-auto h-16 w-16 mb-4" />
            <CardTitle className="text-3xl font-bold">Tool Coming Soon!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg text-center text-muted-foreground">
            We are working hard to bring this tool to you. Please check back later!
          </p>
        </CardContent>
      </Card>
    )
}

    
