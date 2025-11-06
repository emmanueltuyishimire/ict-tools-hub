'use client';

import { allTools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingComponent = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-40 w-full" />
        </CardContent>
    </Card>
);

// Dynamically import all tool components
const BinaryToIpConverter = dynamic(() => import('@/app/tools/binary-to-ip/binary-to-ip-converter').then(mod => mod.BinaryToIpConverter), { loading: () => <LoadingComponent /> });
const IpToBinaryConverter = dynamic(() => import('@/app/tools/ip-to-binary/ip-to-binary-converter').then(mod => mod.IpToBinaryConverter), { loading: () => <LoadingComponent /> });
const SubnetCalculator = dynamic(() => import('@/app/tools/subnet-calculator/subnet-calculator').then(mod => mod.SubnetCalculator), { loading: () => <LoadingComponent /> });
const SubnetMaskConverter = dynamic(() => import('@/app/tools/subnet-mask-converter/subnet-mask-converter').then(mod => mod.SubnetMaskConverter), { loading: () => <LoadingComponent /> });
const VlsmCalculator = dynamic(() => import('@/app/tools/vlsm-calculator/vlsm-calculator').then(mod => mod.VlsmCalculator), { loading: () => <LoadingComponent /> });
const BandwidthEstimator = dynamic(() => import('@/app/tools/bandwidth-estimator/bandwidth-estimator').then(mod => mod.BandwidthEstimator), { loading: () => <LoadingComponent /> });
const LatencyEstimator = dynamic(() => import('@/app/tools/latency-estimator/latency-estimator').then(mod => mod.LatencyEstimator), { loading: () => <LoadingComponent /> });
const PasswordStrengthChecker = dynamic(() => import('@/app/tools/password-strength-checker/password-strength-checker').then(mod => mod.PasswordStrengthChecker), { loading: () => <LoadingComponent /> });
const DataTransferTimeCalculator = dynamic(() => import('@/app/tools/data-transfer-calculator/data-transfer-calculator').then(mod => mod.DataTransferTimeCalculator), { loading: () => <LoadingComponent /> });
const MacValidator = dynamic(() => import('@/app/tools/mac-validator/mac-validator').then(mod => mod.MacValidator), { loading: () => <LoadingComponent /> });
const PortLookupTool = dynamic(() => import('@/app/tools/port-lookup/port-lookup-tool').then(mod => mod.PortLookupTool), { loading: () => <LoadingComponent /> });
const NetworkMaskValidator = dynamic(() => import('@/app/tools/network-mask-validator/network-mask-validator').then(mod => mod.NetworkMaskValidator), { loading: () => <LoadingComponent /> });
const IpPrivacyChecker = dynamic(() => import('@/app/tools/ip-privacy-checker/ip-privacy-checker').then(mod => mod.IpPrivacyChecker), { loading: () => <LoadingComponent /> });
const IpClassFinder = dynamic(() => import('@/app/tools/ip-class-finder/ip-class-finder').then(mod => mod.IpClassFinder), { loading: () => <LoadingComponent /> });
const IpRangeGenerator = dynamic(() => import('@/app/tools/ip-range-generator/ip-range-generator').then(mod => mod.IpRangeGenerator), { loading: () => <LoadingComponent /> });
const BroadcastAddressCalculator = dynamic(() => import('@/app/tools/broadcast-address-calculator/broadcast-address-calculator').then(mod => mod.BroadcastAddressCalculator), { loading: () => <LoadingComponent /> });
const HostCountCalculator = dynamic(() => import('@/app/tools/host-count-calculator/host-count-calculator').then(mod => mod.HostCountCalculator), { loading: () => <LoadingComponent /> });
const NetworkAddressCalculator = dynamic(() => import('@/app/tools/network-address-calculator/network-address-calculator').then(mod => mod.NetworkAddressCalculator), { loading: () => <LoadingComponent /> });
const CidrToSubnetListGenerator = dynamic(() => import('@/app/tools/cidr-to-subnet-list/cidr-to-subnet-list-generator').then(mod => mod.CidrToSubnetListGenerator), { loading: () => <LoadingComponent /> });
const CidrToWildcardConverter = dynamic(() => import('@/app/tools/cidr-to-wildcard/cidr-to-wildcard-converter').then(mod => mod.CidrToWildcardConverter), { loading: () => <LoadingComponent /> });
const IpSummarizationTool = dynamic(() => import('@/app/tools/ip-summarization/ip-summarization-tool').then(mod => mod.IpSummarizationTool), { loading: () => <LoadingComponent /> });
const HttpHeaderChecker = dynamic(() => import('@/app/tools/http-header-checker/http-header-checker').then(mod => mod.HttpHeaderChecker), { loading: () => <LoadingComponent /> });
const HttpRequestSizeCalculator = dynamic(() => import('@/app/tools/http-request-size-calculator/http-request-size-calculator').then(mod => mod.HttpRequestSizeCalculator), { loading: () => <LoadingComponent /> });
const UrlEncoderDecoder = dynamic(() => import('@/app/tools/url-encoder-decoder/url-encoder-decoder').then(mod => mod.UrlEncoderDecoder), { loading: () => <LoadingComponent /> });
const CodeMinifier = dynamic(() => import('@/app/tools/code-minifier/code-minifier').then(mod => mod.CodeMinifier), { loading: () => <LoadingComponent /> });
const RobotsTxtTool = dynamic(() => import('@/app/tools/robots-txt-tool/robots-txt-tool').then(mod => mod.RobotsTxtTool), { loading: () => <LoadingComponent /> });
const SitemapGenerator = dynamic(() => import('@/app/tools/sitemap-generator/sitemap-generator').then(mod => mod.SitemapGenerator), { loading: () => <LoadingComponent /> });
const ResponseTimeCalculator = dynamic(() => import('@/app/tools/response-time-calculator/response-time-calculator').then(mod => mod.ResponseTimeCalculator), { loading: () => <LoadingComponent /> });
const SslChecker = dynamic(() => import('@/app/tools/ssl-checker/ssl-checker').then(mod => mod.SslChecker), { loading: () => <LoadingComponent /> });
const UptimeCalculator = dynamic(() => import('@/app/tools/uptime-calculator/uptime-calculator').then(mod => mod.UptimeCalculator), { loading: () => <LoadingComponent /> });
const DnsLookupTool = dynamic(() => import('@/app/tools/dns-lookup/dns-lookup-tool').then(mod => mod.DnsLookupTool), { loading: () => <LoadingComponent /> });
const ReverseDnsLookupTool = dynamic(() => import('@/app/tools/reverse-dns-lookup/reverse-dns-lookup-tool').then(mod => mod.ReverseDnsLookupTool), { loading: () => <LoadingComponent /> });
const WhoisLookupTool = dynamic(() => import('@/app/tools/whois-lookup/whois-lookup-tool').then(mod => mod.WhoisLookupTool), { loading: () => <LoadingComponent /> });
const WebpageLoadTimeEstimator = dynamic(() => import('@/app/tools/load-time-estimator/load-time-estimator').then(mod => mod.WebpageLoadTimeEstimator), { loading: () => <LoadingComponent /> });
const CacheExpirationCalculator = dynamic(() => import('@/app/tools/cache-expiry-calculator/cache-expiry-calculator').then(mod => mod.CacheExpirationCalculator), { loading: () => <LoadingComponent /> });
const CompressionEstimator = dynamic(() => import('@/app/tools/compression-estimator/compression-estimator').then(mod => mod.CompressionEstimator), { loading: () => <LoadingComponent /> });
const CdnBandwidthEstimator = dynamic(() => import('@/app/tools/cdn-bandwidth-estimator/cdn-bandwidth-estimator').then(mod => mod.CdnBandwidthEstimator), { loading: () => <LoadingComponent /> });
const CodeFormatter = dynamic(() => import('@/app/tools/code-formatter/code-formatter').then(mod => mod.CodeFormatter), { loading: () => <LoadingComponent /> });
const RegexTester = dynamic(() => import('@/app/tools/regex-tester/regex-tester').then(mod => mod.RegexTester), { loading: () => <LoadingComponent /> });
const Base64EncoderDecoder = dynamic(() => import('@/app/tools/base64-encoder-decoder/base64-encoder-decoder').then(mod => mod.Base64EncoderDecoder), { loading: () => <LoadingComponent /> });
const ColorConverter = dynamic(() => import('@/app/tools/color-converter/color-converter').then(mod => mod.ColorConverter), { loading: () => <LoadingComponent /> });
const ColorPaletteGenerator = dynamic(() => import('@/app/tools/color-palette-generator/color-palette-generator').then(mod => mod.ColorPaletteGenerator), { loading: () => <LoadingComponent /> });
const NumberConverter = dynamic(() => import('@/app/tools/number-converter/number-converter').then(mod => mod.NumberConverter), { loading: () => <LoadingComponent /> });
const HashGenerator = dynamic(() => import('@/app/tools/hash-generator-md5-sha/hash-generator').then(mod => mod.HashGenerator), { loading: () => <LoadingComponent /> });
const Rot13EncoderDecoder = dynamic(() => import('@/app/tools/rot13-encoder-decoder/rot13-encoder-decoder').then(mod => mod.Rot13EncoderDecoder), { loading: () => <LoadingComponent /> });
const CaesarCipher = dynamic(() => import('@/app/tools/caesar-cipher/caesar-cipher').then(mod => mod.CaesarCipher), { loading: () => <LoadingComponent /> });
const BigOCalculator = dynamic(() => import('@/app/tools/big-o-calculator/big-o-calculator').then(mod => mod.BigOCalculator), { loading: () => <LoadingComponent /> });
const PrimeChecker = dynamic(() => import('@/app/tools/prime-checker/prime-checker').then(mod => mod.PrimeChecker), { loading: () => <LoadingComponent /> });
const PrimeNumberGeneratorTool = dynamic(() => import('@/app/tools/prime-number-generator/prime-number-generator').then(mod => mod.PrimeNumberGeneratorTool), { loading: () => <LoadingComponent /> });
const FibonacciGeneratorTool = dynamic(() => import('@/app/tools/fibonacci-generator/fibonacci-generator').then(mod => mod.FibonacciGeneratorTool), { loading: () => <LoadingComponent /> });
const FactorialCalculator = dynamic(() => import('@/app/tools/factorial-calculator/factorial-calculator').then(mod => mod.FactorialCalculator), { loading: () => <LoadingComponent /> });
const RandomStringGenerator = dynamic(() => import('@/app/tools/random-string-generator/random-string-generator').then(mod => mod.RandomStringGenerator), { loading: () => <LoadingComponent /> });
const RandomNumberGenerator = dynamic(() => import('@/app/tools/random-number-generator/random-number-generator').then(mod => mod.RandomNumberGenerator), { loading: () => <LoadingComponent /> });
const CodeSnippetFormatter = dynamic(() => import('@/app/tools/code-snippet-formatter/code-snippet-formatter').then(mod => mod.CodeSnippetFormatter), { loading: () => <LoadingComponent /> });
const VariableNameValidator = dynamic(() => import('@/app/tools/variable-name-validator/variable-name-validator').then(mod => mod.VariableNameValidator), { loading: () => <LoadingComponent /> });
const UnicodeAsciiConverter = dynamic(() => import('@/app/tools/unicode-ascii-converter/unicode-ascii-converter').then(mod => mod.UnicodeAsciiConverter), { loading: () => <LoadingComponent /> });
const PasswordGenerator = dynamic(() => import('@/app/tools/password-generator/password-generator').then(mod => mod.PasswordGenerator), { loading: () => <LoadingComponent /> });
const PasswordEntropyCalculator = dynamic(() => import('@/app/tools/password-entropy-calculator/password-entropy-calculator').then(mod => mod.PasswordEntropyCalculator), { loading: () => <LoadingComponent /> });
const EncryptionDecryptionTool = dynamic(() => import('@/app/tools/encryption-decryption-tool/encryption-decryption-tool').then(mod => mod.EncryptionDecryptionTool), { loading: () => <LoadingComponent /> });
const TotpDemo = dynamic(() => import('@/app/tools/totp-demo/totp-demo').then(mod => mod.TotpDemo), { loading: () => <LoadingComponent /> });
const Base32_58EncoderDecoder = dynamic(() => import('@/app/tools/base32-58-encoder-decoder/base32-58-encoder-decoder').then(mod => mod.Base32_58EncoderDecoder), { loading: () => <LoadingComponent /> });
const FileIntegrityChecker = dynamic(() => import('@/app/tools/file-integrity-checker/file-integrity-checker').then(mod => mod.FileIntegrityChecker), { loading: () => <LoadingComponent /> });
const AlgorithmStepSimulator = dynamic(() => import('@/app/tools/algorithm-simulator/algorithm-simulator').then(mod => mod.AlgorithmStepSimulator), { loading: () => <LoadingComponent /> });
const CloudStorageCostEstimator = dynamic(() => import('@/app/tools/cloud-storage-cost-estimator/cloud-storage-cost-estimator').then(mod => mod.CloudStorageCostEstimator), { loading: () => <LoadingComponent /> });
const BandwidthCostCalculator = dynamic(() => import('@/app/tools/bandwidth-cost-calculator/bandwidth-cost-calculator').then(mod => mod.BandwidthCostCalculator), { loading: () => <LoadingComponent /> });
const BackupStorageCalculator = dynamic(() => import('@/app/tools/backup-storage-calculator/backup-storage-calculator').then(mod => mod.BackupStorageCalculator), { loading: () => <LoadingComponent /> });
const VmRequirementEstimator = dynamic(() => import('@/app/tools/vm-requirement-estimator/vm-requirement-estimator').then(mod => mod.VmRequirementEstimator), { loading: () => <LoadingComponent /> });
const DiskUsageEstimator = dynamic(() => import('@/app/tools/disk-usage-estimator/disk-usage-estimator').then(mod => mod.DiskUsageEstimator), { loading: () => <LoadingComponent /> });
const CloudInstanceCostCalculator = dynamic(() => import('@/app/tools/cloud-instance-cost-calculator/cloud-instance-cost-calculator').then(mod => mod.CloudInstanceCostCalculator), { loading: () => <LoadingComponent /> });
const StorageMemoryCostAnalyzer = dynamic(() => import('@/app/tools/storage-memory-cost-analyzer/storage-memory-cost-analyzer').then(mod => mod.StorageMemoryCostAnalyzer), { loading: () => <LoadingComponent /> });
const DataRetentionCalculator = dynamic(() => import('@/app/tools/data-retention-calculator/data-retention-calculator').then(mod => mod.DataRetentionCalculator), { loading: () => <LoadingComponent /> });
const BackupScheduler = dynamic(() => import('@/app/tools/backup-scheduler/backup-scheduler').then(mod => mod.BackupScheduler), { loading: () => <LoadingComponent /> });
const StorageGrowthEstimator = dynamic(() => import('@/app/tools/storage-growth-estimator/storage-growth-estimator').then(mod => mod.StorageGrowthEstimator), { loading: () => <LoadingComponent /> });
const DbStorageEstimator = dynamic(() => import('@/app/tools/db-storage-estimator/db-storage-estimator').then(mod => mod.DbStorageEstimator), { loading: () => <LoadingComponent /> });
const DatabaseGrowthCalculator = dynamic(() => import('@/app/tools/db-growth-calculator/db-growth-calculator').then(mod => mod.DatabaseGrowthCalculator), { loading: () => <LoadingComponent /> });
const PrimaryForeignKeyValidator = dynamic(() => import('@/app/tools/key-validator/key-validator').then(mod => mod.PrimaryForeignKeyValidator), { loading: () => <LoadingComponent /> });
const NormalizationChecker = dynamic(() => import('@/app/tools/normalization-checker/normalization-checker').then(mod => mod.NormalizationChecker), { loading: () => <LoadingComponent /> });
const DuplicateRowFinder = dynamic(() => import('@/app/tools/duplicate-row-finder/duplicate-row-finder').then(mod => mod.DuplicateRowFinder), { loading: () => <LoadingComponent /> });
const ColumnTypeConverter = dynamic(() => import('@/app/tools/column-type-converter/column-type-converter').then(mod => mod.ColumnTypeConverter), { loading: () => <LoadingComponent /> });
const DatabaseHealthChecker = dynamic(() => import('@/app/tools/db-health-checker/db-health-checker').then(mod => mod.DatabaseHealthChecker), { loading: () => <LoadingComponent /> });
const RecursionSimulator = dynamic(() => import('@/app/tools/recursion-simulator/recursion-simulator').then(mod => mod.RecursionSimulator), { loading: () => <LoadingComponent /> });
const BigOQuiz = dynamic(() => import('@/app/tools/big-o-quiz/big-o-quiz').then(mod => mod.default), { loading: () => <LoadingComponent /> });
const CloudSyncTimeCalculator = dynamic(() => import('@/app/tools/cloud-sync-time-calculator/cloud-sync-time-calculator').then(mod => mod.default), { loading: () => <LoadingComponent /> });
const DataMigrationEstimator = dynamic(() => import('@/app/tools/data-migration-estimator/data-migration-estimator').then(mod => mod.default), { loading: () => <LoadingComponent /> });
const VmScalingCalculator = dynamic(() => import('@/app/tools/vm-scaling-calculator/vm-scaling-calculator').then(mod => mod.default), { loading: () => <LoadingComponent /> });
const RaidCalculator = dynamic(() => import('@/app/tools/raid-calculator/raid-calculator').then(mod => mod.RaidCalculator), { loading: () => <LoadingComponent /> });
const UserQuotaCalculator = dynamic(() => import('@/app/tools/user-quota-calculator/user-quota-calculator').then(mod => mod.UserQuotaCalculator), { loading: () => <LoadingComponent /> });
const LogRotationCalculator = dynamic(() => import('@/app/tools/log-rotation-calculator/log-rotation-calculator').then(mod => mod.LogRotationCalculator), { loading: () => <LoadingComponent /> });
const TpsCalculator = dynamic(() => import('@/app/tools/tps-calculator/tps-calculator').then(mod => mod.TpsCalculator), { loading: () => <LoadingComponent /> });
const SqlInjectionTester = dynamic(() => import('@/app/tools/sql-injection-tester/sql-injection-tester').then(mod => mod.SqlInjectionTester), { loading: () => <LoadingComponent /> });
const IpLookupTool = dynamic(() => import('@/app/tools/ip-lookup/ip-lookup-tool').then(mod => mod.IpLookupTool), { loading: () => <LoadingComponent /> });
const StructuredDataTester = dynamic(() => import('@/app/tools/structured-data-tester/structured-data-tester').then(mod => mod.StructuredDataTester), { loading: () => <LoadingComponent /> });

