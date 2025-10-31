
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Search } from 'lucide-react';
import Link from 'next/link';

const portData = [
    { port: 20, protocol: 'TCP', service: 'FTP', description: 'File Transfer Protocol (Data Transfer)' },
    { port: 21, protocol: 'TCP', service: 'FTP', description: 'File Transfer Protocol (Control Command)' },
    { port: 22, protocol: 'TCP/UDP', service: 'SSH', description: 'Secure Shell, used for secure logins, file transfers (scp, sftp)' },
    { port: 23, protocol: 'TCP', service: 'Telnet', description: 'Telnet protocol—unencrypted text communications' },
    { port: 25, protocol: 'TCP', service: 'SMTP', description: 'Simple Mail Transfer Protocol, used for email routing' },
    { port: 53, protocol: 'TCP/UDP', service: 'DNS', description: 'Domain Name System, translates domain names to IP addresses' },
    { port: 67, protocol: 'UDP', service: 'BOOTP/DHCP', description: 'Bootstrap Protocol Server; also used by DHCP' },
    { port: 68, protocol: 'UDP', service: 'BOOTP/DHCP', description: 'Bootstrap Protocol Client; also used by DHCP' },
    { port: 80, protocol: 'TCP', service: 'HTTP', description: 'Hypertext Transfer Protocol, the basis of the World Wide Web' },
    { port: 110, protocol: 'TCP', service: 'POP3', description: 'Post Office Protocol, version 3, used by email clients to retrieve email' },
    { port: 123, protocol: 'UDP', service: 'NTP', description: 'Network Time Protocol, used for clock synchronization' },
    { port: 143, protocol: 'TCP', service: 'IMAP', description: 'Internet Message Access Protocol, used by email clients' },
    { port: 161, protocol: 'UDP', service: 'SNMP', description: 'Simple Network Management Protocol, for managing network devices' },
    { port: 162, protocol: 'TCP/UDP', service: 'SNMPTRAP', description: 'SNMP Trap, for devices to send unsolicited alerts' },
    { port: 389, protocol: 'TCP/UDP', service: 'LDAP', description: 'Lightweight Directory Access Protocol' },
    { port: 443, protocol: 'TCP', service: 'HTTPS', description: 'HTTP Secure, encrypted web traffic' },
    { port: 445, protocol: 'TCP', service: 'SMB', description: 'Server Message Block, for file sharing in Windows networks' },
    { port: 514, protocol: 'UDP', service: 'Syslog', description: 'Used for computer message logging' },
    { port: 636, protocol: 'TCP/UDP', service: 'LDAPS', description: 'LDAP over SSL/TLS (encrypted)' },
    { port: 993, protocol: 'TCP', service: 'IMAPS', description: 'IMAP over SSL/TLS (encrypted)' },
    { port: 995, protocol: 'TCP', service: 'POP3S', description: 'POP3 over SSL/TLS (encrypted)' },
    { port: 1433, protocol: 'TCP', service: 'MS-SQL-S', description: 'Microsoft SQL Server database management system' },
    { port: 1521, protocol: 'TCP', service: 'Oracle', description: 'Oracle database listener' },
    { port: 3306, protocol: 'TCP', service: 'MySQL', description: 'MySQL database system' },
    { port: 3389, protocol: 'TCP', service: 'RDP', description: 'Remote Desktop Protocol' },
    { port: 5432, protocol: 'TCP', service: 'PostgreSQL', description: 'PostgreSQL database system' },
    { port: 5900, protocol: 'TCP', service: 'VNC', description: 'Virtual Network Computing, for remote desktop access' },
    { port: 8080, protocol: 'TCP', service: 'HTTP-alt', description: 'HTTP alternate, often used for web proxy and caching server' },
];

