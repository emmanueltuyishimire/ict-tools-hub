
import {
  type LucideIcon,
  Network,
  Server,
  Code2,
  Shield,
  Cloud,
  Database,
  BrainCircuit,
} from 'lucide-react';

export type Tool = {
  name: string;
  slug: string;
  description: string;
};

export type ToolCategory = {
  name: string;
  icon: LucideIcon;
  tools: Tool[];
};

export const toolCategories: ToolCategory[] = [
  {
    name: 'Networking & IP Tools',
    icon: Network,
    tools: [
      { name: 'IP Address Lookup', slug: 'ip-lookup', description: 'Find geolocation and ISP details for any IP address.' },
      { name: 'IP Address to Binary Converter', slug: 'ip-to-binary', description: 'Convert IPv4 addresses to binary format.' },
      { name: 'Binary to IP Address Converter', slug: 'binary-to-ip', description: 'Convert binary strings to IPv4 addresses.' },
      { name: 'Subnet Calculator', slug: 'subnet-calculator', description: 'Calculate network ranges, broadcast addresses, and available hosts for any subnet.' },
      { name: 'Subnet Mask Converter', slug: 'subnet-mask-converter', description: 'Convert between CIDR, wildcard, and subnet masks.' },
      { name: 'VLSM Calculator', slug: 'vlsm-calculator', description: 'Design efficient network schemes with Variable Length Subnet Masking.' },
      { name: 'Network Bandwidth Estimator', slug: 'bandwidth-estimator', description: 'Estimate network bandwidth requirements based on usage.' },
      { name: 'Ping / Latency Estimator', slug: 'latency-estimator', description: 'Estimate ping and latency over distances.' },
      { name: 'Data Transfer Time Calculator', slug: 'data-transfer-calculator', description: 'Calculate time to transfer data.' },
      { name: 'MAC Address Validator', slug: 'mac-validator', description: 'Validate MAC address format and find the vendor.' },
      { name: 'Port Number Lookup', slug: 'port-lookup', description: 'Look up common network port numbers.' },
      { name: 'Network Mask Validator', slug: 'network-mask-validator', description: 'Validate a network mask.' },
      { name: 'Public vs Private IP Checker', slug: 'ip-privacy-checker', description: 'Check if an IP is public or private.' },
      { name: 'IP Class Finder', slug: 'ip-class-finder', description: 'Find the class of an IP address.' },
      { name: 'IP Range Generator', slug: 'ip-range-generator', description: 'Generate a list of IP addresses in a range.' },
      { name: 'Broadcast Address Calculator', slug: 'broadcast-address-calculator', description: 'Calculate the broadcast address of a network.' },
      { name: 'Host Count Calculator', slug: 'host-count-calculator', description: 'Calculate the number of hosts in a subnet.' },
      { name: 'Network Address Calculator', slug: 'network-address-calculator', description: 'Calculate the network address (Network ID) of a subnet.' },
      { name: 'CIDR to Subnet List Generator', slug: 'cidr-to-subnet-list', description: 'Generate subnets from a CIDR.' },
      { name: 'CIDR to Wildcard Mask Converter', slug: 'cidr-to-wildcard', description: 'Convert CIDR to wildcard mask.' },
      { name: 'IP Summarization Tool', slug: 'ip-summarization', description: 'Summarize a list of IP networks into a single route.' },
    ],
  },
  {
    name: 'Web & Server Tools',
    icon: Server,
    tools: [
      { name: 'HTTP Header Checker', slug: 'http-header-checker', description: 'Check the HTTP status code of a URL.' },
      { name: 'HTTP Request Size Calculator', slug: 'http-request-size-calculator', description: 'Estimate the size of an HTTP request.' },
      { name: 'URL Encoder / Decoder', slug: 'url-encoder-decoder', description: 'Encode or decode URLs.' },
      { name: 'HTML / CSS / JS Minifier', slug: 'code-minifier', description: 'Minify HTML, CSS, or JavaScript code.' },
      { name: 'Robots.txt Validator / Generator', slug: 'robots-txt-tool', description: 'Validate or generate a robots.txt file.' },
      { name: 'Sitemap Generator (static)', slug: 'sitemap-generator', description: 'Generate a static XML sitemap.' },
      { name: 'Response Time Calculator', slug: 'response-time-calculator', description: 'Calculate server response time.' },
      { name: 'SSL Checker', slug: 'ssl-checker', description: 'Check SSL certificate details.' },
      { name: 'Server Uptime Calculator', slug: 'uptime-calculator', description: 'Calculate server uptime percentage.' },
      { name: 'DNS Lookup Tool', slug: 'dns-lookup', description: 'Perform a DNS lookup.' },
      { name: 'Reverse DNS Lookup', slug: 'reverse-dns-lookup', description: 'Perform a reverse DNS lookup.' },
      { name: 'Whois Lookup', slug: 'whois-lookup', description: 'Perform a Whois lookup on a domain.' },
      { name: 'Webpage Load Time Estimator', slug: 'load-time-estimator', description: 'Estimate webpage load time.' },
      { name: 'Cache Expiration Calculator', slug: 'cache-expiry-calculator', description: 'Calculate cache expiration dates.' },
      { name: 'Compression Savings Estimator', slug: 'compression-estimator', description: 'Estimate savings from compression.' },
      { name: 'CDN Bandwidth Estimator', slug: 'cdn-bandwidth-estimator', description: 'Estimate CDN bandwidth usage.' },
      { name: 'Structured Data Tester', slug: 'structured-data-tester', description: 'Validate JSON-LD structured data.' },
    ],
  },
  {
    name: 'Programming & Code',
    icon: Code2,
    tools: [
      { name: 'Code Formatter / Beautifier', slug: 'code-formatter', description: 'Format and beautify your code.' },
      { name: 'Regex Tester / Generator', slug: 'regex-tester', description: 'Test and generate regular expressions.' },
      { name: 'Base64 Encoder / Decoder', slug: 'base64-encoder-decoder', description: 'Encode or decode Base64 strings.' },
      { name: 'Hex ↔ RGB Color Converter', slug: 'color-converter', description: 'Convert between Hex and RGB colors.' },
      { name: 'Color Palette Generator', slug: 'color-palette-generator', description: 'Generate harmonious color palettes.' },
      { name: 'Binary ↔ Decimal ↔ Hex Converter', slug: 'number-converter', description: 'Convert between number bases.' },
      { name: 'MD5 / SHA Hash Generator', slug: 'hash-generator-md5-sha', description: 'Generate MD5 and SHA hashes.' },
      { name: 'ROT13 Encoder / Decoder', slug: 'rot13-encoder-decoder', description: 'Encode or decode using ROT13 cipher.' },
      { name: 'Caesar Cipher Encoder / Decoder', slug: 'caesar-cipher', description: 'Encode or decode using Caesar cipher.' },
      { name: 'Time Complexity Estimator', slug: 'big-o-calculator', description: 'Understand and visualize Big O notation.' },
      { name: 'Prime Number Checker', slug: 'prime-checker', description: 'Check if a number is prime.' },
      { name: 'Prime Number Generator', slug: 'prime-number-generator', description: 'Generate a list of prime numbers.' },
      { name: 'Fibonacci Sequence Generator', slug: 'fibonacci-generator', description: 'Generate the Fibonacci sequence.' },
      { name: 'Factorial Calculator', slug: 'factorial-calculator', description: 'Calculate the factorial of a number.' },
      { name: 'Random String Generator', slug: 'random-string-generator', description: 'Generate a random string of specified length and complexity.' },
      { name: 'Random Number Generator', slug: 'random-number-generator', description: 'Generate a random number within a specified range.' },
      { name: 'Code Snippet Formatter', slug: 'code-snippet-formatter', description: 'Format a code snippet.' },
      { name: 'Variable Name Validator', slug: 'variable-name-validator', description: 'Validate variable names.' },
      { name: 'Unicode / ASCII Converter', slug: 'unicode-ascii-converter', description: 'Convert between Unicode and ASCII.' },
    ],
  },
  {
    name: 'Security & Password',
    icon: Shield,
    tools: [
      { name: 'Password Generator', slug: 'password-generator', description: 'Generate secure passwords.' },
      { name: 'Password Strength Checker', slug: 'password-strength-checker', description: 'Check the strength of a password.' },
      { name: 'Password Entropy Calculator', slug: 'password-entropy-calculator', description: 'Calculate the entropy of a password in bits.' },
      { name: 'Encryption / Decryption Tool', slug: 'encryption-decryption-tool', description: 'Encrypt or decrypt text using AES.' },
      { name: 'Two-Factor Auth TOTP Demo', slug: 'totp-demo', description: 'Educational TOTP demo.' },
      { name: 'Base32 / Base58 Encoder / Decoder', slug: 'base32-58-encoder-decoder', description: 'Encode/decode Base32/58.' },
      { name: 'File Integrity Checker', slug: 'file-integrity-checker', description: 'Generate checksums (SHA) for files.' },
      { name: 'SQL Injection Tester', slug: 'sql-injection-tester', description: 'Educational SQL injection demo.' },
    ],
  },
  {
    name: 'Cloud & Storage Tools',
    icon: Cloud,
    tools: [
      { name: 'Cloud Storage Cost Estimator', slug: 'cloud-storage-cost-estimator', description: 'Estimate cloud storage costs.' },
      { name: 'Cloud Bandwidth Cost Calculator (Egress)', slug: 'bandwidth-cost-calculator', description: 'Calculate bandwidth costs.' },
      { name: 'Backup Storage Requirement', slug: 'backup-storage-calculator', description: 'Calculate backup storage needs.' },
      { name: 'Data Compression Calculator', slug: 'data-compression-calculator', description: 'Calculate data compression.' },
      { name: 'VM RAM & CPU Requirement', slug: 'vm-requirement-estimator', description: 'Estimate VM resource needs.' },
      { name: 'Disk Usage / Partition Estimator', slug: 'disk-usage-estimator', description: 'Estimate disk usage.' },
      { name: 'Cloud Instance Cost Calculator', slug: 'cloud-instance-cost-calculator', description: 'Calculate cloud instance costs.' },
      { name: 'Storage vs. Memory Cost Analyzer', slug: 'storage-memory-cost-analyzer', description: 'Analyze storage vs. memory costs.' },
      { name: 'File Conversion Estimator', slug: 'file-conversion-estimator', description: 'Estimate file conversion sizes.' },
      { name: 'Data Retention Period Calculator', slug: 'data-retention-calculator', description: 'Calculate data retention periods.' },
      { name: 'Snapshot / Backup Scheduler', slug: 'backup-scheduler', description: 'Schedule snapshots and backups.' },
      { name: 'Storage Growth Estimator', slug: 'storage-growth-estimator', description: 'Estimate storage growth.' },
      { name: 'RAID Storage Calculator', slug: 'raid-calculator', description: 'Calculate RAID storage.' },
      { name: 'VM Scaling Planning Guide', slug: 'vm-scaling-calculator', description: 'Understand horizontal vs vertical scaling.' },
      { name: 'Cloud Sync Time Calculator', slug: 'cloud-sync-time-calculator', description: 'Estimate cloud data transfer times.' },
      { name: 'Data Migration Estimator', slug: 'data-migration-estimator', description: 'Plan your data migration projects.' },
    ],
  },
  {
    name: 'Database & Admin Tools',
    icon: Database,
    tools: [
      { name: 'Database Row / Storage Estimator', slug: 'db-storage-estimator', description: 'Estimate database storage.' },
      { name: 'User Quota Calculator', slug: 'user-quota-calculator', description: 'Calculate user quotas.' },
      { name: 'Transaction / TPS Calculator', slug: 'tps-calculator', description: 'Calculate transactions per second.' },
      { name: 'Log Rotation Calculator', slug: 'log-rotation-calculator', description: 'Calculate log rotation schedules.' },
      { name: 'Database Index Size Calculator', slug: 'index-size-calculator', description: 'Calculate database index size.' },
      { name: 'Query Execution Time Estimator', slug: 'query-time-estimator', description: 'Estimate query execution time.' },
      { name: 'Database Growth Calculator', slug: 'db-growth-calculator', description: 'Calculate database growth.' },
      { name: 'Primary / Foreign Key Validator', slug: 'key-validator', description: 'Validate primary/foreign keys.' },
      { name: 'Normalization Checker', slug: 'normalization-checker', description: 'Check database normalization.' },
      { name: 'Duplicate Row Finder', slug: 'duplicate-row-finder', description: 'Find duplicate rows in data.' },
      { name: 'Column Type Converter', slug: 'column-type-converter', description: 'Suggest column type conversions.' },
      { name: 'Database Health Checker', slug: 'db-health-checker', description: 'Basic database health checks.' },
    ],
  },
  {
    name: 'AI & Learning Tools',
    icon: BrainCircuit,
    tools: [
      { name: 'Time Complexity Estimator', slug: 'big-o-calculator', description: 'Understand and visualize Big O notation.' },
      { name: 'Algorithm Step Simulator', slug: 'algorithm-simulator', description: 'Simulate steps of simple algorithms.' },
      { name: 'Recursion Calculator / Simulator', slug: 'recursion-simulator', description: 'Simulate recursive functions.' },
      { name: 'Big-O Complexity Quiz', slug: 'big-o-quiz', description: 'Test your knowledge of time complexity.' },
    ],
  },
];

export const allTools: Tool[] = toolCategories.flatMap(category => category.tools);

export const mainNavLinks = []
