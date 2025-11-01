
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Search, Lock, Globe, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

// --- IP Logic ---
const ipToLong = (ip: string): number | null => {
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) return null;
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3];
};

const checkIpPrivacy = (ip: string) => {
    const ipLong = ipToLong(ip);
    if (ipLong === null) {
        return { type: 'Invalid', message: 'Invalid IPv4 address format.' };
    }

    // RFC 1918 private ranges
    const isClassA = ipLong >= 167772160 && ipLong <= 184549375; // 10.0.0.0 - 10.255.255.255
    const isClassB = ipLong >= 2886729728 && ipLong <= 2887778303; // 172.16.0.0 - 172.31.255.255
    const isClassC = ipLong >= 3232235520 && ipLong <= 3232301055; // 192.168.0.0 - 192.168.255.255
    
    // RFC 3927 link-local range
    const isLinkLocal = ipLong >= 2851995648 && ipLong <= 2852061183; // 169.254.0.0 - 169.254.255.255
    
    // RFC 5737 documentation ranges
    const isTestNet1 = ipLong >= 3232235776 && ipLong <= 3232236031; // 192.0.2.0/24
    const isTestNet2 = ipLong >= 3325256704 && ipLong <= 3325256959; // 198.51.100.0/24
    const isTestNet3 = ipLong >= 3405803776 && ipLong <= 3405804031; // 203.0.113.0/24
    
    const isLoopback = ipLong >= 2130706432 && ipLong <= 2130706687; // 127.0.0.0/8

    if (isClassA || isClassB || isClassC) {
        return { type: 'Private', message: 'This is a private IP address, commonly used within a local network (LAN). It is not routable on the public internet.', icon: Lock };
    }
    if (isLinkLocal) {
        return { type: 'Link-Local', message: 'This is a link-local address (APIPA), automatically assigned when a device cannot reach a DHCP server.', icon: AlertTriangle };
    }
    if(isLoopback) {
        return { type: 'Loopback', message: 'This is a loopback address, used by a device to refer to itself (localhost).', icon: AlertTriangle };
    }
     if(isTestNet1 || isTestNet2 || isTestNet3) {
        return { type: 'Documentation/Test', message: 'This IP address is reserved for use in documentation and examples (TEST-NET).', icon: BookOpen };
    }

    return { type: 'Public', message: 'This is a public IP address, reachable from anywhere on the internet.', icon: Globe };
};


// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is the main difference between a public and a private IP address?", answer: "A public IP address is a globally unique address assigned by an Internet Service Provider (ISP) that is directly accessible from the internet. A private IP address is a non-unique address used within a local network (like your home Wi-Fi) and is not reachable from the outside world. To communicate with the internet, a device with a private IP must go through a router using NAT." },
    { question: "How can multiple devices in my home use the internet with only one public IP?", answer: "This is possible thanks to Network Address Translation (NAT). Your router is assigned one public IP address by your ISP. It then creates a private network and assigns a unique private IP address to each of your devices (laptops, phones, etc.). When a device sends a request to the internet, the router translates the private source IP to its public IP, keeps track of the connection, and directs the response back to the correct private device." },
    { question: "Is my private IP address a security risk?", answer: "By itself, no. A private IP address is not routable on the internet, so attackers cannot connect to it directly. Security risks arise when your router's firewall is misconfigured (e.g., unnecessary ports are opened) or when a device on your private network is compromised by malware, which can then initiate outbound connections." },
    { question: "What are the private IP address ranges (RFC 1918)?", answer: "The Internet Engineering Task Force (IETF) has reserved three blocks of the IP address space for private networks: 10.0.0.0 to 10.255.255.255 (10.0.0.0/8), 172.16.0.0 to 172.31.255.255 (172.16.0.0/12), and 192.168.0.0 to 192.168.255.255 (192.168.0.0/16)." },
    { question: "What is an APIPA or link-local address?", answer: "APIPA (Automatic Private IP Addressing) is a feature where a device self-assigns an IP address from the 169.254.0.0 to 169.254.255.255 range if it cannot contact a DHCP server to be assigned an address. These are also known as link-local addresses and are only usable for communication on the immediate local network segment." },
    { question: "What is a loopback address?", answer: "The entire 127.0.0.0/8 block is reserved for loopback. The most common loopback address is 127.0.0.1, also known as 'localhost'. It's a special address that a computer uses to send network traffic to itself, which is very useful for testing applications and services without needing a physical network connection." },
    { question: "Why do I see a different IP when I search 'What is my IP' on Google?", answer: "When you search on Google, it shows you your public IP address—the address your router presents to the world. The IP address shown in your computer's network settings is your private IP address, assigned by your router. This tool can check both types." },
    { question: "Can a private IP address be the same as someone else's?", answer: "Yes. Since private IPs are only for local use, the same `192.168.1.100` address can be used simultaneously on millions of different home and office networks around the world without conflict. However, within a single local network, every device must have a unique private IP address." },
    { question: "Do I need a public IP address for my web server?", answer: "For a web server to be accessible to the public internet, it must have a public IP address. If your server is on a private network, you would need to configure your router with 'port forwarding' to direct incoming traffic (e.g., on port 443) from the public IP to the server's private IP." },
    { question: "Is it safe to share my public IP address?", answer: "It's generally safe, as it's visible to every website you visit. However, a persistent public IP can be used to target your network in attacks. It's best not to post it publicly on forums or social media. Dynamic IPs, which change periodically, offer slightly more anonymity." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check if an IP Address is Public or Private',
    description: 'A step-by-step guide to determining the type of an IPv4 address.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the IP Address', text: 'Type or paste the IPv4 address you want to check into the input field.' },
        { '@type': 'HowToStep', name: 'Review the Instant Result', text: 'The tool will immediately analyze the IP and display a card indicating whether it is Public, Private, Link-Local, or another special type.' },
        { '@type': 'HowToStep', name: 'Read the Explanation', text: 'The result card includes a brief explanation of what that IP type means and how it is used in networking.' },
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'Public IP', definition: 'A globally unique, internet-routable address assigned by an ISP.' },
    { term: 'Private IP', definition: 'An address from a reserved range (RFC 1918) for use within a local network only. Not routable on the internet.' },
    { term: 'NAT (Network Address Translation)', definition: 'A router function that translates private IPs to a public IP, allowing multiple devices to share one public address.' },
    { term: 'Link-Local Address (APIPA)', definition: 'An automatically self-assigned address from the 169.254.x.x range when a DHCP server is unavailable.' },
    { term: 'Loopback Address', definition: 'A special address (127.x.x.x) that a device uses to send traffic to itself (localhost).' },
    { term: 'ISP (Internet Service Provider)', definition: 'A company that provides internet access to customers and assigns public IP addresses.' },
];

