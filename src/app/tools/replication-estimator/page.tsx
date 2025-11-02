
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle, Database, Copy, Server, Users } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Replication & Sharding Planning Guide | ICT Toolbench',
    description: 'A guide to database scaling with replication and sharding. Understand the pros and cons of each strategy to design a scalable and resilient database architecture.',
    openGraph: {
        title: 'Replication & Sharding Planning Guide | ICT Toolbench',
        description: 'Learn when to use read replicas for read scalability vs. when to use sharding for write scalability. An essential guide for database architects and developers.',
        url: '/tools/replication-estimator',
    }
};

const ReplicationShardingGuidePage = () => {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer.replace(/<[^>]*>?/gm, ''),
            },
        })),
    };

    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Replication / Sharding Planning Guide",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational guide for planning database scaling strategies, comparing replication (read replicas) and sharding (horizontal partitioning).",
      "url": "https://www.icttoolbench.com/tools/replication-estimator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Replication & Sharding Planning Guide"
                    description="When a single database can no longer handle the load, you need a scaling strategy. This guide explores the two primary approaches—Replication and Sharding—to help you design a database architecture that is performant, scalable, and resilient."
                />
                
                <Card>
                    <CardHeader>
                        <CardTitle>Why This Isn't a Simple Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Scaling is an Architectural Decision</AlertTitle>
                            <AlertDescription>
                                Choosing between replication and sharding is a complex architectural decision that depends on your application's specific read/write patterns, data model, and consistency requirements. A simple calculator would be misleading. This guide provides the foundational knowledge to help you make the right strategic choice for your system.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>

                <section>
                   <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
                   <Card>
                      <CardContent className="p-6">
                          <dl className="space-y-4">
                              {keyTerminologies.map((item) => (
                                  <div key={item.term}>
                                      <dt><strong>{item.term}</strong></dt>
                                      <dd className="text-muted-foreground text-sm">{item.definition}</dd>
                                  </div>
                              ))}
                          </dl>
                      </CardContent>
                   </Card>
                </section>

                <Card className='bg-secondary/30 border-primary/20'>
                    <CardHeader>
                        <div className='flex items-center gap-2 text-primary'>
                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                            <CardTitle className="text-primary">Educational Deep Dive: Scaling Your Database</CardTitle>
                        </div>
                        <CardDescription>From read replicas to horizontal partitioning, understand the two primary strategies for taking your database beyond a single server.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Problem: A Single Server Has Limits</h3>
                            <p>
                                Every application starts with a single database server. For a while, this works perfectly. As traffic grows, you can <strong>scale vertically</strong> by moving to a more powerful server with more CPU and RAM. You can use our <Link href="/tools/vm-requirement-estimator" className="text-primary hover:underline">VM Requirement Estimator</Link> to plan for this. But eventually, you will hit a wall. Either you'll reach the largest server available, or the cost of that single massive server will become prohibitive. More importantly, a single server is a single point of failure. If it goes down, your entire application goes down. To move beyond this, you need a distributed database strategy, which primarily involves replication or sharding.
                            </p>
                        </section>
                        <section>
                            <h3>Strategy 1: Replication ("Read Replicas")</h3>
                            <p>
                                Replication is the process of creating and maintaining multiple copies of your data on different database servers. The most common topology is <strong>primary-replica replication</strong> (formerly known as master-slave).
                            </p>
                            <ul className="list-disc pl-5">
                               <li><strong>How it works:</strong> You have one primary database server that handles all the `WRITE` operations (`INSERT`, `UPDATE`, `DELETE`). The data from the primary is then asynchronously replicated to one or more secondary, read-only servers called "read replicas." Your application is then configured to send all write traffic to the primary server and distribute all `READ` traffic (`SELECT` queries) across the read replicas.</li>
                            </ul>
                            <div className="grid md:grid-cols-2 gap-4 my-4">
                                <div className="bg-muted p-4 rounded-lg">
                                    <strong>Pros:</strong>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li><strong>Read Scalability:</strong> You can dramatically increase your application's read capacity by simply adding more read replicas.</li>
                                        <li><strong>High Availability:</strong> If the primary server fails, a read replica can be promoted to become the new primary, minimizing downtime.</li>
                                        <li><strong>Easy to Implement:</strong> Most modern databases (like PostgreSQL, MySQL) have built-in support for setting up read replicas. It does not require major changes to your application's data model.</li>
                                    </ul>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <strong>Cons:</strong>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li><strong>Single Write Bottleneck:</strong> All write operations must still go through the single primary server. Replication does NOT solve the problem of write-heavy workloads.</li>
                                        <li><strong>Replication Lag:</strong> Since replication is usually asynchronous, there can be a small delay before data written to the primary appears on the replicas. This can cause issues for applications that need to read their own writes immediately.</li>
                                        <li><strong>Cost:</strong> You are storing full copies of your data on multiple servers, which increases storage costs.</li>
                                    </ul>
                                </div>
                            </div>
                            <p><strong>When to use Replication:</strong> It's the perfect solution for read-heavy applications, like a blog, a content management system, or an e-commerce site where there are many more product views (reads) than purchases (writes).</p>
                        </section>
                         <section>
                            <h3>Strategy 2: Sharding (Horizontal Partitioning)</h3>
                            <p>
                                Sharding is a much more complex strategy that solves the problem of write scalability. It involves partitioning a large database into multiple smaller, faster, more manageable pieces called "shards." Each shard is a separate database, often on its own server, and contains a unique subset of the total data.
                            </p>
                             <ul className="list-disc pl-5">
                               <li><strong>How it works:</strong> You choose a "shard key," which is a column in your data that will be used to determine which shard a particular row belongs to. For example, in a `users` table, you might shard by `user_id`. An application-level routing layer then directs queries to the correct shard. A query for `user_id = 123` might go to Shard 1, while a query for `user_id = 456` goes to Shard 2.</li>
                            </ul>
                             <div className="grid md:grid-cols-2 gap-4 my-4">
                                <div className="bg-muted p-4 rounded-lg">
                                    <strong>Pros:</strong>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li><strong>Write Scalability:</strong> This is the key benefit. Since writes are distributed across multiple servers, your application's write throughput can scale horizontally by adding more shards.</li>
                                        <li><strong>Massive Scale:</strong> Sharding is the only way to scale a single logical database to handle petabytes of data and millions of writes per second. It's the strategy used by giants like Facebook and TikTok.</li>
                                    </ul>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <strong>Cons:</strong>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li><strong>Extreme Complexity:</strong> Sharding is incredibly complex to implement and maintain. It affects your entire application architecture.</li>
                                        <li><strong>Query Difficulty:</strong> Queries that span multiple shards (e.g., `GROUP BY` across all users) become very difficult and slow. You must perform "scatter-gather" queries that hit every shard and then aggregate the results.</li>
                                        <li><strong>Operational Overhead:</strong> You are now managing a fleet of databases, which requires robust automation for schema changes, backups, and monitoring. Re-sharding (adding more shards) can be a very complex and risky operation.</li>
                                    </ul>
                                </div>
                            </div>
                             <p><strong>When to use Sharding:</strong> Only when you absolutely have to. Sharding should be considered only when a single primary database (even a very large one) can no longer handle your write load, or your dataset has grown too large to fit on a single server. It's the solution for hyper-scale applications.</p>
                        </section>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Start with Replication:</strong> For 99% of applications, scaling with read replicas is the correct first step. It's easier to implement and solves the most common performance bottleneck (read load).</li>
                                <li><strong>Cache Aggressively:</strong> Before you even consider sharding, ensure you have an aggressive caching layer (like Redis or Memcached). Caching can absorb a huge amount of read traffic, reducing the load on your primary database.</li>
                                <li><strong>Choose a Good Shard Key:</strong> If you must shard, the choice of shard key is critical. It should be a value that is present in most of your queries and distributes data evenly across shards. A poor shard key can lead to "hot spots" where one shard gets all the traffic.</li>
                                <li><strong>Consider Managed Sharded Databases:</strong> Cloud providers offer managed databases that handle the complexity of sharding for you, such as Amazon Aurora, Google Cloud Spanner, or CockroachDB. These can significantly reduce the operational burden.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Sharding Prematurely:</strong> Sharding is a one-way door; it's very difficult to undo. Do not shard your database until you have exhausted all other optimization options (vertical scaling, read replicas, caching, query optimization).</li>
                                <li><strong>Ignoring Replication Lag:</strong> When using read replicas, be aware that there will be a small delay. Design your application to handle this, for example by directing a user's reads to the primary database for a few seconds immediately after they perform a write.</li>
                                <li><strong>Cross-Shard Transactions:</strong> Sharding makes it very difficult to enforce transactional integrity across different shards. Your application must be designed to handle this complexity, often by using distributed transaction patterns like Sagas.</li>
                                <li><strong>Underestimating Operational Complexity:</strong> Moving from managing one database to managing a sharded fleet of dozens of databases is a massive leap in operational complexity. It requires significant investment in automation and expertise.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
               <section>
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <Card>
                      <CardContent className="p-6">
                          <Accordion type="single" collapsible className="w-full">
                              {faqData.map((item, index) => (
                                  <AccordionItem value={`item-${index}`} key={index}>
                                      <AccordionTrigger>{item.question}</AccordionTrigger>
                                      <AccordionContent>{item.answer}</AccordionContent>
                                  </AccordionItem>
                              ))}
                          </Accordion>
                      </CardContent>
                  </Card>
              </section>

              <section>
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                       <Link href="/tools/vm-requirement-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">VM Requirement Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the vCPU and RAM requirements for your primary and replica database servers.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/iops-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">IOPS Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Ensure your underlying storage has enough I/O performance to handle your database workload.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/cloud-instance-cost-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Cloud Instance Cost Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the monthly costs of the VMs you will need for your primary, replica, or sharded database instances.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default ReplicationShardingGuidePage;

