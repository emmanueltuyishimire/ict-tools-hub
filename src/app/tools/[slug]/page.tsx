

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
import { HttpRequestSizeCalculator } from '@/app/tools/http-request-size-calculator/http-request-size-calculator';
import { SslExpiryChecker } from '@/app/tools/ssl-expiry-checker/ssl-expiry-checker';
import { UrlEncoderDecoder } from '@/app/tools/url-encoder-decoder/url-encoder-decoder';
import { HtmlEntityEncoderDecoder } from '@/app/tools/html-entity-encoder-decoder/html-entity-encoder-decoder';
import { CodeMinifier } from '@/app/tools/code-minifier/code-minifier';
import { RobotsTxtTool } from '@/app/tools/robots-txt-tool/robots-txt-tool';
import { SitemapGenerator } from '@/app/tools/sitemap-generator/sitemap-generator';
import { ResponseTimeCalculator } from '@/app/tools/response-time-calculator/response-time-calculator';
import { DomainExpiryCountdown } from '@/app/tools/domain-expiry-countdown/domain-expiry-countdown';
import { SslChecker } from '@/app/tools/ssl-checker/ssl-checker';
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
import { BigOCalculator } from '@/app/tools/big-o-calculator/big-o-calculator';
import { PrimeChecker } from '@/app/tools/prime-checker/prime-checker';
import { PrimeNumberGeneratorTool } from '@/app/tools/prime-number-generator/prime-number-generator';
import { FibonacciGeneratorTool } from '@/app/tools/fibonacci-generator/fibonacci-generator';
import { FactorialCalculator } from '@/app/tools/factorial-calculator/factorial-calculator';
import { RandomStringGenerator } from '@/app/tools/random-string-generator/random-string-generator';
import { RandomNumberGenerator } from '@/app/tools/random-number-generator/random-number-generator';
import { CodeSnippetFormatter } from '@/app/tools/code-snippet-formatter/code-snippet-formatter';
import { VariableNameValidator } from '@/app/tools/variable-name-validator/variable-name-validator';
import { UnicodeAsciiConverter } from '@/app/tools/unicode-ascii-converter/unicode-ascii-converter';
import { PasswordGenerator } from '@/app/tools/password-generator/password-generator';
import { PasswordEntropyCalculator } from '@/app/tools/password-entropy-calculator/password-entropy-calculator';
import { EncryptionDecryptionTool } from '@/app/tools/encryption-decryption-tool/encryption-decryption-tool';
import { TotpDemo } from '@/app/tools/totp-demo/totp-demo';
import { Base32_58EncoderDecoder } from '@/app/tools/base32-58-encoder-decoder/base32-58-encoder-decoder';
import { FileIntegrityChecker } from '@/app/tools/file-integrity-checker/file-integrity-checker';
import { CodeForm } from '../code-generator/code-form';
import { AlgorithmStepSimulator } from '../algorithm-simulator/algorithm-simulator';
import { CloudStorageCostEstimator } from '@/app/tools/cloud-storage-cost-estimator/cloud-storage-cost-estimator';
import { BandwidthCostCalculator } from '@/app/tools/bandwidth-cost-calculator/bandwidth-cost-calculator';
import { BackupStorageCalculator } from '@/app/tools/backup-storage-calculator/backup-storage-calculator';
import { VmRequirementEstimator } from '@/app/tools/vm-requirement-estimator/vm-requirement-estimator';
import { DiskUsageEstimator } from '@/app/tools/disk-usage-estimator/disk-usage-estimator';
import { CloudInstanceCostCalculator } from '@/app/tools/cloud-instance-cost-calculator/cloud-instance-cost-calculator';
import { StorageMemoryCostAnalyzer } from '@/app/tools/storage-memory-cost-analyzer/storage-memory-cost-analyzer';
import { DataRetentionCalculator } from '@/app/tools/data-retention-calculator/data-retention-calculator';
import { BackupScheduler } from '@/app/tools/backup-scheduler/backup-scheduler';
import { StorageGrowthEstimator } from '@/app/tools/storage-growth-estimator/storage-growth-estimator';
import { DatabaseGrowthCalculator } from '@/app/tools/db-growth-calculator/db-growth-calculator';
import { PrimaryForeignKeyValidator } from '@/app/tools/key-validator/key-validator';


