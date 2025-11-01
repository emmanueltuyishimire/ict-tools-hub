
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Binary, Network, ListTree } from 'lucide-react';
import Link from 'next/link';

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3];
};

const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296;
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const faqData = [
    { question: "What is the purpose of this tool?", answer: "This tool automates the process of fixed-length subnetting. You provide a large network block and specify the size of the smaller subnets you want, and the tool generates a complete list of all the resulting subnets, including their network IDs, usable host ranges, and broadcast addresses." },
    { question: "What is fixed-length subnetting?", answer: "Fixed-length subnetting (FLSM) is a method of dividing a network into multiple smaller subnets that are all the same size. For example, taking a /24 network and dividing it into four /26 subnets. This is in contrast to VLSM (Variable Length Subnet Masking), where the subnets can be different sizes. Our <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a> is designed for that purpose." },
    { question: "Why must the New CIDR be larger than the Original CIDR?", answer: "Subnetting involves 'borrowing' bits from the host portion of an address to use for the network portion. A larger CIDR number means more network bits and fewer host bits, resulting in smaller subnets. Therefore, to divide a network (e.g., a /24), you must choose a new CIDR prefix that is larger (e.g., /25, /26, etc.)." },
    { question: "How many subnets will be created?", answer: "The number of subnets created is determined by the difference between the new CIDR prefix and the original one. The formula is 2^(New CIDR - Original CIDR). For example, subnetting a /24 network into /26 subnets results in 2^(26-24) = 2^2 = 4 subnets." },
    { question: "What is the maximum number of subnets this tool can generate?", answer: "To ensure browser performance, this tool is limited to generating a maximum of 4096 subnets. If your selected CIDR combination would result in more subnets, you will receive an error message." },
    { question: "How can I use the generated list?", answer: "The list is useful for network documentation, planning router configurations, defining DHCP scopes, and creating firewall rules. You can use the 'Copy' buttons to copy individual pieces of information for use in your configuration files or scripts." },
    { question: "Does this tool work for IPv6?", answer: "No, this tool is designed for IPv4 subnetting only. IPv6 uses a 128-bit address space and has different subnetting principles and tools." },
    { question: "What's the difference between this and the Subnet Calculator?", answer: "The <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a> analyzes a single IP address and mask to give you detailed information about that one specific subnet. This tool does the opposite: it takes a large network and shows you all the smaller subnets you can create within it." },
    { question: "Why is the first subnet's Network ID the same as the Major Network address?", answer: "This is correct and expected. When you subnet a larger network, the very first subnet you create will always start at the same address as the major network block itself. The subsequent subnets will then start at the end of the previous one's address range." },
    { question: "What happens if I enter an IP that isn't a network address?", answer: "The tool will automatically calculate the correct starting network address for your Major Network IP and CIDR prefix and use that as the basis for the calculation, ensuring the results are accurate for the block you intend to subnet." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a List of Subnets from a CIDR Block',
    description: 'A step-by-step guide to dividing a large network into multiple smaller, equal-sized subnets.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the Major Network', text: 'Input the starting IP address and CIDR prefix of the large network block you want to divide (e.g., 10.10.0.0 and /16).' },
        { '@type': 'HowToStep', name: 'Select the New Subnet Size', text: 'From the "New Subnet CIDR" dropdown, choose the prefix for the smaller subnets you want to create (e.g., /24). This must be a larger number than the original CIDR.' },
        { '@type': 'HowToStep', name: 'Generate the List', text: 'Click the "Generate Subnet List" button.' },
        { '@type': 'HowToStep', name: 'Review the Results', text: 'The tool will display a summary of how many subnets will be created and how many hosts each will contain. Below, a table will list every new subnet with its Network ID, Usable Host Range, and Broadcast Address.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'FLSM (Fixed-Length Subnet Masking)', definition: 'A subnetting method where a larger network is divided into multiple smaller subnets that are all the same size.' },
    { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'A compact method for specifying an IP address and its associated routing prefix (e.g., 192.168.1.0/24).' },
    { term: 'Major Network', definition: 'The large, original block of IP addresses that you intend to divide into smaller subnets.' },
    { term: 'Subnet', definition: 'A smaller, logical subdivision of a larger IP network.' },
    { term: 'Usable Host Range', definition: 'The range of IP addresses within a subnet that can be assigned to individual devices, excluding the reserved network and broadcast addresses.' },
];

type SubnetResult = {
    networkId: string;
    hostRange: string;
    broadcastId: string;
};

export function CidrToSubnetListGenerator() {
    const [majorNetwork, setMajorNetwork] = useState('192.168.0.0');
    const [originalCidr, setOriginalCidr] = useState('24');
    const [newCidr, setNewCidr] = useState('27');
    const [results, setResults] = useState<{ summary: any, subnets: SubnetResult[] } | null>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const handleCalculate = () => {
        setError('');
        setResults(null);

        const baseIpLong = ipToLong(majorNetwork);
        if (baseIpLong === null) {
            setError('Invalid Major Network IP address format.');
            return;
        }

        const originalCidrNum = parseInt(originalCidr, 10);
        const newCidrNum = parseInt(newCidr, 10);

        if (isNaN(originalCidrNum) || originalCidrNum < 0 || originalCidrNum > 32 || isNaN(newCidrNum) || newCidrNum < 0 || newCidrNum > 32) {
            setError('Invalid CIDR prefix. Both must be between 0 and 32.');
            return;
        }
        
        if (newCidrNum <= originalCidrNum) {
            setError('New Subnet CIDR must be larger than the Original Network CIDR to create smaller subnets.');
            return;
        }

        const originalMask = (0xFFFFFFFF << (32 - originalCidrNum)) >>> 0;
        const networkStart = baseIpLong & originalMask;

        const bitsBorrowed = newCidrNum - originalCidrNum;
        const numberOfSubnets = Math.pow(2, bitsBorrowed);
        
        if (numberOfSubnets > 4096) {
             setError(`This operation would create ${numberOfSubnets.toLocaleString()} subnets, which is more than the tool's limit of 4,096. Please choose a smaller New Subnet CIDR.`);
            return;
        }
        
        const newSubnetSize = Math.pow(2, 32 - newCidrNum);
        const usableHosts = newSubnetSize > 2 ? newSubnetSize - 2 : (newSubnetSize === 2 ? 2 : 0);

        const subnets: SubnetResult[] = [];
        for (let i = 0; i < numberOfSubnets; i++) {
            const currentNetworkId = networkStart + (i * newSubnetSize);
            const currentBroadcastId = currentNetworkId + newSubnetSize - 1;
            
            subnets.push({
                networkId: longToIp(currentNetworkId),
                hostRange: usableHosts > 0 ? `${longToIp(currentNetworkId + 1)} - ${longToIp(currentBroadcastId - 1)}` : 'N/A',
                broadcastId: longToIp(currentBroadcastId),
            });
        }
        
        setResults({
            summary: {
                numberOfSubnets,
                usableHosts,
                newSubnetCidr: newCidrNum
            },
            subnets,
        });
    };
    
    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };
    
    const cidrOptions = (min: number) => Array.from({ length: 33-min }, (_, i) => ({ value: (i + min).toString(), label: `/${i + min}` }));

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>CIDR to Subnet List Generator</CardTitle>
                    <CardDescription>Divide a large network into multiple smaller, equal-sized subnets (FLSM).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-4 rounded-lg">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="major-network">Original Network Address</Label>
                            <Input id="major-network" value={majorNetwork} onChange={(e) => setMajorNetwork(e.target.value)} className="font-code" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="original-cidr">Original CIDR</Label>
                            <Select value={originalCidr} onValueChange={setOriginalCidr}>
                                <SelectTrigger id="original-cidr"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {cidrOptions(0).map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2 sm:col-span-1">
                            <Label htmlFor="new-cidr">New Subnet CIDR</Label>
                            <Select value={newCidr} onValueChange={setNewCidr}>
                                <SelectTrigger id="new-cidr"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                     {cidrOptions(parseInt(originalCidr,10)+1).map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={handleCalculate} className="w-full sm:w-auto"><ListTree className="mr-2 h-4 w-4" /> Generate Subnet List</Button>
                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Calculation Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

             {results && (
                 <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Subnet List</CardTitle>
                            <CardDescription>
                                Your <strong>{majorNetwork}/{originalCidr}</strong> network has been divided into <strong>{results.summary.numberOfSubnets.toLocaleString()}</strong> subnets of size <strong>/{results.summary.newSubnetCidr}</strong>, each with <strong>{results.summary.usableHosts.toLocaleString()}</strong> usable host addresses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Network ID</TableHead>
                                            <TableHead>Usable Host Range</TableHead>
                                            <TableHead>Broadcast Address</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.subnets.map((subnet, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{i + 1}</TableCell>
                                                <TableCell className="font-code">{subnet.networkId}</TableCell>
                                                <TableCell className="font-code">{subnet.hostRange}</TableCell>
                                                <TableCell className="font-code">{subnet.broadcastId}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the CIDR to Subnet List Generator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool is designed for network administrators who need to perform fixed-length subnetting—dividing a large network into multiple, smaller networks of the same size.</p>
                    <ol>
                        <li><strong>Define Your Starting Network:</strong> In the "Original Network Address" section, enter the main IP block you wish to divide (e.g., `10.0.0.0`) and select its CIDR prefix (e.g., `/16`). The tool will automatically use the correct network address for the block.</li>
                        <li><strong>Choose Your New Subnet Size:</strong> In the "New Subnet CIDR" dropdown, select the CIDR prefix for the smaller subnets you want to create. Remember, this number must be larger than the original CIDR (e.g., `/24`).</li>
                        <li><strong>Generate the List:</strong> Click the "Generate Subnet List" button.</li>
                        <li><strong>Analyze Your Subnet Plan:</strong> The tool will display a summary telling you how many subnets have been created. Below, a detailed table will list every single generated subnet, showing its Network ID, the range of IPs you can assign to devices, and its Broadcast Address.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example</AlertTitle>
                        <AlertDescription>
                          If you have the network <strong>192.168.1.0/24</strong> and you want to divide it into networks that can each hold about 30 hosts, you would select <strong>/27</strong> as your new CIDR. The tool will generate a list of the 8 resulting subnets (192.168.1.0/27, 192.168.1.32/27, etc.), giving you a complete and ready-to-use IP plan.
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
                        <CardTitle className="text-primary">Educational Deep Dive: Fixed-Length vs. Variable-Length Subnetting</CardTitle>
                    </div>
                    <CardDescription>Understand the classic approach of fixed-length subnetting and where it fits in modern network design.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">The Concept of Subnetting</h3>
                        <p>Subnetting is the fundamental practice of taking one large IP network and breaking it into smaller, logical sub-networks, or "subnets". This is done for several key reasons: to improve network performance by reducing broadcast traffic, to enhance security by isolating network segments, and to simplify network administration. At its core, subnetting involves "borrowing" bits from the host portion of an IP address to create more network bits, thereby creating more network identifiers.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">FLSM: Fixed-Length Subnet Masking</h3>
                        <p><strong>Fixed-Length Subnet Masking (FLSM)</strong> is the original, classic method of subnetting. In an FLSM scheme, every single subnet created from the larger block is exactly the same size. They all share the same subnet mask. For example, if you take a `/24` network and decide to divide it into four subnets, FLSM dictates that all four of those subnets must be `/26` networks.</p>
                        <p>This approach is simple, predictable, and easy to calculate. It was the standard for many years and is still useful in scenarios where network segments have uniform requirements, such as a company that is deploying identical equipment racks in a data center, where each rack has the same number of servers and needs the same number of IP addresses. You can use our <Link href="/tools/subnet-calculator" className="text-primary hover:underline">Subnet Calculator</Link> to analyze any single one of these generated subnets in greater detail.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Math Behind the Magic: How Subnets are Generated</h3>
                        <p>The process of generating a list of fixed-size subnets follows a clear formula based on binary arithmetic. Let's say you want to subnet the network <strong>172.16.0.0/22</strong> into multiple <strong>/24</strong> subnets.</p>
                        <ol className="list-decimal pl-5 space-y-2">
                           <li><strong>Count the Borrowed Bits:</strong> The difference between the new CIDR and the original CIDR is the number of bits you are "borrowing" from the host portion to create new subnet identifiers. In this case, 24 - 22 = <strong>2 bits</strong>.</li>
                           <li><strong>Calculate the Number of Subnets:</strong> The number of new subnets you can create is 2 raised to the power of the number of borrowed bits. Here, 2<sup>2</sup> = <strong>4 subnets</strong>.</li>
                           <li><strong>Calculate the New Subnet Size:</strong> The size of each new `/24` subnet is 2<sup>(32-24)</sup> = 2<sup>8</sup> = <strong>256 addresses</strong>.</li>
                           <li><strong>List the Subnets:</strong> Starting with the original network address, you simply add the new subnet size to find the start of each subsequent network.
                                <ul>
                                    <li>Subnet 1: <strong>172.16.0.0/24</strong> (Range: 172.16.0.0 - 172.16.0.255)</li>
                                    <li>Subnet 2: <strong>172.16.1.0/24</strong> (Range: 172.16.1.0 - 172.16.1.255)</li>
                                    <li>Subnet 3: <strong>172.16.2.0/24</strong> (Range: 172.16.2.0 - 172.16.2.255)</li>
                                    <li>Subnet 4: <strong>172.16.3.0/24</strong> (Range: 172.16.3.0 - 172.16.3.255)</li>
                                </ul>
                                 You can visualize the binary changes using our <Link href="/tools/ip-to-binary" className="text-primary hover:underline">IP to Binary Converter</Link>. Notice how the first two bits of the third octet are used to identify these four subnets.
                            </li>
                        </ol>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Modern Approach: VLSM</h3>
                        <p>While FLSM is straightforward, it can be inefficient. If one of your subnets only needs 10 hosts, giving it a `/26` subnet (62 usable IPs) wastes 52 addresses. This is where <strong>Variable-Length Subnet Masking (VLSM)</strong> comes in. VLSM allows you to create subnets of different sizes, tailored to the specific needs of each segment. This is the method used in modern network design to maximize IP address efficiency. For this more advanced and flexible approach, you should use our <Link href="/tools/vlsm-calculator" className="text-primary hover:underline">VLSM Calculator</Link>.</p>
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
                            <li><strong>Standardize Department Sizes:</strong> Use FLSM when you want to enforce a standard size for similar network segments, such as for each floor of a building or for each customer in a multi-tenant environment.</li>
                            <li><strong>Powers of Two:</strong> The number of subnets you can create will always be a power of two (2, 4, 8, 16, etc.), based on the number of bits you borrow.</li>
                            <li><strong>Documentation is Key:</strong> Once you generate a subnet list, copy it and save it in your network documentation. A clear IP plan is crucial for future troubleshooting and expansion.</li>
                            <li><strong>Start with the Right Block:</strong> Before you even begin, ensure your major network block is large enough for all your planned subnets. Use our <Link href="/tools/host-count-calculator" className="text-primary hover:underline">Host Count Calculator</Link> to check the total capacity of your starting block.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Choosing a New CIDR Smaller than the Original:</strong> This is the most common error. You cannot create smaller subnets by choosing a smaller CIDR number. For example, you cannot divide a /24 network into /22 subnets.</li>
                            <li><strong>Using the Wrong Starting Address:</strong> If you are given the block `192.168.10.0/22`, but you enter `192.168.10.1` as your starting point, your calculations will be based on a false premise. Always start with the correct network address for the major block.</li>
                            <li><strong>Miscalculating the Number of Subnets:</strong> Forgetting that the number of subnets is 2 to the power of the *difference* in CIDR values.</li>
                            <li><strong>Applying FLSM Where VLSM is Needed:</strong> Using this tool for a network where segments have vastly different host requirements (e.g., one needs 500 hosts and another needs 2) will result in massive IP address waste. Use the VLSM calculator for such scenarios.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Data Center Rack Allocation</h3>
                        <p className="text-sm text-muted-foreground">A data center administrator has been assigned the network block `10.40.128.0/20`. Each server rack requires a small subnet for its management interfaces, and every rack is identical. They decide to give each rack a `/28` subnet. Using this tool, they generate a complete list of the 256 possible `/28` subnets within their `/20` block. This list is then used to automate the configuration of each rack's top-of-rack switch.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Creating Lab Environments for Training</h3>
                        <p className="text-sm text-muted-foreground">A networking instructor is preparing a lab for a class of 30 students. The lab network is `172.16.0.0/23`. To give each student their own identical network to work in, the instructor needs to create 30 small subnets. They decide to give each student a `/28` network (14 usable hosts). Using the generator, they create a list of the 32 possible `/28` subnets and assign one to each student, printing out the list of network IDs and host ranges for the lab manual.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Branch Office IP Planning</h3>
                        <p className="text-sm text-muted-foreground">A company is opening 15 new small branch offices, and the network team has been allocated the `192.168.0.0/19` block for this purpose. Since all offices are of a similar size, they decide each one will get a `/24` network. They use this tool with the `/19` major network and `/24` new CIDR to generate a list of the 32 available `/24` subnets. They allocate the first 15 subnets from this list to the new offices and reserve the rest for future expansion.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Planning Firewall Policy Groups</h3>
                        <p className="text-sm text-muted-foreground">A security administrator needs to apply a specific security policy to a set of 8 identical servers that handle public-facing traffic. The servers are located in the `203.0.113.32/28` block. To simplify firewall rules, they use this tool to break the `/28` down into `/32`s, effectively just listing all the IPs. They then create a "server group" object in the firewall using this list, allowing them to apply a single rule to the group instead of 8 individual rules.</p>
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
                                    <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/vlsm-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">VLSM Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">For when you need subnets of different sizes. The modern, flexible way to subnet.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Analyze any single subnet from your generated list in greater detail.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-range-generator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP Range Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Generate a simple list of IPs between a start and end point without subnet calculations.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