const toolComponentMap: { [key: string]: React.ComponentType<any> } = {
  'ip-lookup': IpLookupTool,
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
  'url-encoder-decoder': UrlEncoderDecoder,
  'code-minifier': CodeMinifier,
  'robots-txt-tool': RobotsTxtTool,
  'sitemap-generator': SitemapGenerator,
  'response-time-calculator': ResponseTimeCalculator,
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
  'db-storage-estimator': DbStorageEstimator,
  'database-growth-calculator': DatabaseGrowthCalculator,
  'key-validator': PrimaryForeignKeyValidator,
  'normalization-checker': NormalizationChecker,
  'duplicate-row-finder': DuplicateRowFinder,
  'table-size-estimator': DbStorageEstimator,
  'column-type-converter': ColumnTypeConverter,
  'db-health-checker': DatabaseHealthChecker,
  'recursion-simulator': RecursionSimulator,
  'big-o-quiz': BigOQuiz,
  'cloud-sync-time-calculator': CloudSyncTimeCalculator,
  'data-migration-estimator': DataMigrationEstimator,
  'vm-scaling-calculator': VmScalingCalculator,
  'raid-calculator': RaidCalculator,
  'user-quota-calculator': UserQuotaCalculator,
  'log-rotation-calculator': LogRotationCalculator,
  'tps-calculator': TpsCalculator,
  'sql-injection-tester': SqlInjectionTester,
  'structured-data-tester': StructuredDataTester,
};

export default function ToolRenderer({ slug }: { slug: string }) {
  const tool = allTools.find((t) => t.slug === slug);
  const ToolComponent = toolComponentMap[slug];

  if (!tool) {
    notFound();
  }

  const placeholderImage = PlaceHolderImages.find(img => img.id === 'tech-background') || PlaceHolderImages[0];

  return (
    <div className="max-w-4xl mx-auto">
        <PageHeader
            title={tool.name}
            description={tool.description}
            aria-label={`Tool: ${tool.name}`}
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
                            alt="A futuristic image of network connections, symbolizing a tool under construction."
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