const faqData = [
    { question: "What is a network port?", answer: "A network port is a virtual point where network connections start and end. It's an endpoint in an operating system's communication logic, identified by a 16-bit number (0-65535). Ports allow a single host with a single IP address to run multiple services or applications simultaneously." },
    { question: "What is the difference between TCP and UDP?", answer: "TCP (Transmission Control Protocol) is connection-oriented, meaning it establishes a reliable connection and ensures that all data packets are received in order and without errors. It's used for services like web browsing (HTTP/HTTPS) and email (SMTP). UDP (User Datagram Protocol) is connectionless and faster, but less reliable; it sends packets without guaranteeing delivery or order. It's used for time-sensitive services like DNS, VoIP, and online gaming." },
    { question: "What are 'Well-Known Ports'?", answer: "Ports 0 through 1023 are designated as 'Well-Known Ports' by the IANA (Internet Assigned Numbers Authority). They are reserved for common, system-level services like HTTP (port 80), FTP (port 21), and SSH (port 22). On most operating systems, special privileges are required to run a service on these ports." },
    { question: "What are 'Registered Ports' and 'Dynamic Ports'?", answer: "Registered Ports range from 1024 to 49151 and are assigned by IANA for specific applications (e.g., PostgreSQL on 5432). Dynamic or Private Ports range from 49152 to 65535. These are used for temporary, client-side connections (ephemeral ports) and are not officially assigned to any service." },
    { question: "Can a service run on a non-standard port?", answer: "Yes, an administrator can configure almost any service to run on any available port. For example, you might run an SSH server on port 2222 instead of the standard port 22 to reduce exposure to automated attacks. This is a common security practice known as 'security through obscurity'." },
    { question: "What does it mean if a port is 'open'?", answer: "An 'open' port means that an application or service on the host is actively listening for connections on that port. A 'closed' port means that there is no application listening. A 'filtered' or 'blocked' port means that a firewall or other security device is preventing access to the port, so its status (open or closed) cannot be determined." },
    { question: "Why do some services use both TCP and UDP?", answer: "A prime example is DNS (port 53). It uses UDP for standard queries because it's fast and a single packet is usually sufficient. However, it uses TCP for zone transfers (copying a large amount of DNS data between servers) because TCP's reliability is needed to ensure the entire zone file is transferred correctly." },
    { question: "Is it safe to have open ports on my router?", answer: "It depends on the port and the service. Your router must have port 80/443 open for you to browse the web. However, having unnecessary ports open, especially for services like Telnet or RDP that are directly exposed to the internet, is a major security risk. You should only open ports that are absolutely necessary and ensure the services running on them are secure and up-to-date." },
    { question: "How does a firewall use port numbers?", answer: "Firewalls are the primary gatekeepers of network traffic, and they operate heavily based on port numbers. A firewall can be configured with rules to allow or block traffic based on source IP, destination IP, and destination port. For example, a common rule is 'Allow inbound traffic on port 443 (HTTPS) but block all other inbound traffic'." },
    { question: "What is NAT and how does it use ports?", answer: "NAT (Network Address Translation) is a method used by routers to allow multiple devices on a private network (using private IPs like 192.168.x.x) to share a single public IP address. When a device on your network connects to a website, the router temporarily assigns a unique high-numbered port to that connection, keeping track of which internal device made the request. When the website replies, the router sends the response to the correct device based on that port mapping." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Look Up a Network Port Number',
    description: 'A step-by-step guide to finding the service associated with a common network port.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Your Search Term', text: 'In the search box, type a port number (e.g., "443"), a protocol name (e.g., "SSH"), or a description (e.g., "database").' },
        { '@type': 'HowToStep', name: 'Review the Filtered Results', text: 'The table will instantly update to show only the ports that match your search term.' },
        { '@type': 'HowToStep', name: 'Analyze the Details', text: 'For each entry, you can see the port number, the protocol(s) it uses (TCP/UDP), the common service name, and a description of its typical use.' },
    ],
    totalTime: 'PT1M',
};

