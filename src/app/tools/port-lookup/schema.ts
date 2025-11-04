
export const faqData = [
    { question: "What is a network port?", answer: "A network port is a virtual point where network connections start and end. It's an endpoint in an operating system's communication logic, identified by a 16-bit number (0-65535). Ports allow a single host with a single IP address to run multiple services or applications simultaneously." },
    { question: "What is the difference between TCP and UDP?", answer: "TCP (Transmission Control Protocol) is connection-oriented, meaning it establishes a reliable connection and ensures that all data packets are received in order and without errors. It's used for services like web browsing (HTTP/HTTPS) and email (SMTP). UDP (User Datagram Protocol) is connectionless and faster, but less reliable; it sends packets without guaranteeing delivery or order. It's used for time-sensitive services like DNS, VoIP, and online gaming where low latency is critical." },
    { question: "What are 'Well-Known Ports'?", answer: "Ports 0 through 1023 are designated as 'Well-Known Ports' by the IANA (Internet Assigned Numbers Authority). They are reserved for common, system-level services like HTTP (port 80), FTP (port 21), and SSH (port 22). On most operating systems, special privileges are required to run a service on these ports." },
    { question: "What are 'Registered Ports' and 'Dynamic Ports'?", answer: "Registered Ports range from 1024 to 49151 and are assigned by IANA for specific applications (e.g., PostgreSQL on 5432). Dynamic or Private Ports range from 49152 to 65535. These are used for temporary, client-side connections (ephemeral ports) and are not officially assigned to any service." },
    { question: "Can a service run on a non-standard port?", answer: "Yes, an administrator can configure almost any service to run on any available port. For example, you might run an SSH server on port 2222 instead of the standard port 22 to reduce exposure to automated attacks. This is a common security practice known as 'security through obscurity'." },
    { question: "What does it mean if a port is 'open'?", answer: "An 'open' port means that an application or service on the host is actively listening for connections on that port. A 'closed' port means that there is no application listening. A 'filtered' or 'blocked' port means that a firewall or other security device is preventing access to the port, so its status (open or closed) cannot be determined." },
    { question: "Why do some services use both TCP and UDP?", answer: "A prime example is DNS (port 53). It uses UDP for standard queries because it's fast and a single packet is usually sufficient. However, it uses TCP for zone transfers (copying a large amount of DNS data between servers) because TCP's reliability is needed to ensure the entire zone file is transferred correctly." },
    { question: "Is it safe to have open ports on my router?", answer: "It depends on the port and the service. Your router must have port 80/443 open for you to browse the web. However, having unnecessary ports open, especially for services like Telnet or RDP that are directly exposed to the internet, is a major security risk. You should only open ports that are absolutely necessary and ensure the services running on them are secure and up-to-date." },
    { question: "How does a firewall use port numbers?", answer: "Firewalls are the primary gatekeepers of network traffic, and they operate heavily based on port numbers. A firewall can be configured with rules to allow or block traffic based on source IP, destination IP, and destination port. For example, a common rule is 'Allow inbound traffic on port 443 (HTTPS) but block all other inbound traffic'." },
    { question: "What is NAT and how does it use ports?", answer: "NAT (Network Address Translation) is a method used by routers to allow multiple devices on a private network (using private IPs like 192.168.x.x) to share a single public IP address. When a device on your network connects to a website, the router temporarily assigns a unique high-numbered port to that connection, keeping track of which internal device made the request. When the website replies, the router sends the response to the correct device based on that port mapping." },
];

export const howToSchema = {
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

export const keyTerminologies = [
    { term: 'Port Number', definition: 'A 16-bit number (0-65535) that identifies a specific process or service on a network device.' },
    { term: 'TCP (Transmission Control Protocol)', definition: 'A reliable, connection-oriented protocol that ensures data is delivered in order and without errors.' },
    { term: 'UDP (User Datagram Protocol)', definition: 'A fast, connectionless protocol that sends data without guaranteeing delivery. Used for time-sensitive applications like gaming and DNS.' },
    { term: 'Well-Known Ports', definition: 'Ports 0-1023, reserved by IANA for essential system services like HTTP (80) and SSH (22).' },
    { term: 'Firewall', definition: 'A network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules, often using port numbers.' },
    { term: 'NAT (Network Address Translation)', definition: 'A method used by routers to map multiple private IP addresses to a single public IP address, using port numbers to track connections.' },
];