// --- Component ---
export function IpPrivacyChecker() {
    const [ipAddress, setIpAddress] = useState('172.16.10.30');
    const result = useMemo(() => checkIpPrivacy(ipAddress), [ipAddress]);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>Public vs. Private IP Checker</CardTitle>
                    <CardDescription>Enter any IPv4 address to instantly determine if it is public, private, or reserved.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ip-input">IP Address</Label>
                        <Input
                            id="ip-input"
                            type="text"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            placeholder="e.g., 10.0.0.1"
                            className="font-code"
                            aria-label="IP Address Input"
                        />
                    </div>
                     {ipAddress.length > 0 && result && (
                         <Alert className={
                             result.type === 'Public' ? 'border-blue-500/50' : 
                             result.type === 'Private' ? 'border-green-500/50' : 
                             'border-yellow-500/50'
                            }>
                            {result.icon && <result.icon className={`h-4 w-4 ${
                                result.type === 'Public' ? 'text-blue-600' : 
                                result.type === 'Private' ? 'text-green-600' :
                                'text-yellow-600'
                            }`} />}
                             <AlertTitle className={`font-bold ${
                                result.type === 'Public' ? 'text-blue-700' : 
                                result.type === 'Private' ? 'text-green-700' :
                                'text-yellow-700'
                             }`}>{result.type} IP Address</AlertTitle>
                             <AlertDescription>
                                {result.message}
                             </AlertDescription>
                         </Alert>
                     )}
                </CardContent>
            </Card>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the IP Privacy Checker</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>Understanding the nature of an IP address is a fundamental networking skill. This tool makes it simple.</p>
                    <ol>
                        <li><strong>Enter an IP Address:</strong> Type or paste any valid IPv4 address into the input field.</li>
                        <li><strong>Get Instant Feedback:</strong> As you type, the tool analyzes the address in real time.</li>
                        <li><strong>Review the Result:</strong> A status card will immediately appear below the input, clearly labeling the IP address as `Public`, `Private`, `Link-Local`, `Loopback`, or `Documentation/Test`.</li>
                        <li><strong>Read the Explanation:</strong> Each result comes with a concise explanation describing what that IP type means and its role in networking, helping you understand the "why" behind the result.</li>
                    </ol>
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example Scenarios</AlertTitle>
                        <AlertDescription>
                         Try entering `192.168.1.1` to see a typical private IP. Then, try `8.8.8.8` to see a public IP. You can also test special cases like `127.0.0.1` (Loopback) or `169.254.10.20` (Link-Local/APIPA).
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
                        <CardTitle className="text-primary">Educational Deep Dive: The Two Worlds of IP Addressing</CardTitle>
                    </div>
                    <CardDescription>From your home network to the global internet, understand the crucial distinction between public and private IP addresses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is an IP Address? The Internet's Postal System</h3>
                        <p>An IP (Internet Protocol) address is a unique numerical label assigned to every device on a computer network. It serves two primary functions: identifying the host or network interface and providing the location of the host in the network. In simple terms, it's like a postal address for your computer, allowing it to send and receive data packets across the internet. But not all addresses are created equal; they are split into two fundamental types: public and private.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Public IP Addresses: Your Gateway to the World</h3>
                        <p>A <strong>public IP address</strong> is a globally unique address that is assigned to a device by an Internet Service Provider (ISP). Think of it as the official, registered street address of your house. It is directly accessible and routable on the global internet. When you visit a website, your request is sent from your public IP address. Key characteristics include:</p>
                        <ul className="list-disc pl-5">
                           <li><strong>Global Uniqueness:</strong> No two devices on the internet can have the same public IP address at the same time.</li>
                           <li><strong>Assigned by ISP:</strong> You don't choose your public IP; your ISP assigns it to your router.</li>
                           <li><strong>Internet Routable:</strong> It can be used to communicate with any other public IP address in the world.</li>
                           <li><strong>Visibility:</strong> It's the address that websites, online games, and other internet services see when you connect to them.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Private IP Addresses: The Heart of Your Local Network</h3>
                        <p>A <strong>private IP address</strong> is an address used within a closed, local area network (LAN), such as your home, school, or office Wi-Fi network. It is not routable on the public internet. Think of it as the room number inside a large office building. You can't send a letter directly to "Office #301" from outside; you have to send it to the building's main address first. The IETF reserved specific ranges (defined in RFC 1918) for this purpose.</p>
                        <p>Key characteristics include:</p>
                         <ul className="list-disc pl-5">
                           <li><strong>Local Scope:</strong> It is only unique and meaningful within its own local network.</li>
                           <li><strong>Non-Routable:</strong> Internet routers are configured to ignore traffic originating from or destined for private IP addresses.</li>
                           <li><strong>Reusable:</strong> The same private IP address (e.g., `192.168.1.100`) can be used in millions of different private networks worldwide without conflict.</li>
                           <li><strong>Assigned by a Local Router:</strong> Your router acts as a DHCP server, assigning private IPs to devices that connect to it.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">NAT: The Bridge Between Two Worlds</h3>
                        <p>So, if your computer has a private IP that can't access the internet, how are you reading this page? The magic is performed by **Network Address Translation (NAT)**, a function built into every modern router. NAT acts as a bridge or translator between your private network and the public internet.</p>
                        <p>Here's how it works:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                           <li>Your computer (private IP `192.168.1.100`) wants to visit a website (public IP `104.18.32.7`).</li>
                           <li>It sends the request to its gateway, which is your router.</li>
                           <li>The router takes the request, replaces the source private IP (`192.168.1.100`) with its own public IP (`e.g., 203.0.113.50`), and sends it to the website. It keeps a record in its NAT table: "Request from `192.168.1.100` went to `104.18.32.7`."</li>
                           <li>The website's server responds, sending the data back to your router's public IP (`203.0.113.50`).</li>
                           <li>The router consults its NAT table, sees that this response is for the request made by `192.168.1.100`, and forwards the data to your computer.</li>
                        </ol>
                        <p>This system allows hundreds of devices on a private network to share a single public IP address, which was a crucial solution to the problem of IPv4 address exhaustion. You can use our <Link href="/tools/subnet-calculator" className="text-primary hover:underline">Subnet Calculator</Link> to design the private IP ranges that NAT manages.</p>
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
                            <li><strong>Find Your Private IP:</strong> On Windows, open Command Prompt and type `ipconfig`. On macOS/Linux, open Terminal and type `ip addr` or `ifconfig`.</li>
                            <li><strong>Find Your Public IP:</strong> The easiest way is to search "what is my ip" on a search engine, or visit a dedicated site like `ifconfig.me`.</li>
                            <li><strong>`192.168.1.1` vs `192.168.0.1`:</strong> These are the most common default IP addresses for home router admin pages. If one doesn't work, try the other.</li>
                            <li><strong>Troubleshooting with `ping`:</strong> If you can't connect to a device on your local network, first ping its private IP. If that works, you know the local connection is good. Then, try to ping a public IP like `8.8.8.8` (Google's DNS). If that fails, the problem is likely with your router or internet connection.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Confusing Private and Public:</strong> Trying to connect to a `192.168.x.x` address from outside your own home network. This will never work.</li>
                            <li><strong>Static IP Conflicts:</strong> Manually setting a static private IP on a device that is already in use by another device on your network, which will cause connection issues for both.</li>
                            <li><strong>Port Forwarding to the Wrong IP:</strong> When setting up port forwarding on your router (e.g., for a game server), ensuring you forward the port to the correct internal, private IP address of the machine hosting the server.</li>
                             <li><strong>Assuming APIPA is a Normal Connection:</strong> If your device has an IP starting with `169.254.x.x`, it means it failed to get a proper private IP from your router's DHCP server. You will not have internet access in this state.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Setting Up a Home Game Server</h3>
                        <p className="text-sm text-muted-foreground">A user wants to host a Minecraft server for friends. They find their computer's IP is `192.168.1.50`. Using this tool, they confirm it's a private IP. This tells them they must configure "Port Forwarding" on their router to direct incoming traffic on port 25565 from their public IP to their computer's private IP.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting a Network Printer</h3>
                        <p className="text-sm text-muted-foreground">An office worker can't connect to a printer. The IT admin asks for their IP address (`172.17.100.20`) and the printer's IP address (`10.0.5.30`). Using the checker, they see both are private IPs but are on completely different private network ranges. This immediately tells the admin that the user's computer and the printer are on different subnets (or VLANs) and a routing issue is preventing communication.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Analyzing Web Server Logs</h3>
                        <p className="text-sm text-muted-foreground">A web developer is analyzing their server's access logs and sees traffic from `203.0.113.10`. They use this tool to confirm it is a public IP. They also see entries from `10.1.1.5`. They identify this as a private IP, realizing this traffic must be originating from an internal load balancer or proxy server within their own cloud infrastructure, not from an external user.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Configuring a Firewall</h3>
                        <p className="text-sm text-muted-foreground">A security administrator is setting up a new firewall. They create a rule to block all incoming traffic from the known private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16). This practice, known as bogon filtering, prevents spoofed packets with private source addresses from entering their network from the public internet.</p>
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
                                <CardDescription className="text-xs">Plan and calculate the IP ranges for your private network.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/port-lookup" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Port Number Lookup<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Understand which services are running on your public or private IPs.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">See the underlying binary structure of any IP address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