export function PortLookupTool() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPorts = useMemo(() => {
        if (!searchTerm) {
            return portData;
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        return portData.filter(item =>
            item.port.toString().includes(lowercasedTerm) ||
            item.protocol.toLowerCase().includes(lowercasedTerm) ||
            item.service.toLowerCase().includes(lowercasedTerm) ||
            item.description.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm]);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>Port Lookup</CardTitle>
                    <CardDescription>Search the list of common ports below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by port, protocol, or service (e.g., 443, SSH, database...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Port</TableHead>
                                    <TableHead className="w-[120px]">Protocol</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPorts.length > 0 ? (
                                    filteredPorts.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-bold">{item.port}</TableCell>
                                            <TableCell>{item.protocol}</TableCell>
                                            <TableCell className="font-medium">{item.service}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No ports found matching your search term.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool provides a quick, searchable reference for the most common networking ports. Here's how to use it effectively:</p>
                    <ol>
                        <li><strong>Start Typing:</strong> Simply begin typing in the search box. You can search for a port number, a service name, a protocol, or even keywords from the description.</li>
                        <li><strong>Instant Filtering:</strong> The table updates in real-time to show only the results that match your query. For example:
                            <ul>
                                <li>Typing <code className="font-code bg-muted p-1 rounded-sm">443</code> will show you the entry for HTTPS.</li>
                                <li>Typing <code className="font-code bg-muted p-1 rounded-sm">FTP</code> will show you the ports for File Transfer Protocol.</li>
                                <li>Typing <code className="font-code bg-muted p-1 rounded-sm">database</code> will show you the common ports for MS-SQL, MySQL, and PostgreSQL.</li>
                            </ul>
                        </li>
                        <li><strong>Review the Details:</strong> The table provides the port number, the protocol(s) it uses (TCP and/or UDP), the common service abbreviation, and a clear description of its purpose.</li>
                    </ol>
                </Card>
            </section>

             <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Role of Ports in Networking</CardTitle>
                    </div>
                    <CardDescription>From virtual mailboxes to the rules of communication, understand how ports direct the flow of all internet traffic.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is a Network Port? The Internet's Mail Slots</h3>
                        <p>Imagine a large office building. The building's street address is like an IP address—it gets you to the right location. However, once you're inside, you need to know which office or person to deliver a package to. Network ports are like the mail slots or office numbers within that building. They are virtual endpoints that allow a single computer, with a single IP address, to handle many different types of network traffic simultaneously.</p>
                        <p>A port is represented by a 16-bit number, ranging from 0 to 65535. When your computer connects to a web server, it's not just connecting to the server's IP address; it's connecting to a specific port on that IP address, usually port 443 for secure web traffic (HTTPS). At the same time, your email client might be connecting to port 993 (IMAPS) on a mail server. Ports ensure that the web page data goes to your browser and the email data goes to your email client, preventing them from getting mixed up. This is a fundamental concept that you can explore further with our <Link href="/tools/subnet-calculator" className="text-primary hover:underline">Subnet Calculator</Link>, which helps define the network where these IPs and ports operate.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">TCP vs. UDP: The Reliable Messenger vs. The Speedy Courier</h3>
                        <p>Not all communication is the same, and the internet has two primary protocols for transporting data, which work in conjunction with ports:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>TCP (Transmission Control Protocol):</strong> This protocol is like a registered postal service. It's **connection-oriented**, meaning it establishes a formal connection (a "three-way handshake") before sending any data. It guarantees that all data packets are delivered, that they arrive in the correct order, and that they are error-checked. This reliability is crucial for activities like browsing websites, sending emails, and transferring files, where every single bit of data must be correct.</li>
                            <li><strong>UDP (User Datagram Protocol):</strong> This protocol is like a standard, first-class mail courier. It's **connectionless**. It just sends the data packets (datagrams) and hopes for the best. There is no guarantee of delivery, order, or error-checking. While this sounds bad, it's incredibly fast because it has very little overhead. UDP is perfect for time-sensitive applications where speed is more important than perfect accuracy, such as live video streaming, online gaming, and DNS lookups. If a single video frame or game position update is lost, it's better to just skip it and move on to the next one rather than waiting for it to be re-sent. Our <Link href="/tools/latency-estimator" className="text-primary hover:underline">Latency Estimator</Link> can help you understand how delay impacts these real-time protocols.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Three Port Ranges: A System of Order</h3>
                        <p>The 65,536 available ports are divided into three distinct ranges, managed by the Internet Assigned Numbers Authority (IANA):</p>
                        <div className="overflow-x-auto my-4">
                           <table className="w-full">
                              <thead><tr className="border-b"><th className="p-2 text-left">Range</th><th className="p-2 text-left">Name</th><th className="p-2 text-left">Description</th></tr></thead>
                              <tbody>
                                 <tr className="border-b"><td className="p-2 font-code">0 - 1023</td><td className="p-2 font-medium">Well-Known Ports</td><td className="p-2">Reserved for essential, system-level services. Includes HTTP (80), HTTPS (443), SSH (22), and DNS (53).</td></tr>
                                 <tr className="border-b"><td className="p-2 font-code">1024 - 49151</td><td className="p-2 font-medium">Registered Ports</td><td className="p-2">Assigned to specific applications and services, like MySQL (3306) and RDP (3389). Companies can register a port for their application.</td></tr>
                                 <tr><td className="p-2 font-code">49152 - 65535</td><td className="p-2 font-medium">Dynamic/Private Ports</td><td className="p-2">Used for temporary, client-side (ephemeral) connections. Your computer picks a port from this range for its side of a connection to a web server.</td></tr>
                              </tbody>
                           </table>
                        </div>
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
                            <li><strong>Checking Listening Ports:</strong> On your local machine, use the command `netstat -an` (Windows) or `lsof -i` (macOS/Linux) to see a list of all currently open and listening ports. This is great for troubleshooting and security checks.</li>
                            <li><strong>Security through Obscurity:</strong> For services you host, like an SSH server, consider moving it from the default port 22 to a random high-numbered port (e.g., 2222). This won't stop a determined attacker, but it will hide the service from automated port scanners that only check for common services.</li>
                            <li><strong>Using Telnet to Test Ports:</strong> You can use the telnet command to quickly check if a port is open on a remote server. For example, `telnet example.com 80`. If you get a connection, the port is open.</li>
                            <li><strong>Nmap for Scanning:</strong> The professional tool for port discovery is Nmap. A command like `nmap -sT -p- example.com` will scan all 65,535 TCP ports on a server to see which ones are open. Use this responsibly and only on networks you own.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Exposing Unnecessary Ports:</strong> The most common security vulnerability. Never expose ports for services like databases (3306, 5432) or remote desktop (3389) directly to the internet. Access should be restricted by a firewall or managed through a VPN.</li>
                            <li><strong>Confusing TCP and UDP:</strong> Blocking port 53 for TCP but not UDP will not fully block DNS, as standard queries use UDP. When creating firewall rules, you must be specific about which protocol you are targeting for a given port.</li>
                             <li><strong>Assuming a Service is on its Standard Port:</strong> Just because a port is open doesn't mean the expected service is running on it. An attacker could run a malicious service on a port that is typically trusted, like port 53. Validating the machine's identity with a tool like the <Link href="/tools/mac-validator" className="text-primary hover:underline">MAC Address Validator</Link> can be part of a deeper security check.</li>
                            <li><strong>Ignoring Egress Filtering:</strong> Many people focus on blocking *inbound* traffic, but it's also important to control *outbound* traffic (egress filtering). Blocking outbound connections on unused ports can prevent a compromised machine on your network from communicating with an attacker's command-and-control server.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Setting Up a Firewall</h3>
                        <p className="text-sm text-muted-foreground">A network administrator is configuring a new corporate firewall. Their policy is to "deny all, permit by exception". They use a port lookup tool to build their ruleset, specifically allowing inbound traffic on TCP port 443 (for their web server), TCP port 25 (for their mail server), and blocking everything else to create a secure perimeter.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting a Connection Issue</h3>
                        <p className="text-sm text-muted-foreground">A developer can't connect to their newly configured PostgreSQL database server. They check the server and confirm the database is running. Using a port lookup tool, they are reminded that PostgreSQL uses port 5432. They then check the server's firewall and discover that there is no rule to allow inbound traffic on TCP port 5432, instantly identifying the problem.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Performing a Security Audit</h3>
                        <p className="text-sm text-muted-foreground">A security analyst runs a port scan on a client's public IP address and finds that port 3389 is open to the world. By looking up port 3389, they confirm it is for RDP (Remote Desktop Protocol). They immediately flag this as a critical vulnerability, as exposing RDP directly to the internet is a massive security risk, and they advise the client to place it behind a VPN immediately.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Developing a Network Application</h3>
                        <p className="text-sm text-muted-foreground">A software developer is creating a new chat application. They need to choose a port for their server to listen on. They consult a port list and decide to use a port in the Registered range (e.g., 25550) to avoid conflicting with any well-known system services, ensuring their application can run without requiring special administrative privileges.</p>
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
                                <CardDescription className="text-xs">Understand the network segment where these ports operate.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/firewall-simulator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Firewall Rule Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Practice creating rules that allow or block traffic based on port numbers.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-privacy-checker" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Public vs Private IP Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Determine if an IP address is on a local network or the public internet.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
