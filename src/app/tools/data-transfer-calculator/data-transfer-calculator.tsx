
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Timer, Binary, File, Server } from 'lucide-react';
import Link from 'next/link';

// --- Conversion Constants ---
const bitsIn = {
    'b': 1,
    'kb': 1000,
    'Mb': 1000**2,
    'Gb': 1000**3,
    'Tb': 1000**4,
    'Kib': 1024,
    'Mib': 1024**2,
    'Gib': 1024**3,
    'Tib': 1024**4,
};
const bytesIn = {
    'B': 1,
    'KB': 1000,
    'MB': 1000**2,
    'GB': 1000**3,
    'TB': 1000**4,
    'KiB': 1024,
    'MiB': 1024**2,
    'GiB': 1024**3,
    'TiB': 1024**4,
};


// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is the difference between a bit and a byte?", answer: "A bit is the smallest unit of data in computing, represented as a 0 or 1. A byte is a group of 8 bits. Data transfer speeds are typically measured in bits per second (e.g., Mbps), while file sizes are measured in bytes (e.g., MB)." },
    { question: "Why are there two sets of units (e.g., MB vs. MiB)?", answer: "MB (megabyte) is a decimal (base-10) unit, meaning 1 MB = 1,000,000 bytes. MiB (mebibyte) is a binary (base-2) unit, where 1 MiB = 1,048,576 bytes (1024*1024). File systems (like Windows) often use binary units (MiB, GiB), while storage manufacturers and network providers use decimal units (MB, GB). This discrepancy is why a 1 TB hard drive often shows up as about 931 GiB on your computer." },
    { question: "Why is my actual download speed slower than what this calculator shows?", answer: "This calculator provides a theoretical time based on a constant speed. Real-world speeds are affected by many factors: network congestion, server load, Wi-Fi signal strength, latency, other devices using your network, and throttling by your ISP. The calculator gives you a best-case-scenario estimate." },
    { question: "Does this account for upload vs. download speed?", answer: "The calculator treats them the same way; you simply input your known speed. However, many internet connections are 'asymmetrical', with much slower upload speeds than download speeds (e.g., 500 Mbps download but only 20 Mbps upload). Be sure to use your actual upload speed when calculating upload times." },
    { question: "What is network overhead?", answer: "Data isn't sent in a single, raw block. It's broken into packets, each with its own header and footer containing routing information (like TCP/IP headers). This extra data is called overhead and typically consumes about 5-10% of the bandwidth, meaning not all of your connection speed is used for the actual file data." },
    { question: "How does latency affect transfer time?", answer: "Latency (or ping) is the delay before a transfer begins. For a single large file download, its effect is minimal. However, for transfers involving many small files, high latency can significantly increase the total time because each file transfer has to initiate separately, adding a small delay each time." },
    { question: "What's a 'good' transfer speed?", answer: "This is highly relative. For general web browsing, 25 Mbps is fine. For 4K video streaming, you need at least 25-50 Mbps. For downloading large games (100+ GB), speeds of 500 Mbps to 1 Gbps are desirable to reduce wait times from hours to minutes." },
    { question: "How do I find out my internet speed?", answer: "You can use a free online speed test tool. Search for 'internet speed test' and use a reputable service. For the most accurate result, use a computer connected directly to your router with an Ethernet cable and ensure no other devices are heavily using the network." },
    { question: "Why does it take longer to transfer many small files than one large file of the same total size?", answer: "This is due to the overhead of file system operations and network protocol handshakes. For each small file, your computer and the server must perform actions like creating the file, writing metadata, and closing it. This per-file overhead, repeated thousands of times, adds up to be much more significant than the single overhead of one large file." },
    { question: "Can I use this to calculate backup times to a local drive?", answer: "Yes, you can. You would need to know the transfer speed of your connection to the drive. For example, a USB 3.0 connection has a theoretical speed of 5 Gbps. You would enter your file size and 5 Gbps as the transfer speed to get a best-case estimate." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Data Transfer Time',
    description: 'Estimate the time required to download or upload a file based on its size and your connection speed.',
    step: [
        { '@type': 'HowToStep', name: 'Enter File Size', text: 'Input the size of the file you want to transfer. Select the appropriate unit (e.g., MB for megabytes, GiB for gibibytes).' },
        { '@type': 'HowToStep', name: 'Enter Transfer Speed', text: 'Input your internet connection speed (or the speed of the transfer medium). Select the appropriate unit (e.g., Mbps for megabits per second).' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate Transfer Time" button.' },
        { '@type': 'HowToStep', name: 'Review Results', text: 'The tool will display the estimated time to complete the transfer, broken down into days, hours, minutes, and seconds, as well as the total time in various units.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'Bit', definition: 'The smallest unit of data, a single 0 or 1. Network speeds are measured in bits per second.' },
    { term: 'Byte', definition: 'A group of 8 bits. File sizes are measured in bytes.' },
    { term: 'Mbps', definition: 'Megabits per second. A standard measure of network speed (millions of bits per second).' },
    { term: 'GB vs. GiB', definition: 'GB (gigabyte) is a base-10 unit (1 billion bytes). GiB (gibibyte) is a base-2 unit (1,073,741,824 bytes). This difference is why storage capacity often appears smaller on your computer than on the packaging.' },
    { term: 'Network Overhead', definition: 'Extra data (headers, trailers) added to your file for routing and error-checking, which consumes a small part of your bandwidth.' },
    { term: 'Asymmetrical Connection', definition: 'An internet connection where the download speed is much faster than the upload speed (common for cable and DSL).' },
];

export function DataTransferTimeCalculator() {
    const [fileSize, setFileSize] = useState<number | ''>(100);
    const [fileUnit, setFileUnit] = useState('GB');
    const [speed, setSpeed] = useState<number | ''>(500);
    const [speedUnit, setSpeedUnit] = useState('Mb');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);

    const handleCalculate = () => {
        setError('');
        if (fileSize === '' || speed === '' || fileSize <= 0 || speed <= 0) {
            setError('Please enter valid, positive numbers for file size and speed.');
            setResults(null);
            return;
        }

        const sizeInBytes = fileSize * (bytesIn as any)[fileUnit];
        const sizeInBits = sizeInBytes * 8;
        const speedInBps = speed * (bitsIn as any)[speedUnit];
        
        if (speedInBps === 0) {
            setError('Transfer speed cannot be zero.');
            setResults(null);
            return;
        }

        const totalSeconds = sizeInBits / speedInBps;

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = parseFloat((totalSeconds % 60).toFixed(2));

        setResults({
            days, hours, minutes, seconds,
            totalSeconds,
            totalMinutes: totalSeconds / 60,
            totalHours: totalSeconds / 3600,
        });
    };

    useEffect(() => {
        if (results && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            resultRef.current.focus();
        }
    }, [results]);
    
    const formatTime = (time: number) => time.toLocaleString(undefined, { maximumFractionDigits: 2 });


    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Data Transfer Time Calculator</CardTitle>
                    <CardDescription>
                        Estimate the time it will take to download or upload a file based on its size and your connection speed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Label htmlFor="file-size">File Size</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="file-size"
                                    type="number"
                                    value={fileSize}
                                    onChange={(e) => setFileSize(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    placeholder="e.g., 100"
                                />
                                 <Select value={fileUnit} onValueChange={setFileUnit}>
                                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(bytesIn).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="transfer-speed">Transfer Speed</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="transfer-speed"
                                    type="number"
                                    value={speed}
                                    onChange={(e) => setSpeed(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    placeholder="e.g., 500"
                                />
                                 <Select value={speedUnit} onValueChange={setSpeedUnit}>
                                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                       {Object.keys(bitsIn).map(u => <SelectItem key={u} value={u}>{u}ps</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                     <Button onClick={handleCalculate} className="w-full sm:w-auto"><Timer className="mr-2 h-4 w-4" /> Calculate Transfer Time</Button>
                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Input Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {results && (
                <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estimated Transfer Time</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="text-center bg-muted p-6 rounded-lg">
                                <p className="text-lg text-muted-foreground">Total Time</p>
                                <div className="text-4xl font-bold text-primary">
                                    {results.days > 0 && `${results.days}d `}
                                    {results.hours > 0 && `${results.hours}h `}
                                    {results.minutes > 0 && `${results.minutes}m `}
                                    {`${results.seconds}s`}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-center">Time Breakdown</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    <div className="bg-background p-3 rounded-md">
                                        <p className="text-sm text-muted-foreground">In Hours</p>
                                        <p className="text-xl font-semibold">{formatTime(results.totalHours)}</p>
                                    </div>
                                    <div className="bg-background p-3 rounded-md">
                                        <p className="text-sm text-muted-foreground">In Minutes</p>
                                        <p className="text-xl font-semibold">{formatTime(results.totalMinutes)}</p>
                                    </div>
                                     <div className="bg-background p-3 rounded-md">
                                        <p className="text-sm text-muted-foreground">In Seconds</p>
                                        <p className="text-xl font-semibold">{formatTime(results.totalSeconds)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Data Transfer Time Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>Ever wondered how long it will take to download that new game or upload your vacation photos? This tool gives you a precise, theoretical estimate based on your inputs.</p>
                    <ol>
                        <li><strong>Enter File Size:</strong> Input the numerical size of your file. Then, select the correct unit from the dropdown menu (e.g., GB for gigabytes, TB for terabytes). Be mindful of the difference between decimal (GB) and binary (GiB) units for the most accurate calculation.</li>
                        <li><strong>Enter Transfer Speed:</strong> Input your connection speed. This could be your internet download/upload speed or the speed of a local connection like USB. Make sure to select the correct unit, usually Mbps (megabits per second).</li>
                        <li><strong>Calculate:</strong> Click the "Calculate Transfer Time" button.</li>
                        <li><strong>Review Your Estimate:</strong> The tool will display the result in a human-readable format (days, hours, minutes, seconds) and also provide the total time in hours, minutes, and seconds for easy comparison.</li>
                    </ol>
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example Scenario</AlertTitle>
                        <AlertDescription>
                          You want to download a <strong>150 GB</strong> game and your internet plan is <strong>500 Mbps</strong>. Enter `150` and select `GB` for the file size. Enter `500` and select `Mb` (for Mbps) for the speed. The calculator will tell you it will take approximately <strong>40 minutes</strong>.
                        </AlertDescription>
                    </Alert>
                </Card>
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
                        <CardTitle className="text-primary">Educational Deep Dive: The Science of Data Transfer</CardTitle>
                    </div>
                    <CardDescription>From bits and bytes to bandwidth and bottlenecks, understand the fundamental concepts that govern how fast your data moves.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">Bits vs. Bytes: The Most Common Point of Confusion</h3>
                        <p>The single biggest misunderstanding in data transfer is the difference between a bit and a byte. It's simple, but critical: <strong>1 Byte = 8 bits</strong>.</p>
                        <ul className="list-disc pl-5">
                           <li><strong>File Sizes</strong> are almost always measured in <strong>Bytes</strong> (Kilobytes (KB), Megabytes (MB), Gigabytes (GB)). When you look at the properties of a file on your computer, you see its size in bytes.</li>
                           <li><strong>Transfer Speeds</strong> are almost always measured in <strong>bits</strong> per second (Megabits per second (Mbps), Gigabits per second (Gbps)). Your Internet Service Provider (ISP) advertises their plans in bits.</li>
                        </ul>
                        <p>This is why a 100 Mbps internet connection does not download a 100 MB file in one second. To find the theoretical speed in Megabytes per second, you must divide the megabits per second by 8. So, a 100 Mbps connection has a maximum theoretical download speed of 12.5 Megabytes per second (100 / 8 = 12.5). Our calculator handles this conversion for you automatically.</p>
                        <Alert variant="destructive">
                            <Binary className="h-4 w-4" />
                            <AlertTitle>The Binary vs. Decimal Trap (GB vs. GiB)</AlertTitle>
                            <AlertDescription>
                                To complicate things further, there are two standards for measuring large amounts of data. The **decimal (base-10)** system uses powers of 1000 (1 KB = 1000 Bytes). The **binary (base-2)** system uses powers of 1024 (1 KiB = 1024 Bytes). Storage manufacturers and ISPs use the decimal system (GB, TB) because it results in bigger-looking numbers. Your operating system (like Windows) uses the binary system (GiB, TiB) because it's more natural for computer architecture. This is why your 1 TB hard drive shows up as only 931 GiB. Our calculator includes both unit types for accuracy.
                            </AlertDescription>
                        </Alert>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">What Is "Bandwidth"? The Highway Analogy</h3>
                        <p>Bandwidth is the maximum theoretical rate at which data can be transferred over a connection. The best analogy is a highway. Bandwidth is the number of lanes. A ten-lane highway can carry more cars at once than a two-lane highway. Similarly, a 1 Gbps (1000 Mbps) connection can carry more data at once than a 100 Mbps connection. You can use our <Link href="/tools/bandwidth-estimator" className="text-primary hover:underline">Bandwidth Estimator</Link> to figure out how many "lanes" you need.</p>
                        <p>However, the existence of a ten-lane highway doesn't mean you can drive at 500 mph. Your speed is limited by other factors. This brings us to the other critical component: latency.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Real-World Factors That Slow You Down</h3>
                        <p>This calculator provides a perfect-world calculation. In reality, your transfer time will almost always be longer. Here’s why:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                           <li><strong>Network Congestion:</strong> Just like a highway during rush hour, the internet can get congested. If too many people in your neighborhood are streaming or downloading at once, the total available bandwidth from your ISP gets shared, and everyone's speed drops.</li>
                           <li><strong>Server-Side Bottlenecks:</strong> The server you are downloading from has its own bandwidth limits. A popular game on launch day might have millions of people trying to download it at once. Even with a super-fast home connection, the server can only send out data so fast, creating a bottleneck.</li>
                           <li><strong>Latency:</strong> Latency is the delay it takes for a data packet to travel from a server to you and back. For a single, large file transfer, its effect is small. But if you are transferring thousands of small files, the latency for each file's "handshake" process adds up, significantly increasing the total time. Our <Link href="/tools/latency-estimator" className="text-primary hover:underline">Latency Estimator</Link> can help visualize this.</li>
                           <li><strong>Wi-Fi vs. Wired:</strong> A wired Ethernet connection is always faster and more stable than Wi-Fi. Wi-Fi signals are prone to interference from walls, other electronic devices, and even your neighbor's Wi-Fi network. This interference causes dropped packets that must be re-sent, slowing down the transfer.</li>
                           <li><strong>Protocol Overhead:</strong> Data isn't sent as one continuous stream. It's broken into "packets," and each packet has extra data (headers and trailers) for addressing and error-checking. This TCP/IP overhead can consume 5% or more of your bandwidth, meaning it's not being used for the file itself.</li>
                        </ol>
                    </section>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Check Your Upload Speed:</strong> When calculating upload times for things like YouTube videos or cloud backups, be sure to use your *upload* speed from a speed test, which is often much lower than your download speed.</li>
                            <li><strong>Use a Download Manager:</strong> For very large files, a download manager can help. These tools can sometimes open multiple connections to the server simultaneously, potentially increasing the overall transfer rate. They also allow you to pause and resume downloads.</li>
                            <li><strong>Schedule Large Transfers:</strong> If possible, schedule large downloads or backups to run overnight. Network congestion is typically lowest in the early morning hours, which can result in faster, more stable speeds.</li>
                            <li><strong>Local Transfers Matter:</strong> This tool isn't just for the internet. You can use it to estimate local transfers too. For example, a USB 3.0 drive has a theoretical speed of 5 Gbps. You can calculate how long it should take to transfer a large video file to it.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Confusing Bits and Bytes:</strong> The most common mistake. If you have a 100 Mbps connection and a 100 MB file, don't expect it to take one second. Remember to divide your connection speed by 8 to get the speed in MegaBytes per second.</li>
                            <li><strong>Ignoring Units:</strong> Calculating with mismatched units (e.g., a file size in GiB but a transfer speed based on GB) will lead to an inaccurate result. Always double-check your units.</li>
                            <li><strong>Expecting Theoretical Speeds:</strong> Believing you will always get the maximum speed advertised by your ISP. Think of it as a speed *limit*, not a guaranteed speed. Real-world performance is always lower.</li>
                            <li><strong>Forgetting About Other Devices:</strong> Running a large download while someone else in your house is streaming a 4K movie will mean you are both sharing the total available bandwidth, slowing down both of you.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">The Gamer's Dilemma</h3>
                        <p className="text-sm text-muted-foreground">A gamer wants to download the latest AAA title, which is 120 GB. Their internet plan is 300 Mbps. They use the calculator to find out it will take approximately 53 minutes. Knowing this, they can start the download before dinner, and it will be ready to play by the time they're done.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">The Video Editor's Upload</h3>
                        <p className="text-sm text-muted-foreground">A freelance video editor needs to upload a 25 GB 4K video file to a client. They run a speed test and find their download speed is 800 Mbps, but their upload speed is only 40 Mbps. By using their correct upload speed in the calculator, they get a realistic estimate of about 1 hour and 23 minutes, allowing them to set the correct expectation with their client.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">The Cloud Backup Project</h3>
                        <p className="text-sm text-muted-foreground">Someone decides to back up their 2 TB of family photos and documents to a cloud storage service. They have a 100 Mbps upload speed. The calculator shows this will take over 44 hours of continuous uploading. Realizing this, they decide to run the backup in smaller chunks over several nights to avoid slowing down their network during the day.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Choosing an Internet Plan</h3>
                        <p className="text-sm text-muted-foreground">A family is moving and comparing two internet plans: a cheap 50 Mbps plan and a more expensive 500 Mbps plan. By using the calculator, they see that downloading a 4 GB movie would take about 11 minutes on the slow plan but only about 1 minute on the fast plan. This concrete comparison helps them decide if the extra cost is worth the time saved for their usage patterns.</p>
                    </div>
                </div>
            </section>
            
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
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/bandwidth-estimator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Network Bandwidth Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Estimate how much bandwidth you actually need for your household or office.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/latency-estimator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Latency Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Understand the other half of the speed equation: the delay caused by distance.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/number-converter" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Binary/Decimal Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Deepen your understanding of the binary and decimal units used in data transfer.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
