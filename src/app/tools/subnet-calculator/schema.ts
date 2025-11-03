
export const faqData = [
    { question: "What is subnetting?", answer: "Subnetting is the process of dividing a single, large computer network into smaller, more manageable sub-networks, or subnets. It's done to improve performance, enhance security, and simplify network management." },
    { question: "What is a CIDR notation?", answer: "CIDR (Classless Inter-Domain Routing) notation is a compact way to represent an IP address and its associated network mask. For example, `192.168.1.0/24` means the IP address is `192.168.1.0` and the first 24 bits are used as the network mask." },
    { question: "What's the difference between a Network ID and a Broadcast Address?", answer: "The Network ID is the very first address in a subnet and is used to identify the network itself; it cannot be assigned to a host. The Broadcast Address is the very last address and is used to send messages to all hosts on that specific subnet." },
    { question: "Why are there only 254 usable hosts in a /24 network?", answer: "A /24 network has 2^(32-24) = 2^8 = 256 total addresses. However, two addresses are reserved: the first one for the Network ID and the last one for the Broadcast Address. This leaves 256 - 2 = 254 addresses available for hosts (computers, printers, etc.)." },
    { question: "Can I use this calculator for IPv6?", answer: "No, this calculator is specifically designed for IPv4 subnetting. IPv6 uses a completely different addressing scheme (128-bit, hexadecimal) and requires a different set of tools and calculations." },
    { question: "What is a subnet mask?", answer: "A subnet mask is a 32-bit number that separates the network portion of an IP address from the host portion. The '1's in the mask represent the network bits, and the '0's represent the host bits. You can visualize this using our <a href='/tools/ip-to-binary' class='text-primary hover:underline'>IP to Binary Converter</a>." },
    { question: "What is a Wildcard Mask?", answer: "A wildcard mask is an inverted subnet mask, often used in firewall and router Access Control Lists (ACLs). It tells the device which bits of an IP address to pay attention to. You can calculate it by subtracting the subnet mask from `255.255.255.255`." },
    { question: "What does 'Usable Host Range' mean?", answer: "This is the range of IP addresses within a subnet that can be assigned to devices. It starts from the IP address immediately after the Network ID and ends just before the Broadcast Address." },
    { question: "How do I choose the right subnet size?", answer: "Choose a subnet size based on the number of devices you need to support. Always plan for growth. For example, if you need 50 hosts, a /26 network (62 usable hosts) is a good fit, whereas a /27 (30 usable hosts) would be too small." },
    { question: "What are private IP address ranges?", answer: "Private IP ranges (like 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16) are reserved for use within internal networks. They are not routable on the public internet and can be reused by anyone in their private network." }
];

export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1'>") } })),
};

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Subnet Calculator',
    description: 'Calculate network details like IP range, broadcast address, and host count from an IP address and CIDR prefix.',
    step: [
        { '@type': 'HowToStep', name: 'Enter IP Address', text: 'Type a valid IPv4 address into the "IP Address" field (e.g., 192.168.1.10).' },
        { '@type': 'HowToStep', name: 'Select Subnet Mask/CIDR', text: 'Choose a subnet mask from the dropdown list. You can select by CIDR prefix (e.g., /24) or the full mask (e.g., 255.255.255.0).' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate" button to process the input.' },
        { '@type': 'HowToStep', name: 'Review Results', text: 'The results will appear below, showing the Network ID, Broadcast Address, Host Range, Total Hosts, and other relevant information in a clear table format.' },
        { '@type': 'HowToStep', name: 'Copy Information', text: 'Use the copy buttons next to each piece of information to quickly copy it to your clipboard.' }
    ],
    totalTime: 'PT1M',
};

export const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "IPv4 Subnet Calculator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A comprehensive IPv4 Subnet Calculator for calculating network addresses, broadcast addresses, usable host ranges, and more for any CIDR prefix.",
    "url": "https://ict.calculation.site/tools/subnet-calculator"
};

export const keyTerminologies = [
  { term: 'Subnetting', definition: 'The process of dividing a single, large computer network into smaller sub-networks or subnets.'},
  { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'A compact way to represent an IP address and its associated network mask, using a slash followed by the number of network bits (e.g., /24).'},
  { term: 'Subnet Mask', definition: 'A 32-bit number that divides an IP address into network and host portions. The 1s represent the network part, and the 0s represent the host part.'},
  { term: 'Network ID', definition: 'The first address in a subnet, used to identify the network itself. It cannot be assigned to a host.'},
  { term: 'Broadcast Address', definition: 'The last address in a subnet, used to send a message to all devices on that network simultaneously.'},
  { term: 'Usable Host Range', definition: 'The range of IP addresses within a subnet that can be assigned to devices. It excludes the network ID and the broadcast address.'},
  { term: 'Wildcard Mask', definition: 'An inverted subnet mask, primarily used in Access Control Lists (ACLs) on routers to specify a range of IP addresses.'},
];