```
  </change>
  <change>
    <file>/src/app/tools/replication-estimator/schema.ts</file>
    <content><![CDATA[
export const faqData = [
    { question: "What is the primary difference between replication and sharding?", answer: "Replication copies the same data to multiple servers to scale read operations and provide high availability. Sharding partitions data across multiple servers to scale write operations. Replication handles read-heavy workloads; sharding handles write-heavy workloads at massive scale." },
    { question: "When should I use read replicas (replication)?", answer: "You should use read replicas when your application is 'read-heavy'—meaning it performs many more read queries (`SELECT`) than write queries (`INSERT`, `UPDATE`). This is typical for blogs, content websites, and most e-commerce stores. It's the first and most common step in database scaling." },
    { question: "When should I consider sharding?", answer: "You should only consider sharding after you have exhausted all other options. If your application's write load is so high that even the largest possible single primary server cannot handle it, or your dataset is too large to fit on a single server, then sharding is the next logical step. It's a strategy for hyper-scale applications." },
    { question: "What is 'replication lag'?", answer: "Replication lag is the delay between when data is written to the primary database and when it becomes visible on a read replica. Since most replication is asynchronous, this delay can be a few milliseconds to several seconds. Applications must be designed to handle this, for example, by directing a user's own reads to the primary for a short time after they make a change." },
    { "question": "What is a 'shard key'?", "answer": "A shard key is a specific column in your database table that is used to determine which shard a particular row of data should be stored on. For example, in a `users` table, the `user_id` might be the shard key. The choice of a good shard key that distributes data evenly is one of the most critical decisions in a sharding strategy." },
    { question: "Can I do a `JOIN` across different shards?", answer: "Not easily. Standard `JOIN` operations work within a single database. A query that needs to join data from two different shards requires a 'distributed join,' which is very complex and slow, often needing to be handled at the application layer. This is a major drawback of sharding." },
    { question: "Which strategy is better for high availability?", answer: "Both can provide high availability, but replication is simpler for this purpose. With a primary-replica setup, if the primary fails, a replica can be automatically 'promoted' to become the new primary with minimal downtime. While each shard in a sharded architecture can itself be replicated for availability, the overall system has more moving parts and is more complex to manage." },
    { question: "Is sharding the same as partitioning in PostgreSQL?", answer: "They are related concepts but not identical. PostgreSQL's native partitioning allows you to split a single large table into multiple smaller tables within the same database instance, which can improve query performance. Sharding takes this a step further by physically distributing those partitions across multiple independent database servers." },
    { question: "Do cloud providers offer managed replication and sharding?", answer: "Yes. Most major cloud providers offer managed database services that make these complex architectures easier. For example, Amazon RDS allows you to create read replicas with a single click. For sharding, services like Amazon Aurora, Google Cloud Spanner, or CockroachDB are designed to handle distributed data and scaling automatically." },
    { question: "What is a 'single point of failure'?", answer: "A single point of failure (SPOF) is any part of a system that, if it fails, will stop the entire system from working. A single, non-replicated database server is a classic SPOF. Both replication and sharding are strategies designed to eliminate this SPOF by distributing data and load across multiple servers." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan a Database Scaling Strategy',
    description: 'A step-by-step framework for choosing between replication and sharding.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Analyze Your Workload', text: 'Determine if your application is read-heavy or write-heavy. Monitor your database performance to find the primary bottleneck.' },
        { '@type': 'HowToStep', name: 'Step 2: Start with Vertical Scaling', text: 'Before distributing your database, ensure you are using an appropriately sized server. Often, simply moving to a server with more RAM can solve performance issues.' },
        { '@type': 'HowToStep', name: 'Step 3: Implement Replication for Read Scalability', text: 'If your reads are the bottleneck, add one or more read replicas to your database and direct all read queries to them.' },
        { '@type': 'HowToStep', name: 'Step 4: Consider Sharding as a Last Resort', text: 'If, after implementing read replicas, your single primary server still cannot handle the write load, begin planning a migration to a sharded architecture. This is a major architectural change.' },
    ],
    totalTime: 'P1M', // Planning can take months
};

export const keyTerminologies = [
    { term: 'Replication', definition: 'The process of creating and maintaining copies of a database on multiple servers to improve read performance and provide high availability.' },
    { term: 'Sharding (Horizontal Partitioning)', definition: 'The process of splitting a large database table into smaller, separate tables (shards), often across multiple servers, to improve write performance and scalability.' },
    { term: 'Vertical Scaling', definition: 'Increasing the resources (CPU, RAM) of a single server to handle more load.' },
    { term: 'Horizontal Scaling', definition: 'Adding more servers to a pool to distribute load.' },
    { term: 'Read Replica', definition: 'A read-only copy of a primary database that is used to serve `SELECT` queries, reducing the load on the primary.' },
    { term: 'Shard Key', definition: 'A column used to determine which shard a particular row of data belongs to.' },
    { term: 'Replication Lag', definition: 'The delay between a write operation on the primary database and its appearance on a read replica.' },
    { term: 'High Availability (HA)', definition: 'A system design that ensures a high level of operational performance, usually by eliminating single points of failure through redundancy.' },
];
```
  </change>
  <change>
    <file>/src/lib/tools.ts</file>
    <content><![CDATA[
import {
  type LucideIcon,
  Network,
  Server,
  Code2,
  Shield,
  Cloud,
  Database,
  BookOpen,
  BrainCircuit,
  Wrench,
  Boxes,
  Sparkles,
  FileCode2,
  Calculator,
  Palette,
  Timer,
  KeyRound,
  FileCheck,
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
      { name: 'SSL Certificate Expiration Checker', slug: 'ssl-expiry-checker', description: 'Check SSL certificate expiration.' },
      { name: 'URL Encoder / Decoder', slug: 'url-encoder-decoder', description: 'Encode or decode URLs.' },
      { name: 'HTML Entity Encoder / Decoder', slug: 'html-entity-encoder-decoder', description: 'Encode or decode HTML entities.' },
      { name: 'HTML / CSS / JS Minifier', slug: 'code-minifier', description: 'Minify HTML, CSS, or JavaScript code.' },
      { name: 'Robots.txt Validator / Generator', slug: 'robots-txt-tool', description: 'Validate or generate a robots.txt file.' },
      { name: 'Sitemap Generator (static)', slug: 'sitemap-generator', description: 'Generate a static XML sitemap.' },
      { name: 'Response Time Calculator', slug: 'response-time-calculator', description: 'Calculate server response time.' },
      { name: 'Domain Expiration Countdown', slug: 'domain-expiry-countdown', description: 'Countdown to domain expiration.' },
      { name: 'SSL Checker', slug: 'ssl-checker', description: 'Check SSL certificate details.' },
      { name: 'Server Uptime Calculator', slug: 'uptime-calculator', description: 'Calculate server uptime percentage.' },
      { name: 'DNS Lookup Tool', slug: 'dns-lookup', description: 'Perform a DNS lookup.' },
      { name: 'Reverse DNS Lookup', slug: 'reverse-dns-lookup', description: 'Perform a reverse DNS lookup.' },
      { name: 'Whois Lookup', slug: 'whois-lookup', description: 'Perform a Whois lookup on a domain.' },
      { name: 'Webpage Load Time Estimator', slug: 'load-time-estimator', description: 'Estimate webpage load time.' },
      { name: 'Cache Expiration Calculator', slug: 'cache-expiry-calculator', description: 'Calculate cache expiration dates.' },
      { name: 'Compression Savings Estimator', slug: 'compression-estimator', description: 'Estimate savings from compression.' },
      { name: 'CDN Bandwidth Estimator', slug: 'cdn-bandwidth-estimator', description: 'Estimate CDN bandwidth usage.' },
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
      { name: 'Hash Generator (MD5/SHA)', slug: 'hash-generator-md5-sha', description: 'Generate various hashes (MD5, SHA1, SHA256).' },
      { name: 'Encryption / Decryption Tool', slug: 'encryption-decryption-tool', description: 'Encrypt or decrypt text using AES.' },
      { name: 'Two-Factor Auth TOTP Demo', slug: 'totp-demo', description: 'Educational TOTP demo.' },
      { name: 'Base32 / Base58 Encoder / Decoder', slug: 'base32-58-encoder-decoder', description: 'Encode/decode Base32/58.' },
      { name: 'File Integrity Checker', slug: 'file-integrity-checker', description: 'Generate checksums (SHA) for files.' },
      { name: 'Random Key Generator', slug: 'random-key-generator', description: 'Generate a random encryption key.' },
      { name: 'Private / Public Key Pair Generator', slug: 'key-pair-generator', description: 'Generate a key pair (educational).' },
      { name: 'Secure Token Generator', slug: 'secure-token-generator', description: 'Generate a secure token.' },
      { name: 'OTP Generator', slug: 'otp-generator', description: 'Generate a one-time password.' },
      { name: 'Password Expiry Reminder', slug: 'password-expiry-reminder', description: 'Calculate password expiry.' },
      { name: 'Salting / Hashing Demo Tool', slug: 'salting-hashing-demo', description: 'Demonstrate salting and hashing.' },
      { name: 'Simple Cipher Cracker', slug: 'simple-cipher-cracker', description: 'Educational cipher cracker.' },
      { name: 'Hex to Binary Password Converter', slug: 'hex-to-binary-password', description: 'Convert hex passwords to binary.' },
      { name: 'Binary to ASCII Password Converter', slug: 'binary-to-ascii-password', description: 'Convert binary passwords to ASCII.' },
      { name: 'Random PIN Generator', slug: 'random-pin-generator', description: 'Generate a random PIN.' },
      { name: 'Credential Strength Analyzer', slug: 'credential-strength-analyzer', description: 'Analyze credential strength.' },
      { name: 'Security Quiz Tool', slug: 'security-quiz', description: 'Test your security knowledge.' },
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
      { name: 'Cloud Migration Planning Guide', slug: 'cloud-migration-estimator', description: 'A guide to planning your cloud migration.' },
      { name: 'Cloud Sync Time Calculator', slug: 'cloud-sync-time-calculator', description: 'Calculate cloud sync time.' },
      { name: 'VM Scaling Planning Guide', slug: 'vm-scaling-calculator', description: 'Plan your vertical and horizontal VM scaling strategy.' },
      { name: 'Storage Redundancy Calculator', slug: 'storage-redundancy-calculator', description: 'Calculate storage redundancy.' },
      { name: 'Virtual Disk Size Estimator', slug: 'vdisk-size-estimator', description: 'Estimate virtual disk sizes.' },
      { name: 'IOPS Calculator', slug: 'iops-calculator', description: 'Calculate I/O operations per second.' },
    ],
  },
  {
    name: 'Database & Admin Tools',
    icon: Database,
    tools: [
      { name: 'SQL Query Tester', slug: 'sql-query-tester', description: 'Test basic SQL queries.' },
      { name: 'Database Row / Storage Estimator', slug: 'db-storage-estimator', description: 'Estimate database storage.' },
      { name: 'Uptime / Availability Calculator', slug: 'uptime-calculator', description: 'Calculate system uptime and availability.' },
      { name: 'Backup Schedule Calculator', slug: 'backup-scheduler', description: 'Calculate backup schedules.' },
      { name: 'Data Retention Period Calculator', slug: 'data-retention-calculator', description: 'Calculate data retention periods.' },
      { name: 'Replication / Sharding Estimator', slug: 'replication-estimator', description: 'Plan database replication and sharding.' },
      { name: 'User Quota Calculator', slug: 'user-quota-calculator', description: 'Calculate user quotas.' },
      { name: 'Transaction / TPS Calculator', slug: 'tps-calculator', description: 'Calculate transactions per second.' },
      { name: 'Log Rotation Calculator', slug: 'log-rotation-calculator', description: 'Calculate log rotation schedules.' },
      { name: 'Data Migration Estimator', slug: 'data-migration-estimator', description: 'Estimate data migration efforts.' },
      { name: 'Database Index Size Calculator', slug: 'index-size-calculator', description: 'Calculate database index size.' },
      { name: 'Query Execution Time Estimator', slug: 'query-time-estimator', description: 'Estimate query execution time.' },
      { name: 'Database Growth Calculator', slug: 'db-growth-calculator', description: 'Calculate database growth.' },
      { name: 'Primary / Foreign Key Validator', slug: 'key-validator', description: 'Validate primary/foreign keys.' },
      { name: 'Normalization Checker', slug: 'normalization-checker', description: 'Check database normalization.' },
      { name: 'Duplicate Row Finder', slug: 'duplicate-row-finder', description: 'Find duplicate rows in data.' },
      { name: 'Table Size Estimator', slug: 'table-size-estimator', description: 'Estimate table size.' },
      { name: 'Column Type Converter', slug: 'column-type-converter', description: 'Suggest column type conversions.' },
      { name: 'SQL Injection Tester', slug: 'sql-injection-tester', description: 'Educational SQL injection tester.' },
      { name: 'Database Health Checker', slug: 'db-health-checker', description: 'Basic database health checks.' },
    ],
  },
  {
    name: 'Programming Learning',
    icon: BrainCircuit,
    tools: [
      { name: 'Big-O Complexity Quiz', slug: 'big-o-quiz', description: 'Quiz on Big-O complexity.' },
      { name: 'Algorithm Visualizer', slug: 'algorithm-visualizer', description: 'Visualize sorting/searching algorithms.' },
      { name: 'Algorithm Step Simulator', slug: 'algorithm-simulator', description: 'Simulate steps of simple algorithms.' },
      { name: 'Recursion Calculator / Simulator', slug: 'recursion-simulator', description: 'Simulate recursive functions.' },
      { name: 'Logic Gate Simulator', slug: 'logic-gate-simulator', description: 'Simulate logic gates.' },
      { name: 'Truth Table Generator', slug: 'truth-table-generator', description: 'Generate truth tables.' },
      { name: 'Boolean Algebra Simplifier', slug: 'boolean-algebra-simplifier', description: 'Simplify boolean algebra expressions.' },
      { name: 'Graph Adjacency Calculator', slug: 'graph-adjacency-calculator', description: 'Calculate graph adjacency.' },
      { name: 'Matrix Operation Calculator', slug: 'matrix-calculator', description: 'Perform matrix operations.' },
      { name: 'Factorial / Combinatorics Calculator', slug: 'combinatorics-calculator', description: 'Calculate factorials and combinations.' },
      { name: 'Fibonacci Sequence Generator (Learning)', slug: 'fibonacci-learner', description: 'Learn about Fibonacci sequence.' },
      { name: 'Binary Tree Simulator', slug: 'binary-tree-simulator', description: 'Simulate a binary tree.' },
      { name: 'Linked List Visualization Tool', slug: 'linked-list-visualizer', description: 'Visualize a linked list.' },
      { name: 'Stack / Queue Simulator', slug: 'stack-queue-simulator', description: 'Simulate stacks and queues.' },
      { name: 'Hash Table Simulator', slug: 'hash-table-simulator', description: 'Simulate a hash table.' },
      { name: 'Search Algorithm Tester', slug: 'search-algorithm-tester', description: 'Test search algorithms.' },
      { name: 'Sorting Algorithm Tester', slug: 'sorting-algorithm-tester', description: 'Test sorting algorithms.' },
      { name: 'Heap Calculator / Simulator', slug: 'heap-simulator', description: 'Simulate a heap.' },
      { name: 'Trie Simulator', slug: 'trie-simulator', description: 'Simulate a trie.' },
      { name: 'Binary Search Tree Visualizer', slug: 'bst-visualizer', description: 'Visualize a binary search tree.' },
    ],
  },
  {
    name: 'ICT Daily Utilities',
    icon: Wrench,
    tools: [
      { name: 'QR Code Generator', slug: 'qr-code-generator', description: 'Generate QR codes for text or URLs.' },
      { name: 'ASCII ↔ Unicode Converter', slug: 'ascii-unicode-converter', description: 'Convert between ASCII and Unicode.' },
      { name: 'Markdown Previewer / Converter', slug: 'markdown-previewer', description: 'Preview and convert Markdown.' },
      { name: 'CSV ↔ JSON Converter', slug: 'csv-json-converter', description: 'Convert between CSV and JSON.' },
      { name: 'Text Case Converter', slug: 'text-case-converter', description: 'Convert text case (UPPER, lower, Title).' },
      { name: 'Word / Character Counter', slug: 'word-counter', description: 'Count words and characters in text.' },
      { name: 'Random Password / Key Generator', slug: 'random-password-key-generator', description: 'Generate random passwords or keys.' },
      { name: 'Random String / Number Generator', slug: 'random-string-number-generator', description: 'Generate random strings or numbers.' },
      { name: 'IP Location Lookup', slug: 'ip-location-lookup', description: 'Look up IP location from a static DB.' },
      { name: 'Color Picker & HEX / RGB Converter', slug: 'color-picker-converter', description: 'Pick colors and convert formats.' },
      { name: 'Dice Roller', slug: 'dice-roller', description: 'Roll virtual dice.' },
      { name: 'Coin Flip Simulator', slug: 'coin-flip', description: 'Simulate a coin flip.' },
      { name: 'Pomodoro Timer', slug: 'pomodoro-timer', description: 'A timer for the Pomodoro technique.' },
      { name: 'Countdown / Timer Generator', slug: 'countdown-generator', description: 'Generate a countdown timer.' },
      { name: 'File Size / Download Time Calculator', slug: 'download-time-calculator', description: 'Calculate download times.' },
      { name: 'Bandwidth Usage Tracker', slug: 'bandwidth-tracker-static', description: 'Static bandwidth usage calculator.' },
      { name: 'Hostname ↔ IP Lookup', slug: 'hostname-ip-lookup', description: 'Look up hostname or IP.' },
      { name: 'Network Packet Estimator', slug: 'network-packet-estimator', description: 'Estimate network packet counts.' },
      { name: 'ASCII Art Generator', slug: 'ascii-art-generator', description: 'Generate ASCII art from text.' },
      { name: 'Emoji / Symbol Picker', slug: 'emoji-picker', description: 'Pick emojis and symbols.' },
    ],
  },
  {
    name: 'Miscellaneous ICT Tools',
    icon: Boxes,
    tools: [
      { name: 'Base Conversion Tool', slug: 'base-converter', description: 'Convert between number bases.' },
      { name: 'URL Shortener (local)', slug: 'url-shortener-local', description: 'A local/static URL shortener.' },
      { name: 'Hex Color Code Analyzer', slug: 'hex-color-analyzer', description: 'Analyze hex color codes.' },
      { name: 'Binary Pattern Finder', slug: 'binary-pattern-finder', description: 'Find patterns in binary data.' },
      { name: 'Random MAC Address Generator', slug: 'random-mac-generator', description: 'Generate a random MAC address.' },
      { name: 'Random IPv6 Generator', slug: 'random-ipv6-generator', description: 'Generate a random IPv6 address.' },
      { name: 'Simple File Encryption / Decryption', slug: 'simple-file-encryption', description: 'Simple file encryption tool.' },
      { name: 'CSV / Excel Analyzer', slug: 'csv-analyzer', description: 'Analyze CSV/Excel data with basic formulas.' },
      { name: 'Code Snippet Sharing Tool', slug: 'snippet-sharing-tool', description: 'Share code snippets.' },
      { name: 'Code Diff Checker', slug: 'code-diff-checker', description: 'Check differences between code snippets.' },
      { name: 'Algorithm Step Logger', slug: 'algorithm-step-logger', description: 'Log steps of an algorithm.' },
      { name: 'Syntax Highlighter / Preview', slug: 'syntax-highlighter', description: 'Highlight and preview code syntax.' },
      { name: 'Markdown to HTML Converter', slug: 'markdown-to-html', description: 'Convert Markdown to HTML.' },
      { name: 'CSS Grid Generator', slug: 'css-grid-generator', description: 'Generate CSS grid layouts.' },
      { name: 'Flexbox Layout Generator', slug: 'flexbox-generator', description: 'Generate Flexbox layouts.' },
      { name: 'JSON to CSV Converter', slug: 'json-to-csv', description: 'Convert JSON to CSV.' },
      { name: 'CSV to JSON Converter', slug: 'csv-to-json', description: 'Convert CSV to JSON.' },
      { name: 'HTML Table Generator from CSV', slug: 'html-table-from-csv', description: 'Generate HTML table from CSV data.' },
      { name: 'IP Ping Simulator', slug: 'ip-ping-simulator', description: 'Simulate an IP ping.' },
    ],
  },
];

export const allTools: Tool[] = toolCategories.flatMap(category => category.tools);

export const mainNavLinks = [
    {
        name: 'AI Tool Recommender',
        href: '/',
        icon: Sparkles,
        description: 'Find the right tool for your task.'
    },
    {
        name: 'AI Code Generator',
        href: '/tools/code-generator',
        icon: FileCode2,
        description: 'Generate and debug code with AI.'
    }
]
