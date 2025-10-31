
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Plus, Trash2, SlidersHorizontal, Network } from 'lucide-react';
import Link from 'next/link';

// --- IP Math Logic ---
const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
};

const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296;
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const findNeededCidr = (hosts: number): number => {
    const requiredBits = Math.ceil(Math.log2(hosts + 2));
    return 32 - requiredBits;
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is VLSM?", answer: "VLSM (Variable Length Subnet Masking) is a technique that allows network administrators to divide an IP address space into subnets of different sizes. Unlike traditional subnetting where all subnets are the same size, VLSM minimizes IP address waste by tailoring the subnet size to the specific host requirements of that subnet." },
    { question: "How is VLSM different from traditional subnetting?", answer: "In traditional (or 'fixed-length') subnetting, if you decide to create four subnets from a major network, all four subnets will have the exact same size and host capacity. With VLSM, you can create subnets of varying sizes from that same major network. For example, you can create one large subnet for 100 users, a smaller one for 25 users, and several tiny ones for point-to-point WAN links, all from the same original block." },
    { question: "Why should I sort my subnets from largest to smallest?", answer: "This is the cardinal rule of VLSM. By allocating the largest blocks of IP addresses first, you ensure that there is a contiguous block of address space large enough to satisfy the request. If you allocate smaller subnets first, you might fragment the address space, leaving you with multiple small, unused blocks that cannot be combined to fit a larger subnet requirement later." },
    { question: "What does 'Address Space Exhausted' mean?", answer: "This error means that the major network block you started with is not large enough to accommodate all of the subnet requests you have entered. You either need to reduce the number of hosts required for your subnets or start with a larger major network (i.e., one with a smaller CIDR prefix, like /23 instead of /24)." },
    { question: "Can a subnet have 0 usable hosts?", answer: "Yes. A subnet with a /31 mask has a total of 2 addresses, and both are considered usable for point-to-point links (as per RFC 3021), so there are 0 'hosts' in the traditional sense. A /32 subnet has only 1 address, which is the network address itself, and is used to specify a single host route. Our calculator accounts for this, showing 0 usable hosts for these cases." },
    { question: "What happens to the leftover IP addresses?", answer: "After the VLSM calculation is complete, any remaining IP address space within the major network that was not allocated to a subnet is considered 'unallocated'. This space can be reserved for future growth or used for new subnets later, as long as there is a large enough contiguous block to meet the new requirement." },
    { question: "Is it better to use a /30 or a /31 for a WAN link?", answer: "Traditionally, a /30 was used, providing 4 total IPs (2 usable for devices, 1 for network ID, 1 for broadcast). However, modern best practice (RFC 3021) recommends using a /31 for point-to-point links. A /31 provides 2 total IPs, both of which are assigned to the devices, eliminating waste from network and broadcast addresses that are unnecessary on a link with only two endpoints." },
    { question: "How do I calculate the required CIDR for a number of hosts?", answer: "You need to find the smallest power of 2 that is greater than or equal to the number of hosts plus two (for the network and broadcast addresses). For example, for 30 hosts, you need 30+2=32 addresses. 2^5 = 32. So you need 5 host bits. Since an IPv4 address has 32 bits total, the network portion will be 32 - 5 = 27 bits. Therefore, you need a /27 subnet." },
    { question: "Does this calculator work for IPv6?", answer: "No, this calculator is designed exclusively for IPv4. IPv6 uses a 128-bit address space and a similar concept of subnetting with prefix lengths, but the calculations and terminology are different. IPv6 does not use VLSM in the same way as IPv4." },
    { question: "What is 'route summarization' and how does VLSM relate to it?", answer: "Route summarization (or supernetting) is the process of combining multiple smaller network routes into a single, more general route. VLSM is the process of breaking a network down, while summarization is the process of building it back up. A well-designed VLSM scheme makes route summarization more effective, which can significantly reduce the size of routing tables and improve router performance." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the VLSM Calculator',
    description: 'A step-by-step guide to designing an efficient IP address plan using Variable Length Subnet Masking.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Major Network', text: 'Input the main network IP address and CIDR prefix you want to divide (e.g., 172.16.0.0/22).' },
        { '@type': 'HowToStep', name: 'Define Subnets', text: 'For each required subnet, enter a descriptive name (e.g., "Engineering LAN") and the number of hosts it needs to support. Use the "Add Subnet" button to create more entries.' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Design Network" button. The calculator will automatically sort your requests from largest to smallest and allocate the most efficient subnets.' },
        { '@type': 'HowToStep', name: 'Review the Allocation Table', text: 'The results table will show the allocated details for each subnet, including its assigned network ID, usable host range, broadcast address, and subnet mask. Any unallocated space will also be shown.' },
        { '@type': 'HowToStep', name: 'Copy Information', text: 'Use the copy buttons within the results table to easily copy any piece of information you need for your documentation or device configuration.' }
    ],
    totalTime: 'PT3M',
};

