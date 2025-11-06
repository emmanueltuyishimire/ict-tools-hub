
'use client';

import React, { Suspense } from 'react';
import { allTools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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

const toolComponentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
  'ip-lookup': React.lazy(() => import('@/app/tools/ip-lookup/ip-lookup-tool').then(mod => ({ default: mod.IpLookupTool }))),
  'ip-to-binary': React.lazy(() => import('@/app/tools/ip-to-binary/ip-to-binary-converter').then(mod => ({ default: mod.IpToBinaryConverter }))),
  'binary-to-ip': React.lazy(() => import('@/app/tools/binary-to-ip/binary-to-ip-converter').then(mod => ({ default: mod.BinaryToIpConverter }))),
  'subnet-calculator': React.lazy(() => import('@/app/tools/subnet-calculator/subnet-calculator').then(mod => ({ default: mod.SubnetCalculator }))),
  'subnet-mask-converter': React.lazy(() => import('@/app/tools/subnet-mask-converter/subnet-mask-converter').then(mod => ({ default: mod.SubnetMaskConverter }))),
  'vlsm-calculator': React.lazy(() => import('@/app/tools/vlsm-calculator/vlsm-calculator').then(mod => ({ default: mod.VlsmCalculator }))),
  'bandwidth-estimator': React.lazy(() => import('@/app/tools/bandwidth-estimator/bandwidth-estimator').then(mod => ({ default: mod.BandwidthEstimator }))),
  'latency-estimator': React.lazy(() => import('@/app/tools/latency-estimator/latency-estimator').then(mod => ({ default: mod.LatencyEstimator }))),
  'password-strength-checker': React.lazy(() => import('@/app/tools/password-strength-checker/password-strength-checker').then(mod => ({ default: mod.PasswordStrengthChecker }))),
  'data-transfer-calculator': React.lazy(() => import('@/app/tools/data-transfer-calculator/data-transfer-calculator').then(mod => ({ default: mod.DataTransferTimeCalculator }))),
  'mac-validator': React.lazy(() => import('@/app/tools/mac-validator/mac-validator').then(mod => ({ default: mod.MacValidator }))),
  'port-lookup': React.lazy(() => import('@/app/tools/port-lookup/port-lookup-tool').then(mod => ({ default: mod.PortLookupTool }))),
  'network-mask-validator': React.lazy(() => import('@/app/tools/network-mask-validator/network-mask-validator').then(mod => ({ default: mod.NetworkMaskValidator }))),
  'ip-privacy-checker': React.lazy(() => import('@/app/tools/ip-privacy-checker/ip-privacy-checker').then(mod => ({ default: mod.IpPrivacyChecker }))),
  'ip-class-finder': React.lazy(() => import('@/app/tools/ip-class-finder/ip-class-finder').then(mod => ({ default: mod.IpClassFinder }))),
  'ip-range-generator': React.lazy(() => import('@/app/tools/ip-range-generator/ip-range-generator').then(mod => ({ default: mod.IpRangeGenerator }))),
  'broadcast-address-calculator': React.lazy(() => import('@/app/tools/broadcast-address-calculator/broadcast-address-calculator').then(mod => ({ default: mod.BroadcastAddressCalculator }))),
  'host-count-calculator': React.lazy(() => import('@/app/tools/host-count-calculator/host-count-calculator').then(mod => ({ default: mod.HostCountCalculator }))),
  'network-address-calculator': React.lazy(() => import('@/app/tools/network-address-calculator/network-address-calculator').then(mod => ({ default: mod.NetworkAddressCalculator }))),
  'cidr-to-subnet-list': React.lazy(() => import('@/app/tools/cidr-to-subnet-list/cidr-to-subnet-list-generator').then(mod => ({ default: mod.CidrToSubnetListGenerator }))),
  'cidr-to-wildcard': React.lazy(() => import('@/app/tools/cidr-to-wildcard/cidr-to-wildcard-converter').then(mod => ({ default: mod.CidrToWildcardConverter }))),
  'ip-summarization': React.lazy(() => import('@/app/tools/ip-summarization/ip-summarization-tool').then(mod => ({ default: mod.IpSummarizationTool }))),
  'http-header-checker': React.lazy(() => import('@/app/tools/http-header-checker/http-header-checker').then(mod => ({ default: mod.HttpHeaderChecker }))),
  'http-request-size-calculator': React.lazy(() => import('@/app/tools/http-request-size-calculator/http-request-size-calculator').then(mod => ({ default: mod.HttpRequestSizeCalculator }))),
  'url-encoder-decoder': React.lazy(() => import('@/app/tools/url-encoder-decoder/url-encoder-decoder').then(mod => ({ default: mod.UrlEncoderDecoder }))),
  'code-minifier': React.lazy(() => import('@/app/tools/code-minifier/code-minifier').then(mod => ({ default: mod.CodeMinifier }))),
  'robots-txt-tool': React.lazy(() => import('@/app/tools/robots-txt-tool/robots-txt-tool').then(mod => ({ default: mod.RobotsTxtTool }))),
  'sitemap-generator': React.lazy(() => import('@/app/tools/sitemap-generator/sitemap-generator').then(mod => ({ default: mod.SitemapGenerator }))),
  'response-time-calculator': React.lazy(() => import('@/app/tools/response-time-calculator/response-time-calculator').then(mod => ({ default: mod.ResponseTimeCalculator }))),
  'ssl-checker': React.lazy(() => import('@/app/tools/ssl-checker/ssl-checker').then(mod => ({ default: mod.SslChecker }))),
  'uptime-calculator': React.lazy(() => import('@/app/tools/uptime-calculator/uptime-calculator').then(mod => ({ default: mod.UptimeCalculator }))),
  'dns-lookup': React.lazy(() => import('@/app/tools/dns-lookup/dns-lookup-tool').then(mod => ({ default: mod.DnsLookupTool }))),
  'reverse-dns-lookup': React.lazy(() => import('@/app/tools/reverse-dns-lookup/reverse-dns-lookup-tool').then(mod => ({ default: mod.ReverseDnsLookupTool }))),
  'whois-lookup': React.lazy(() => import('@/app/tools/whois-lookup/whois-lookup-tool').then(mod => ({ default: mod.WhoisLookupTool }))),
  'load-time-estimator': React.lazy(() => import('@/app/tools/load-time-estimator/load-time-estimator').then(mod => ({ default: mod.WebpageLoadTimeEstimator }))),
  'cache-expiry-calculator': React.lazy(() => import('@/app/tools/cache-expiry-calculator/cache-expiry-calculator').then(mod => ({ default: mod.CacheExpirationCalculator }))),
  'compression-estimator': React.lazy(() => import('@/app/tools/compression-estimator/compression-estimator').then(mod => ({ default: mod.CompressionEstimator }))),
  'cdn-bandwidth-estimator': React.lazy(() => import('@/app/tools/cdn-bandwidth-estimator/cdn-bandwidth-estimator').then(mod => ({ default: mod.CdnBandwidthEstimator }))),
  'code-formatter': React.lazy(() => import('@/app/tools/code-formatter/code-formatter').then(mod => ({ default: mod.CodeFormatter }))),
  'regex-tester': React.lazy(() => import('@/app/tools/regex-tester/regex-tester').then(mod => ({ default: mod.RegexTester }))),
  'base64-encoder-decoder': React.lazy(() => import('@/app/tools/base64-encoder-decoder/base64-encoder-decoder').then(mod => ({ default: mod.Base64EncoderDecoder }))),
  'color-converter': React.lazy(() => import('@/app/tools/color-converter/color-converter').then(mod => ({ default: mod.ColorConverter }))),
  'color-palette-generator': React.lazy(() => import('@/app/tools/color-palette-generator/color-palette-generator').then(mod => ({ default: mod.ColorPaletteGenerator }))),
  'number-converter': React.lazy(() => import('@/app/tools/number-converter/number-converter').then(mod => ({ default: mod.NumberConverter }))),
  'hash-generator-md5-sha': React.lazy(() => import('@/app/tools/hash-generator-md5-sha/hash-generator').then(mod => ({ default: mod.HashGenerator }))),
  'rot13-encoder-decoder': React.lazy(() => import('@/app/tools/rot13-encoder-decoder/rot13-encoder-decoder').then(mod => ({ default: mod.Rot13EncoderDecoder }))),
  'caesar-cipher': React.lazy(() => import('@/app/tools/caesar-cipher/caesar-cipher').then(mod => ({ default: mod.CaesarCipher }))),
  'big-o-calculator': React.lazy(() => import('@/app/tools/big-o-calculator/big-o-calculator').then(mod => ({ default: mod.BigOCalculator }))),
  'prime-checker': React.lazy(() => import('@/app/tools/prime-checker/prime-checker').then(mod => ({ default: mod.PrimeChecker }))),
  'prime-number-generator': React.lazy(() => import('@/app/tools/prime-number-generator/prime-number-generator').then(mod => ({ default: mod.PrimeNumberGeneratorTool }))),
  'fibonacci-generator': React.lazy(() => import('@/app/tools/fibonacci-generator/fibonacci-generator').then(mod => ({ default: mod.FibonacciGeneratorTool }))),
  'factorial-calculator': React.lazy(() => import('@/app/tools/factorial-calculator/factorial-calculator').then(mod => ({ default: mod.FactorialCalculator }))),
  'random-string-generator': React.lazy(() => import('@/app/tools/random-string-generator/random-string-generator').then(mod => ({ default: mod.RandomStringGenerator }))),
  'random-number-generator': React.lazy(() => import('@/app/tools/random-number-generator/random-number-generator').then(mod => ({ default: mod.RandomNumberGenerator }))),
  'code-snippet-formatter': React.lazy(() => import('@/app/tools/code-snippet-formatter/code-snippet-formatter').then(mod => ({ default: mod.CodeSnippetFormatter }))),
  'variable-name-validator': React.lazy(() => import('@/app/tools/variable-name-validator/variable-name-validator').then(mod => ({ default: mod.VariableNameValidator }))),
  'unicode-ascii-converter': React.lazy(() => import('@/app/tools/unicode-ascii-converter/unicode-ascii-converter').then(mod => ({ default: mod.UnicodeAsciiConverter }))),
  'password-generator': React.lazy(() => import('@/app/tools/password-generator/password-generator').then(mod => ({ default: mod.PasswordGenerator }))),
  'password-entropy-calculator': React.lazy(() => import('@/app/tools/password-entropy-calculator/password-entropy-calculator').then(mod => ({ default: mod.PasswordEntropyCalculator }))),
  'encryption-decryption-tool': React.lazy(() => import('@/app/tools/encryption-decryption-tool/encryption-decryption-tool').then(mod => ({ default: mod.EncryptionDecryptionTool }))),
  'totp-demo': React.lazy(() => import('@/app/tools/totp-demo/totp-demo').then(mod => ({ default: mod.TotpDemo }))),
  'base32-58-encoder-decoder': React.lazy(() => import('@/app/tools/base32-58-encoder-decoder/base32-58-encoder-decoder').then(mod => ({ default: mod.Base32_58EncoderDecoder }))),
  'file-integrity-checker': React.lazy(() => import('@/app/tools/file-integrity-checker/file-integrity-checker').then(mod => ({ default: mod.FileIntegrityChecker }))),
  'algorithm-simulator': React.lazy(() => import('@/app/tools/algorithm-simulator/algorithm-simulator').then(mod => ({ default: mod.AlgorithmStepSimulator }))),
  'cloud-storage-cost-estimator': React.lazy(() => import('@/app/tools/cloud-storage-cost-estimator/cloud-storage-cost-estimator').then(mod => ({ default: mod.CloudStorageCostEstimator }))),
  'bandwidth-cost-calculator': React.lazy(() => import('@/app/tools/bandwidth-cost-calculator/bandwidth-cost-calculator').then(mod => ({ default: mod.BandwidthCostCalculator }))),
  'backup-storage-calculator': React.lazy(() => import('@/app/tools/backup-storage-calculator/backup-storage-calculator').then(mod => ({ default: mod.BackupStorageCalculator }))),
  'data-compression-calculator': React.lazy(() => import('@/app/tools/compression-estimator/compression-estimator').then(mod => ({ default: mod.CompressionEstimator }))),
  'vm-requirement-estimator': React.lazy(() => import('@/app/tools/vm-requirement-estimator/vm-requirement-estimator').then(mod => ({ default: mod.VmRequirementEstimator }))),
  'disk-usage-estimator': React.lazy(() => import('@/app/tools/disk-usage-estimator/disk-usage-estimator').then(mod => ({ default: mod.DiskUsageEstimator }))),
  'cloud-instance-cost-calculator': React.lazy(() => import('@/app/tools/cloud-instance-cost-calculator/cloud-instance-cost-calculator').then(mod => ({ default: mod.CloudInstanceCostCalculator }))),
  'storage-memory-cost-analyzer': React.lazy(() => import('@/app/tools/storage-memory-cost-analyzer/storage-memory-cost-analyzer').then(mod => ({ default: mod.StorageMemoryCostAnalyzer }))),
  'data-retention-calculator': React.lazy(() => import('@/app/tools/data-retention-calculator/data-retention-calculator').then(mod => ({ default: mod.DataRetentionCalculator }))),
  'backup-scheduler': React.lazy(() => import('@/app/tools/backup-scheduler/backup-scheduler').then(mod => ({ default: mod.BackupScheduler }))),
  'storage-growth-estimator': React.lazy(() => import('@/app/tools/storage-growth-estimator/storage-growth-estimator').then(mod => ({ default: mod.StorageGrowthEstimator }))),
  'db-storage-estimator': React.lazy(() => import('@/app/tools/db-storage-estimator/db-storage-estimator').then(mod => ({ default: mod.DbStorageEstimator }))),
  'database-growth-calculator': React.lazy(() => import('@/app/tools/db-growth-calculator/db-growth-calculator').then(mod => ({ default: mod.DatabaseGrowthCalculator }))),
  'key-validator': React.lazy(() => import('@/app/tools/key-validator/key-validator').then(mod => ({ default: mod.PrimaryForeignKeyValidator }))),
  'normalization-checker': React.lazy(() => import('@/app/tools/normalization-checker/normalization-checker').then(mod => ({ default: mod.NormalizationChecker }))),
  'duplicate-row-finder': React.lazy(() => import('@/app/tools/duplicate-row-finder/duplicate-row-finder').then(mod => ({ default: mod.DuplicateRowFinder }))),
  'table-size-estimator': React.lazy(() => import('@/app/tools/db-storage-estimator/db-storage-estimator').then(mod => ({ default: mod.DbStorageEstimator }))),
  'column-type-converter': React.lazy(() => import('@/app/tools/column-type-converter/column-type-converter').then(mod => ({ default: mod.ColumnTypeConverter }))),
  'db-health-checker': React.lazy(() => import('@/app/tools/db-health-checker/db-health-checker').then(mod => ({ default: mod.DatabaseHealthChecker }))),
  'recursion-simulator': React.lazy(() => import('@/app/tools/recursion-simulator/recursion-simulator').then(mod => ({ default: mod.RecursionSimulator }))),
  'big-o-quiz': React.lazy(() => import('@/app/tools/big-o-quiz/big-o-quiz')),
  'cloud-sync-time-calculator': React.lazy(() => import('@/app/tools/cloud-sync-time-calculator/cloud-sync-time-calculator')),
  'data-migration-estimator': React.lazy(() => import('@/app/tools/data-migration-estimator/data-migration-estimator')),
  'vm-scaling-calculator': React.lazy(() => import('@/app/tools/vm-scaling-calculator/vm-scaling-calculator')),
  'raid-calculator': React.lazy(() => import('@/app/tools/raid-calculator/raid-calculator').then(mod => ({ default: mod.RaidCalculator }))),
  'user-quota-calculator': React.lazy(() => import('@/app/tools/user-quota-calculator/user-quota-calculator').then(mod => ({ default: mod.UserQuotaCalculator }))),
  'log-rotation-calculator': React.lazy(() => import('@/app/tools/log-rotation-calculator/log-rotation-calculator').then(mod => ({ default: mod.LogRotationCalculator }))),
  'tps-calculator': React.lazy(() => import('@/app/tools/tps-calculator/tps-calculator').then(mod => ({ default: mod.TpsCalculator }))),
  'sql-injection-tester': React.lazy(() => import('@/app/tools/sql-injection-tester/sql-injection-tester').then(mod => ({ default: mod.SqlInjectionTester }))),
  'structured-data-tester': React.lazy(() => import('@/app/tools/structured-data-tester/structured-data-tester').then(mod => ({ default: mod.StructuredDataTester }))),
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
        <Suspense fallback={<LoadingComponent />}>
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
        </Suspense>
    </div>
  );
}
