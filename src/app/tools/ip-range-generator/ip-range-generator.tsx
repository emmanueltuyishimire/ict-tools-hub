
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, ListRestart } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- IP Math Logic ---
const ipToLong = (ip: string): number | null => {
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) return null;
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3];
};

const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296;
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is an IP address range?", answer: "An IP address range is a contiguous block of IP addresses in a network. It is typically defined by a starting IP address and an ending IP address. For example, the range 192.168.1.1 to 192.168.1.254 includes all the addresses between those two points." },
    { question: "Why would I need to generate a list of IPs?", answer: "Generating a list of IPs is useful for many administrative and security tasks, such as creating configuration files for software, defining targets for a network scan, scripting bulk operations, setting up DHCP scopes, or creating whitelists/blacklists in a firewall." },
    { question: "What is the maximum number of IPs this tool can generate?", answer: "To maintain browser performance, this tool is limited to generating a maximum of 65,536 IP addresses (equivalent to a /16 network). If you enter a range larger than this, it will return an error." },
    { question: "Can I generate a range for IPv6 addresses?", answer: "No, this tool is specifically designed for IPv4 addresses. IPv6 uses a much larger, 128-bit address space, and generating a list of IPv6 addresses is generally not practical or necessary in the same way as for IPv4." },
    { question: "What is the difference between generating from a range and from a CIDR block?", answer: "Generating from a range (e.g., 10.0.0.5 to 10.0.0.20) gives you precise control over the start and end points. Generating from a CIDR block (e.g., 10.0.0.0/28) automatically creates a list of all usable host IPs within that specific subnet, which is useful for populating an entire network segment. You can analyze CIDR blocks with our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a>." },
    { question: "Does the generated list include the network and broadcast addresses?", answer: "By default, no. When generating from a CIDR block, the tool generates the 'usable host range,' which excludes the first (Network ID) and last (Broadcast) addresses as these cannot be assigned to devices. When generating from a start/end range, it includes all IPs within that specified boundary." },
    { question: "How can I use the generated list in a script?", answer: "Once the list is generated, you can click the 'Copy' button to copy all IP addresses to your clipboard. You can then paste this list directly into a text file or into a script (like a Bash or Python script) to loop through each IP and perform an action." },
    { question: "What are some common use cases for an IP range?", answer: "Common use cases include defining a DHCP server's address pool (the range of IPs it can hand out), setting up firewall rules to apply to a group of servers, configuring a network scanner to only probe specific devices, or creating an inventory list for network documentation." },
    { question: "Is it safe to enter my IP addresses here?", answer: "Yes. This tool is 100% client-side, meaning all calculations and generation happen entirely within your web browser. The IP addresses you enter are never sent to any server, ensuring your data remains private." },
    { question: "What happens if I enter an invalid IP address?", answer: "The tool includes validation and will show an error message if you enter an IP address that is not in the correct format (e.g., contains a number over 255 or doesn't have four octets). It will also show an error if the start IP address is higher than the end IP address." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a List of IP Addresses',
    description: 'A step-by-step guide to generating a list of IPv4 addresses from a CIDR block or a start/end range.',
    step: [
        { '@type': 'HowToStep', name: 'Choose Generation Method', text: 'Select the "CIDR" tab to generate from a network block or the "Range" tab to specify a start and end IP.' },
        { '@type': 'HowToStep', name: 'Enter Your Input', text: 'If using CIDR, enter the network address and prefix (e.g., 192.168.1.0 and /28). If using Range, enter the Start IP and End IP.' },
        { '@type': 'HowToStep', name: 'Generate the List', text: 'Click the "Generate IPs" button.' },
        { '@type': 'HowToStep', name: 'Review and Copy', text: 'The tool will display the total count of generated IPs and the full list in the text area below. Use the "Copy" button to copy the entire list to your clipboard.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'IP Range', definition: 'A continuous sequence of IP addresses, typically defined by a start and end address or a CIDR block.' },
    { term: 'CIDR Block', definition: 'A method of representing an IP network range using an IP address and a prefix length (e.g., 192.168.1.0/24).' },
    { term: 'Usable Host Range', definition: 'The subset of IPs within a CIDR block that can be assigned to devices, excluding the network and broadcast addresses.' },
    { term: 'DHCP Scope', definition: 'A defined range of IP addresses on a DHCP server that it is allowed to lease to client devices.' },
    { term: 'Whitelist/Blacklist', definition: 'A security practice where a list of permitted (whitelist) or blocked (blacklist) IP addresses is created to control access.' },
];

// --- Component ---
export function IpRangeGenerator() {
    const [mode, setMode] = useState<'cidr' | 'range'>('cidr');
    const [startIp, setStartIp] = useState('192.168.1.1');
    const [endIp, setEndIp] = useState('192.168.1.254');
    const [cidrIp, setCidrIp] = useState('10.10.0.0');
    const [cidr, setCidr] = useState('24');
    const [generatedIps, setGeneratedIps] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [hasCopied, setHasCopied] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);
    const MAX_IPS = 65536; // Limit to a /16 network

    const handleGenerate = () => {
        setError('');
        setGeneratedIps([]);

        let startLong, endLong;
        if (mode === 'range') {
            startLong = ipToLong(startIp);
            endLong = ipToLong(endIp);
            if (startLong === null || endLong === null) {
                setError('Invalid Start or End IP address format.');
                return;
            }
            if (startLong > endLong) {
                setError('Start IP address must be lower than End IP address.');
                return;
            }
        } else { // CIDR mode
            const cidrNum = parseInt(cidr, 10);
            if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
                setError('Invalid CIDR prefix. Must be between 0 and 32.');
                return;
            }
            const baseIpLong = ipToLong(cidrIp);
            if (baseIpLong === null) {
                setError('Invalid CIDR Network IP address format.');
                return;
            }
            const mask = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
            const networkLong = baseIpLong & mask;
            
            const totalHosts = Math.pow(2, 32 - cidrNum);
            if (totalHosts > MAX_IPS) {
                 setError(`The selected CIDR prefix /${cidrNum} creates a range larger than the maximum allowed size of ${MAX_IPS.toLocaleString()} addresses. Please choose a larger CIDR prefix (e.g., /17 or higher).`);
                return;
            }
            const broadcastLong = networkLong + totalHosts - 1;
            startLong = totalHosts > 2 ? networkLong + 1 : networkLong;
            endLong = totalHosts > 2 ? broadcastLong - 1 : broadcastLong;
        }

        const count = endLong - startLong + 1;
        if (count > MAX_IPS) {
            setError(`The selected range is too large. The maximum number of IPs that can be generated is ${MAX_IPS.toLocaleString()}.`);
            return;
        }

        const ips = [];
        for (let i = startLong; i <= endLong; i++) {
            ips.push(longToIp(i));
        }
        setGeneratedIps(ips);
    };
    
     useEffect(() => {
        if (generatedIps.length > 0 && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [generatedIps]);


    const handleCopyToClipboard = () => {
        if (generatedIps.length === 0) return;
        const textToCopy = generatedIps.join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 17 }, (_, i) => { // From /16 to /32
            const cidrVal = 32 - i;
            return { value: cidrVal.toString(), label: `/${cidrVal}` };
        }).reverse();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>IP Range Generator</CardTitle>
                    <CardDescription>Generate a list of IPs from a CIDR block or a specified start/end range.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="cidr">From CIDR</TabsTrigger>
                            <TabsTrigger value="range">From Range</TabsTrigger>
                        </TabsList>
                        <TabsContent value="cidr" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="cidr-ip">Network IP Address</Label>
                                    <Input id="cidr-ip" value={cidrIp} onChange={(e) => setCidrIp(e.target.value)} className="font-code" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cidr-prefix">CIDR Prefix</Label>
                                    <Select value={cidr} onValueChange={setCidr}>
                                        <SelectTrigger id="cidr-prefix"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {cidrOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="range" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start-ip">Start IP</Label>
                                    <Input id="start-ip" value={startIp} onChange={(e) => setStartIp(e.target.value)} className="font-code" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-ip">End IP</Label>
                                    <Input id="end-ip" value={endIp} onChange={(e) => setEndIp(e.target.value)} className="font-code" />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                     <div className="flex flex-col sm:flex-row gap-2 mt-6">
                        <Button onClick={handleGenerate} className="w-full sm:w-auto">Generate IPs</Button>
                        <Button onClick={() => { setGeneratedIps([]); setError('')}} variant="outline" className="w-full sm:w-auto"><ListRestart className="mr-2 h-4 w-4" /> Reset</Button>
                     </div>
                      {error && (
                        <Alert variant="destructive" role="alert" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {generatedIps.length > 0 && (
                <div ref={resultRef}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated IP List</CardTitle>
                            <CardDescription>
                                A total of {generatedIps.length.toLocaleString()} IP addresses were generated.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="relative">
                                <Textarea
                                    readOnly
                                    value={generatedIps.join('\n')}
                                    className="font-code h-64"
                                    aria-label="Generated IP Address List"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-2 top-2 h-8 w-8"
                                    onClick={handleCopyToClipboard}
                                    aria-label={hasCopied ? 'Copied' : 'Copy list'}
                                >
                                    {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the IP Range Generator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool is designed for network administrators, security professionals, and developers who need to generate lists of IP addresses for configuration, scripting, or documentation. It offers two flexible modes.</p>
                    <h4>Method 1: Generating from a CIDR Block</h4>
                    <ol>
                        <li><strong>Select the "From CIDR" Tab:</strong> This is the default mode, ideal for working with whole subnets.</li>
                        <li><strong>Enter the Network Address:</strong> Input the starting IP address of your subnet (e.g., <code className="font-code bg-muted p-1 rounded-sm">10.10.0.0</code>). The tool will automatically use the correct network ID based on the CIDR prefix.</li>
                        <li><strong>Choose the CIDR Prefix:</strong> Select the desired network size from the dropdown, from /16 to /32.</li>
                        <li><strong>Generate:</strong> Click "Generate IPs". The tool will calculate and list all *usable host addresses* within that subnet, excluding the network and broadcast addresses.</li>
                    </ol>
                    <h4>Method 2: Generating from a Start/End Range</h4>
                     <ol>
                        <li><strong>Select the "From Range" Tab:</strong> Choose this mode for generating a custom list between any two points.</li>
                        <li><strong>Enter Start and End IPs:</strong> Input the first IP address you want in your list in the "Start IP" field and the last IP in the "End IP" field.</li>
                        <li><strong>Generate:</strong> Click "Generate IPs". The tool will list every single IP address between and including the start and end points.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Copy Your Results</AlertTitle>
                        <AlertDescription>
                         Once your list is generated, use the "Copy" icon at the top-right of the results box to copy all IPs to your clipboard, ready to be pasted into a script, firewall configuration, or document.
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
                        <CardTitle className="text-primary">Educational Deep Dive: Working with IP Address Ranges</CardTitle>
                    </div>
                    <CardDescription>Understand why IP ranges are a fundamental building block of network management, from DHCP to security policies.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is an IP Address Range?</h3>
                        <p>An IP address range is simply a continuous sequence of IP addresses. In networking, we rarely deal with single IP addresses in isolation. Instead, we manage them in blocks or ranges. These ranges are the foundation for defining networks, assigning addresses to devices, and creating security rules. A range can be defined by a start and end point (e.g., `192.168.1.100` to `192.168.1.150`) or, more commonly, by a network address and a subnet mask (e.g., `192.168.1.0/24`), which implicitly defines a range from `192.168.1.0` to `192.168.1.255`. This tool helps you visualize and list out the individual addresses contained within those definitions.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Practical Applications of IP Ranges</h3>
                        <p>Generating a list of IPs isn't just an academic exercise. It's a common task for network professionals. Here are some of the most important use cases:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>DHCP Scopes:</strong> A DHCP (Dynamic Host Configuration Protocol) server is responsible for automatically assigning IP addresses to devices on a network. To do this, you must define a 'scope' or 'pool', which is an IP range that the server is allowed to lease out to clients. This generator can create the exact list of IPs for your scope documentation.</li>
                            <li><strong>Firewall Access Control Lists (ACLs):</strong> Firewalls are the gatekeepers of a network. A common firewall rule is to allow or deny traffic from a specific range of IP addresses. For example, you might create a rule to allow your internal monitoring server range (`10.0.50.10` - `10.0.50.20`) to access all other servers, while denying everyone else. This tool can help you list all IPs that would be affected by such a rule.</li>
                            <li><strong>Network Scanning and Inventory:</strong> Security administrators often need to scan a network for vulnerabilities or create an inventory of all active devices. Generating a list of all possible IPs in a subnet provides a target list for scanning tools like Nmap. This ensures no device is missed.</li>
                            <li><strong>Automated Scripting and Configuration:</strong> When deploying software or applying updates to a fleet of servers, system administrators often use scripts. Generating an IP list allows you to create a simple loop in a Bash or PowerShell script to perform an action on every machine in a specific range.</li>
                            <li><strong>Documentation:</strong> Clear network documentation is critical. Generating a list of all IPs in a subnet can be part of a comprehensive document that maps each IP to its device, owner, and purpose.</li>
                        </ul>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">Understanding CIDR vs. Start/End Ranges</h3>
                        <p>This tool provides two ways to generate IPs because they serve different purposes:</p>
                        <p><strong>CIDR (Classless Inter-Domain Routing)</strong> is the standard, most efficient way to define a network segment. When you generate IPs from a CIDR block like `10.20.30.0/29`, you are working with a complete subnet. The tool intelligently calculates the usable host range for you, excluding the first (Network ID) and last (Broadcast) addresses. This is perfect for when you need to list all assignable devices on a network. You can explore CIDR blocks in more detail with our <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>Subnet Calculator</Link>.</p>
                        <p>A **Start/End Range** is more specific and literal. If you enter `10.20.30.1` to `10.20.30.6`, it will generate only those six IPs. This is useful when you need a partial list from within a larger subnet, such as defining a small DHCP pool that only uses a portion of the available addresses, leaving the rest for static assignments.</p>
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
                            <li><strong>Scripting with the List:</strong> In Bash, you can save the copied list to a file (`ips.txt`) and loop through it easily: `for ip in $(cat ips.txt); do ping -c 1 $ip; done`.</li>
                            <li><strong>Define Firewall Groups:</strong> Copy the generated list and paste it into your firewall's "Address Group" or "Object Group" configuration. This allows you to reference the entire range with a single, human-readable name in your ACLs.</li>
                            <li><strong>Quick Inventory Check:</strong> Paste the generated list into a spreadsheet. Add columns for "Device Type," "Owner," and "Notes" to quickly build a network inventory document.</li>
                            <li><strong>Scanning a Subnet:</strong> Use the CIDR mode to generate all usable IPs in a subnet and feed the list to a network scanner to discover active hosts. For example, `nmap -iL ips.txt`.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Off-by-One Errors:</strong> Manually typing out an IP range and accidentally starting or ending on the wrong number, thereby including or excluding a device from your configuration. Always generate the list to be sure.</li>
                            <li><strong>Forgetting Reserved Addresses:</strong> When defining a DHCP scope from a CIDR block, remember that the first and last IPs are reserved. If you try to include them, it can cause network issues. Our CIDR generator handles this for you.</li>
                            <li><strong>Using the Wrong CIDR Prefix:</strong> Accidentally using /23 instead of /24 can double the size of your range, potentially causing overlaps with other networks if you're not careful. Double-check your subnet masks with our <Link href="/tools/subnet-mask-converter" className='text-primary hover:underline'>Subnet Mask Converter</Link>.</li>
                            <li><strong>Generating Huge Lists:</strong> Trying to generate a list for a very large range (like a /16) can crash your browser. This tool has a built-in limit to prevent this. For very large ranges, it's better to work with CIDR notation directly in your scripts or tools.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Configuring a DHCP Server</h3>
                        <p className="text-sm text-muted-foreground">A network admin is setting up a new guest Wi-Fi network on the `172.16.10.0/24` subnet. They want to reserve the first 20 IPs for static devices. They use the range generator to create a list from `172.16.10.21` to `172.16.10.254`, which they then configure as the DHCP address pool, ensuring no conflicts.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Creating a Security Scanner Target List</h3>
                        <p className="text-sm text-muted-foreground">A penetration tester is hired to assess the security of a company's web server farm, which resides in the `203.0.113.128/28` block. They use the CIDR mode to generate the list of all 14 usable IPs, save it to a file, and use it as a target list for their vulnerability scanner, ensuring a comprehensive and accurate scan.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Bulk-Adding DNS Records</h3>
                        <p className="text-sm text-muted-foreground">A sysadmin needs to create DNS A records for a new cluster of 50 servers that have been assigned IPs from `10.50.20.100` to `10.50.20.149`. They generate the list, paste it into a spreadsheet, and use formulas to create a script that automatically adds all 50 DNS records, saving hours of manual work.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Documenting Network Allocations</h3>
                        <p className="text-sm text-muted-foreground">During a network audit, an administrator needs to document every IP in the `192.168.100.0/24` subnet. They generate the full list of 254 usable IPs and use it as a checklist to ping each device, log its response, and record its purpose, creating a complete and accurate network inventory.</p>
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
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Analyze a CIDR block to find the network ID, broadcast address, and host count before generating the range.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/vlsm-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">VLSM Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Design an entire IP addressing scheme and then generate the IP lists for each calculated subnet.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-privacy-checker" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Public vs Private IP Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Verify if the IP range you are generating is part of the public or private address space.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