type SubnetRequest = { id: number; name: string; hosts: number | '' };
type CalculatedSubnet = {
    name: string;
    hosts_needed: number;
    hosts_found: number;
    cidr: number;
    network_id: string;
    host_range: string;
    broadcast_id: string;
    subnet_mask: string;
};

export function VlsmCalculator() {
    const [majorNetwork, setMajorNetwork] = useState('192.168.0.0');
    const [majorCidr, setMajorCidr] = useState('24');
    const [subnetRequests, setSubnetRequests] = useState<SubnetRequest[]>([
        { id: 1, name: 'LAN A (Staff)', hosts: 55 },
        { id: 2, name: 'LAN B (Servers)', hosts: 20 },
        { id: 3, name: 'LAN C (Guests)', hosts: 12 },
        { id: 4, name: 'WAN Link 1', hosts: 2 },
    ]);
    const [results, setResults] = useState<{ allocated: CalculatedSubnet[], unallocated: any[] } | null>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    let nextId = 5;

    const handleCalculate = () => {
        setError('');
        setResults(null);

        const baseIpLong = ipToLong(majorNetwork);
        if (baseIpLong === null) {
            setError('Invalid Major Network IP address format.');
            return;
        }

        const cidrNum = parseInt(majorCidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            setError('Invalid Major Network CIDR prefix.');
            return;
        }
        
        // Check if base IP is actually the network address for that CIDR
        const mask = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
        if ((baseIpLong & mask) !== baseIpLong) {
            setError(`The IP ${majorNetwork} is not the network address for a /${cidrNum} network. Use ${longToIp(baseIpLong & mask)} instead.`);
            return;
        }

        const sortedRequests = [...subnetRequests]
            .filter(req => req.hosts && req.hosts > 0)
            .sort((a, b) => (b.hosts as number) - (a.hosts as number));
        
        if (sortedRequests.length === 0) {
            setError('Please define at least one subnet with required hosts.');
            return;
        }

        const allocated: CalculatedSubnet[] = [];
        let currentIp = baseIpLong;
        const endIp = currentIp + Math.pow(2, 32 - cidrNum);
        
        for (const req of sortedRequests) {
            const hostsNeeded = req.hosts as number;
            const requiredCidr = findNeededCidr(hostsNeeded);
            const subnetSize = Math.pow(2, 32 - requiredCidr);

            if (currentIp + subnetSize > endIp) {
                setError(`Address space exhausted. Cannot allocate a /${requiredCidr} subnet for "${req.name}".`);
                setResults({ allocated, unallocated: [] });
                return;
            }

            const networkId = currentIp;
            const broadcastId = currentIp + subnetSize - 1;
            
            allocated.push({
                name: req.name,
                hosts_needed: hostsNeeded,
                hosts_found: subnetSize > 2 ? subnetSize - 2 : (subnetSize === 2 ? 2 : 0),
                cidr: requiredCidr,
                network_id: longToIp(networkId),
                host_range: subnetSize > 1 ? `${longToIp(networkId + 1)} - ${longToIp(broadcastId - 1)}` : (subnetSize === 1 ? longToIp(networkId) : 'N/A'),
                broadcast_id: longToIp(broadcastId),
                subnet_mask: longToIp((0xFFFFFFFF << (32 - requiredCidr)) >>> 0),
            });

            currentIp += subnetSize;
        }
        
        // Rudimentary unallocated space calculation
        const unallocated = [];
        if (currentIp < endIp) {
            unallocated.push({
                start: longToIp(currentIp),
                end: longToIp(endIp - 1),
                size: endIp - currentIp,
            })
        }

        setResults({ allocated, unallocated });
    };
    
    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const handleAddSubnet = () => {
        setSubnetRequests([...subnetRequests, { id: nextId++, name: '', hosts: '' }]);
    };
    
    const handleRemoveSubnet = (id: number) => {
        setSubnetRequests(subnetRequests.filter(req => req.id !== id));
    };

    const handleSubnetChange = (id: number, field: 'name' | 'hosts', value: string) => {
        const newRequests = subnetRequests.map(req => {
            if (req.id === id) {
                return { ...req, [field]: field === 'hosts' ? (value === '' ? '' : parseInt(value, 10)) : value };
            }
            return req;
        });
        setSubnetRequests(newRequests);
    };

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const cidrOptions = Array.from({ length: 31 }, (_, i) => ({ value: (i).toString(), label: `/${i}` })).reverse();


    return (
        <div className="max-w-5xl mx-auto space-y-12">
             <StructuredData data={faqSchema} />
             <StructuredData data={howToSchema} />
             <Card>
                <CardHeader>
                    <CardTitle>VLSM Calculator</CardTitle>
                    <CardDescription>
                        Define your major network and subnet requirements to generate an efficient IP addressing plan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-4 rounded-lg">
                         <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="major-network">Major Network Address</Label>
                            <Input
                                id="major-network"
                                value={majorNetwork}
                                onChange={(e) => setMajorNetwork(e.target.value)}
                                placeholder="e.g., 10.0.0.0"
                                className="font-code"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="major-cidr">Major Network CIDR</Label>
                             <Select value={majorCidr} onValueChange={setMajorCidr}>
                                <SelectTrigger id="major-cidr"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {cidrOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <Label>Subnet Requirements</Label>
                        {subnetRequests.map((req, index) => (
                            <div key={req.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                                <div className="sm:col-span-6">
                                     <Input
                                        value={req.name}
                                        onChange={(e) => handleSubnetChange(req.id, 'name', e.target.value)}
                                        placeholder={`Subnet ${index + 1} Name (e.g., Finance Dept)`}
                                    />
                                </div>
                                <div className="sm:col-span-5">
                                    <Input
                                        type="number"
                                        value={req.hosts}
                                        onChange={(e) => handleSubnetChange(req.id, 'hosts', e.target.value)}
                                        placeholder="Required Hosts (e.g., 25)"
                                    />
                                </div>
                                 <div className="sm:col-span-1">
                                    <Button size="icon" variant="ghost" onClick={() => handleRemoveSubnet(req.id)} aria-label="Remove Subnet">
                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                         <Button variant="outline" size="sm" onClick={handleAddSubnet}><Plus className="mr-2 h-4 w-4" /> Add Subnet</Button>
                    </div>

                    <Button onClick={handleCalculate} className="w-full sm:w-auto"><Network className="mr-2 h-4 w-4" /> Design Network</Button>
                    
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
                            <CardTitle>VLSM Allocation Plan</CardTitle>
                            <CardDescription>
                                The following IP address plan has been generated based on your requirements.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Subnet Name</TableHead>
                                            <TableHead className='text-right'>Hosts Needed</TableHead>
                                            <TableHead className='text-right'>Hosts Found</TableHead>
                                            <TableHead>Network ID</TableHead>
                                            <TableHead>Usable Range</TableHead>
                                            <TableHead>Broadcast ID</TableHead>
                                            <TableHead>Mask</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.allocated.map((subnet, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{subnet.name}</TableCell>
                                                <TableCell className='text-right'>{subnet.hosts_needed}</TableCell>
                                                <TableCell className='text-right'>{subnet.hosts_found}</TableCell>
                                                <TableCell className="font-code">{subnet.network_id}/{subnet.cidr}</TableCell>
                                                <TableCell className="font-code">{subnet.host_range}</TableCell>
                                                <TableCell className="font-code">{subnet.broadcast_id}</TableCell>
                                                <TableCell className="font-code">{subnet.subnet_mask}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                              {results.unallocated.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-bold mb-2">Unallocated Address Space</h4>
                                    {results.unallocated.map((block, i) => (
                                        <Alert key={i}>
                                            <Lightbulb className="h-4 w-4" />
                                            <AlertTitle>Available for Future Use</AlertTitle>
                                            <AlertDescription>
                                                The range <code className="font-code bg-muted p-1 rounded-sm">{block.start} - {block.end}</code> ({block.size} addresses) remains unallocated.
                                            </AlertDescription>
                                        </Alert>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the VLSM Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>Variable Length Subnet Masking (VLSM) is a powerful technique for designing efficient and scalable IP networks. This tool automates the entire process.</p>
                    <ol>
                        <li><strong>Enter the Major Network:</strong> Start with the total IP address block assigned to you. Enter the network address (e.g., <code className="font-code bg-muted p-1 rounded-sm">172.16.0.0</code>) and its CIDR prefix (e.g., <code className="font-code bg-muted p-1 rounded-sm">/22</code>). The calculator will validate that you've entered a valid network address for that CIDR.</li>
                        <li><strong>Define Your Subnet Needs:</strong> For each separate network segment you need (e.g., a department, a server farm, a WAN link), add a new entry. Give it a descriptive name and specify the exact number of hosts (devices) it must support.</li>
                        <li><strong>Add and Remove as Needed:</strong> Use the "+ Add Subnet" button to create new rows. If you make a mistake, use the trash can icon to remove a requirement.</li>
                        <li><strong>Design the Network:</strong> Click the "Design Network" button. The calculator will perform the VLSM algorithm: it sorts your requirements from largest to smallest and allocates the most appropriately sized subnet for each one from the major network block.</li>
                        <li><strong>Analyze the Results:</strong> The results table shows your complete IP plan. For each subnet, you'll see the assigned Network ID, the CIDR, the usable range of IPs for your devices, the broadcast address, and the subnet mask. Any leftover address space is also shown, available for future expansion.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example Scenario</AlertTitle>
                        <AlertDescription>
                          Try calculating a plan for a major network of <code className="font-code bg-muted p-1 rounded-sm">10.10.0.0/16</code> with three requirements: Corp HQ (1000 hosts), Branch Office (200 hosts), and a WAN link (2 hosts). The calculator will correctly allocate a /22 for HQ, a /24 for the branch, and a /30 (or /31) for the WAN link, assigning them sequential network IDs.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>

             <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: Mastering VLSM</CardTitle>
                    </div>
                    <CardDescription>Go beyond fixed-size networks and learn how to allocate IP addresses with precision and foresight.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">The Problem with "One Size Fits All" Networking</h3>
                        <p>Imagine you have a large block of IP addresses, say a /24 network with 256 addresses. You need to create four separate networks for four departments. With traditional, fixed-length subnetting, you would divide the /24 into four /26 subnets. Each of these four subnets would contain 64 addresses (62 usable). This works perfectly if each department needs around 50-60 devices. But what if the reality is different? What if your Engineering department needs 50 hosts, Sales needs 20, Marketing needs 10, and you have two WAN links that only need 2 hosts each? </p>
                        <p>With fixed-length subnetting, you'd be forced to give each of these segments a /26 subnet. The WAN links would each get a block of 64 addresses, but only use 2—wasting 62 addresses per link. Marketing would get 64 addresses and waste 54. This is the core problem that Variable Length Subnet Masking (VLSM) was designed to solve. It breaks the rigid rule that all subnets must be the same size, allowing you to create a network plan that is precisely tailored to your needs, thereby minimizing waste and maximizing efficiency. It’s the difference between buying a one-size-fits-all t-shirt for your entire family versus buying everyone a shirt that actually fits them.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The VLSM Algorithm: A Step-by-Step Guide</h3>
                        <p>VLSM follows a simple but strict algorithm to ensure that address space is not fragmented, which would prevent larger subnets from being allocated. The cardinal rule is: **Always allocate the largest subnets first.**</p>
                        <p>Let's walk through a manual calculation for a major network of <strong>192.168.10.0/24</strong> with these requirements:</p>
                         <ul className="list-disc pl-5">
                            <li><strong>LAN A:</strong> 100 hosts</li>
                            <li><strong>LAN B:</strong> 50 hosts</li>
                            <li><strong>LAN C:</strong> 10 hosts</li>
                            <li><strong>WAN 1:</strong> 2 hosts</li>
                        </ul>
                        <ol className="list-decimal pl-5 space-y-2 mt-4">
                           <li><strong>Sort Requirements:</strong> First, order the requests from largest to smallest number of hosts: LAN A (100), LAN B (50), LAN C (10), WAN 1 (2).</li>
                           <li>
                                <strong>Allocate for LAN A (100 hosts):</strong>
                                <ul>
                                    <li>We need to find the smallest power of 2 that is >= 100 + 2. That's 128 (2<sup>7</sup>).</li>
                                    <li>This means we need 7 bits for the host portion.</li>
                                    <li>The subnet mask will have 32 - 7 = 25 network bits. This is a <strong>/25</strong> mask.</li>
                                    <li><strong>Allocation:</strong> The first available address is 192.168.10.0. This subnet will occupy addresses from 192.168.10.0 to 192.168.10.127.</li>
                                </ul>
                           </li>
                           <li>
                                <strong>Allocate for LAN B (50 hosts):</strong>
                                <ul>
                                    <li>We need 50 + 2 = 52 addresses. The smallest power of 2 >= 52 is 64 (2<sup>6</sup>).</li>
                                    <li>This requires 6 host bits, meaning a 32 - 6 = <strong>/26</strong> mask.</li>
                                    <li>The next available address after our first block is 192.168.10.128.</li>
                                    <li><strong>Allocation:</strong> This subnet will occupy addresses from 192.168.10.128 to 192.168.10.191.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Allocate for LAN C (10 hosts):</strong>
                                <ul>
                                    <li>We need 10 + 2 = 12 addresses. The smallest power of 2 >= 12 is 16 (2<sup>4</sup>).</li>
                                    <li>This requires 4 host bits, meaning a 32 - 4 = <strong>/28</strong> mask.</li>
                                    <li>The next available address is 192.168.10.192.</li>
                                    <li><strong>Allocation:</strong> This subnet will occupy addresses from 192.168.10.192 to 192.168.10.207.</li>
                                </ul>
                            </li>
                             <li>
                                <strong>Allocate for WAN 1 (2 hosts):</strong>
                                <ul>
                                    <li>We need 2 + 2 = 4 addresses. The smallest power of 2 >= 4 is 4 (2<sup>2</sup>).</li>
                                    <li>This requires 2 host bits, meaning a 32 - 2 = <strong>/30</strong> mask.</li>
                                    <li>The next available address is 192.168.10.208.</li>
                                    <li><strong>Allocation:</strong> This subnet will occupy addresses from 192.168.10.208 to 192.168.10.211.</li>
                                </ul>
                            </li>
                            <li><strong>Unallocated Space:</strong> Our original /24 network ends at 192.168.10.255. Our last allocation ended at 192.168.10.211. This means the range from 192.168.10.212 to 192.168.10.255 is still free for future use.</li>
                        </ol>
                        <p>This process, while logical, can be tedious and prone to error. That's why our VLSM calculator is an indispensable tool for network designers.</p>
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
                            <li><strong>Plan for Growth:</strong> When entering host requirements, don't use the exact number of current devices. Add a buffer (e.g., 20-30% growth) to avoid having to re-address your network in six months.</li>
                            <li><strong>Document Everything:</strong> Use the "Name" field to be descriptive (e.g., "Building A - 3rd Floor WiFi", "Core Router Link"). A good VLSM plan is a critical piece of network documentation.</li>
                            <li><strong>Use /31 for WAN Links:</strong> For point-to-point links between two routers, modern best practice is to use a /31 subnet (2 hosts required). This saves IP addresses compared to the traditional /30. Our calculator handles this correctly.</li>
                            <li><strong>Summarize for Efficiency:</strong> After designing your VLSM scheme, think about route summarization. A well-planned VLSM design allows you to aggregate many specific routes into one general route at higher levels of your network, which dramatically improves router performance.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Not Sorting by Size:</strong> The most critical mistake. If you allocate a small subnet from the beginning of your address block, you can fragment the space and make it impossible to fit a larger subnet later, even if you technically have enough free addresses.</li>
                            <li><strong>Incorrect Host Calculation:</strong> Forgetting to add 2 (for the network and broadcast addresses) when determining the required block size. If you need 30 hosts, you must find a block size >= 32, not 30.</li>
                            <li><strong>Starting with an Invalid Network Address:</strong> Inputting a major network IP that isn't a valid network address for its CIDR (e.g., 192.168.0.100/24). The calculator will flag this error, but it's a common manual mistake. Use our <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>Subnet Calculator</Link> to find the correct starting address if you're unsure.</li>
                             <li><strong>Overlapping Subnets:</strong> A manual calculation error where the start of a new subnet is placed within the range of a previously allocated one. This leads to IP conflicts and network failure. Our tool prevents this by design.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Campus Network Design</h3>
                        <p className="text-sm text-muted-foreground">A university IT department is given the `10.50.0.0/16` block. They need to create networks for different faculties, labs, and administrative buildings, each with vastly different numbers of users. Using the VLSM calculator, they can create a `/19` for the large student WiFi network, a `/22` for the main library, smaller `/25` subnets for each academic department, and tiny `/30` links for router connections, all from the same initial block, ensuring every IP address is used efficiently.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Cloud VPC Networking</h3>
                        <p className="text-sm text-muted-foreground">A cloud engineer is designing a Virtual Private Cloud (VPC) in AWS or Azure. They plan to have a public subnet for web servers (10 hosts), an application subnet for backend servers (50 hosts), and a database subnet for managed databases (5 hosts). By plugging these requirements into the VLSM calculator with their main VPC CIDR block, they can generate a precise, non-overlapping IP plan to configure in their cloud environment, enhancing security and organization.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">ISP Customer Allocation</h3>
                        <p className="text-sm text-muted-foreground">An Internet Service Provider (ISP) needs to allocate public IP address blocks to its business customers. Customer A needs 8 static IPs, Customer B needs 13, and Customer C needs 2. The ISP uses a VLSM plan to carve out a `/28` block (14 usable IPs) for Customer B, a `/29` block (6 usable IPs) for Customer A, and a `/30` block (2 usable IPs) for Customer C, ensuring that public IPv4 addresses, a scarce resource, are not wasted.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Preparing for a Certification Exam</h3>
                        <p className="text-sm text-muted-foreground">A student studying for the CCNA or Network+ certification encounters a complex VLSM problem. They use the calculator to quickly generate the correct answer, then work backward through the manual step-by-step process to understand the logic. This allows them to check their work and solidify their understanding of the VLSM algorithm under exam-like pressure.</p>
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
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Analyze a single subnet in detail. A great first step before designing a VLSM scheme.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                     <Link href="/tools/subnet-mask-converter" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Mask Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Quickly convert between CIDR, subnet masks, and wildcard masks to understand the numbers behind VLSM.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Visualize IP addresses in binary to fully grasp how subnetting and VLSM manipulate bits.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
