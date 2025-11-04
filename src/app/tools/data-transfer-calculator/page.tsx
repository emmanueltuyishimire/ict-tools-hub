
import { PageHeader } from '@/components/page-header';
import { DataTransferTimeCalculator } from './data-transfer-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { faqData, howToSchema, keyTerminologies, softwareAppSchema } from './schema';

export const metadata = {
    title: 'Data Transfer Time Calculator | ICT Toolbench',
    description: 'Estimate the time it takes to download or upload a file based on its size and your network or internet speed. Perfect for planning large file transfers.',
     openGraph: {
        title: 'Data Transfer Time Calculator | ICT Toolbench',
        description: 'Estimate how long a file download or upload will take. A simple tool for network administrators, developers, and home users to plan large data transfers.',
        url: 'https://calculation.site/ict/tools/data-transfer-calculator',
    }
};

export default function DataTransferTimeCalculatorPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
    };
  return (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      <PageHeader
        title="Data Transfer Time Calculator"
        description="Estimate how long a file transfer will take. Input the file size and your connection speed to get a precise calculation for downloads, uploads, and backups."
      />
      <div className="max-w-4xl mx-auto space-y-12">
            <DataTransferTimeCalculator />
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool provides a quick and easy way to estimate file transfer durations. Follow these simple steps:</p>
                    <ol>
                        <li><strong>Enter File Size:</strong> Input the size of the file or data you need to transfer. Be sure to select the correct unit (e.g., GB for gigabytes, MB for megabytes).</li>
                        <li><strong>Enter Transfer Speed:</strong> Input the speed of your network connection. This is typically measured in megabits per second (Mbps). Make sure you use your **upload speed** for uploads and **download speed** for downloads.</li>
                        <li><strong>Calculate Time:</strong> Click the "Calculate Transfer Time" button.</li>
                        <li><strong>Review the Estimate:</strong> The tool will display the estimated time in a clear, human-readable format (days, hours, minutes, seconds), as well as breakdowns in total hours, minutes, and seconds.</li>
                    </ol>
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>This is a Theoretical Estimate</AlertTitle>
                        <AlertDescription>
                            This calculation assumes you can use 100% of your stated bandwidth. Real-world speeds are often slower due to network congestion, server load, and protocol overhead.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>

             <section>
                <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Example 1: Downloading a Large Game</CardTitle>
                            <CardDescription>You want to download a new 80 GB video game on your 500 Mbps home internet connection.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none">
                                <ol>
                                    <li><strong>Inputs:</strong> File Size: 80 GB, Transfer Speed: 500 Mbps.</li>
                                    <li><strong>Calculation:</strong> The calculator converts 80 GB to gigabits and divides by 500 megabits per second.</li>
                                    <li><strong>Result:</strong> Approximately <strong>21 minutes and 20 seconds</strong>. This helps you know if you have time to grab a coffee while it downloads.</li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Example 2: Uploading a Video File to the Cloud</CardTitle>
                            <CardDescription>A video editor needs to upload a 5 GB video file from an office with an asymmetrical internet connection.</CardDescription>
                        </CardHeader>
                         <CardContent className="space-y-4">
                           <div className="prose prose-sm max-w-none">
                               <ol>
                                   <li><strong>Inputs:</strong> File Size: 5 GB, Transfer Speed: 40 Mbps (using the much slower **upload speed** of their 1000/40 Mbps plan).</li>
                                   <li><strong>Calculation:</strong> The calculator converts 5 GB to gigabits and divides by 40 megabits per second.</li>
                                   <li><strong>Result:</strong> Approximately <strong>16 minutes and 41 seconds</strong>. This demonstrates how a slow upload speed can be a significant bottleneck, even on a "gigabit" plan.</li>
                               </ol>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

             <section>
               <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
               <Card>
                  <CardContent className="p-6">
                      <dl className="space-y-4">
                          {keyTerminologies.map((item) => (
                              <div key={item.term}>
                                  <dt className="font-semibold">{item.term}</dt>
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
                        <CardTitle className="text-primary">Educational Deep Dive: Bits vs. Bytes and Throughput</CardTitle>
                    </div>
                    <CardDescription>Understand the units of digital information and the factors that affect your real-world transfer speeds.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3>Bits vs. Bytes: The 8-to-1 Rule</h3>
                        <p>
                            One of the most common points of confusion in networking is the difference between bits and bytes.
                        </p>
                        <ul className="list-disc pl-5">
                            <li>A <strong>bit</strong> is the smallest unit of digital information, a single 0 or 1. Network speeds are almost always measured in <strong>megabits per second (Mbps)</strong> or <strong>gigabits per second (Gbps)</strong>.</li>
                            <li>A <strong>byte</strong> is a group of 8 bits. File sizes are almost always measured in <strong>megabytes (MB)</strong> or <strong>gigabytes (GB)</strong>.</li>
                        </ul>
                        <p>This 8-to-1 ratio is critical. To download a 1 MB file over a 1 Mbps connection, it does not take 1 second. It takes 8 seconds (1 megabyte = 8 megabits). This calculator handles this conversion for you automatically.</p>
                    </section>
                    <section>
                        <h3>Bandwidth vs. Throughput: The Difference Between Theory and Reality</h3>
                        <p>
                            <strong>Bandwidth</strong> is the theoretical maximum speed of your connection, the number your ISP advertises (e.g., "up to 500 Mbps"). <strong>Throughput</strong> is the actual rate of data transfer you achieve in the real world. Your throughput will almost always be lower than your bandwidth due to several factors:
                        </p>
                        <ul className="list-disc pl-5">
                           <li><strong>Network Congestion:</strong> Both your local network and the wider internet can have "traffic jams" that slow down your connection.</li>
                           <li><strong>Server Load:</strong> The server you are connecting to might be busy serving many other users, limiting how fast it can send you data.</li>
                           <li><strong>Protocol Overhead:</strong> The TCP/IP protocols used to transfer data add their own headers to every packet, consuming a small percentage of the total bandwidth.</li>
                           <li><strong>Latency:</strong> The physical distance to the server creates a delay before the transfer can even begin. Explore this with our <Link href="/tools/latency-estimator" className='text-primary hover:underline'>Latency Estimator</Link>.</li>
                        </ul>
                        <p>
                            This tool calculates time based on bandwidth, giving you a best-case estimate. Your actual transfer time will likely be slightly longer.
                        </p>
                    </section>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/href="\/tools\/([^"]*)"/g, "href=\"/tools/$1\" class=\"text-primary hover:underline\"") }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
      </div>
    </>
  );
}