export async function generateMetadata({ params: rawParams }: { params: { slug: string } }) {
  const params = await rawParams;
  const tool = allTools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} | ICT Toolbench`,
    description: tool.description,
    openGraph: {
        title: `${tool.name} | ICT Toolbench`,
        description: tool.description,
        url: `/tools/${tool.slug}`,
    }
  };
}

// This map is crucial for rendering the correct component based on the slug
const toolComponentMap: { [key: string]: React.ComponentType } = {
  'ip-to-binary': IpToBinaryConverter,
  'binary-to-ip': BinaryToIpConverter,
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
  'http-request-size-calculator': HttpRequestSizeCalculator,
  'ssl-expiry-checker': SslExpiryChecker,
  'url-encoder-decoder': UrlEncoderDecoder,
  'html-entity-encoder-decoder': HtmlEntityEncoderDecoder,
  'code-minifier': CodeMinifier,
  'robots-txt-tool': RobotsTxtTool,
  'sitemap-generator': SitemapGenerator,
  'response-time-calculator': ResponseTimeCalculator,
  'domain-expiry-countdown': DomainExpiryCountdown,
  'ssl-checker': SslChecker,
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
  'big-o-calculator': BigOCalculator,
  'prime-checker': PrimeChecker,
  'prime-number-generator': PrimeNumberGeneratorTool,
  'fibonacci-generator': FibonacciGeneratorTool,
  'factorial-calculator': FactorialCalculator,
  'random-string-generator': RandomStringGenerator,
  'random-number-generator': RandomNumberGenerator,
  'code-snippet-formatter': CodeSnippetFormatter,
  'variable-name-validator': VariableNameValidator,
  'unicode-ascii-converter': UnicodeAsciiConverter,
  'password-generator': PasswordGenerator,
  'password-entropy-calculator': PasswordEntropyCalculator,
  'encryption-decryption-tool': EncryptionDecryptionTool,
  'totp-demo': TotpDemo,
  'base32-58-encoder-decoder': Base32_58EncoderDecoder,
  'file-integrity-checker': FileIntegrityChecker,
  'code-generator': CodeForm,
  'algorithm-simulator': AlgorithmStepSimulator,
  'cloud-storage-cost-estimator': CloudStorageCostEstimator,
  'bandwidth-cost-calculator': BandwidthCostCalculator,
  'backup-storage-calculator': BackupStorageCalculator,
  'data-compression-calculator': CompressionEstimator,
  'vm-requirement-estimator': VmRequirementEstimator,
  'disk-usage-estimator': DiskUsageEstimator,
  'cloud-instance-cost-calculator': CloudInstanceCostCalculator,
  'storage-memory-cost-analyzer': StorageMemoryCostAnalyzer,
  'data-retention-calculator': DataRetentionCalculator,
  'backup-scheduler': BackupScheduler,
  'storage-growth-estimator': StorageGrowthEstimator,
  'db-growth-calculator': DatabaseGrowthCalculator,
  'key-validator': PrimaryForeignKeyValidator,
  'normalization-checker': () => null, // Placeholder for the guide page
};

export default async function ToolPage({ params: rawParams }: { params: { slug: string } }) {
  const params = await rawParams;
  const tool = allTools.find((t) => t.slug === params.slug);
  const ToolComponent = toolComponentMap[params.slug];

  if (!tool) {
    notFound();
  }

  const placeholderImage = PlaceHolderImages.find(img => img.id === 'tech-background') || PlaceHolderImages[0];

  return (
    <div className="max-w-4xl mx-auto">
        <PageHeader
            title={tool.name}
            description={tool.description}
        />
        {ToolComponent ? (
          <ToolComponent />
        ) : (
            <Card>
                <CardHeader>
                    <CardTitle>Tool Under Construction</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                        <Construction className="w-16 h-16 text-muted-foreground" />
                        <p className="text-muted-foreground">This tool is currently under construction. Please check back later!</p>
                        <Image
                            src={placeholderImage.imageUrl}
                            alt="Under Construction"
                            width={400}
                            height={300}
                            className="rounded-lg object-cover"
                            data-ai-hint={placeholderImage.imageHint}
                        />
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}

export function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }));
}
