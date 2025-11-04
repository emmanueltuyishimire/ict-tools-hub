
export const faqData = [
    { question: "What is a 'host' in networking?", answer: "A host is any device on a network that is assigned an IP address. This can be a computer, smartphone, printer, server, or any other network-connected device." },
    { question: "Why are the 'usable' hosts different from the 'total' hosts?", answer: "In any subnet, two addresses are reserved and cannot be assigned to hosts. The first address is the Network ID (which identifies the subnet itself), and the last address is the Broadcast Address (used to send messages to all hosts on the subnet). Therefore, the number of usable hosts is always the total number of hosts minus two (except for the special cases of /31 and /32)." },
    { question: "How is the number of hosts calculated from a CIDR prefix?", answer: "The CIDR prefix (e.g., /24) tells you how many bits are used for the network portion of an IPv4 address. Since an IPv4 address has 32 bits total, the remaining bits are for the host portion. If the CIDR is 'n', then the number of host bits is '32 - n'. The total number of hosts is 2 raised to the power of the number of host bits (2^(32-n))." },
    { question: "What are the special cases for /31 and /32 networks?", answer: "A /32 network has only one IP address. It has 0 host bits, so it can't have traditional hosts; it's used to identify a single device, typically in routing. A /31 network has two IP addresses. It was originally considered unusable but is now standard practice (RFC 3021) for point-to-point links between two routers, where both addresses are assigned, resulting in 2 usable 'hosts' and no wasted network/broadcast IPs." },
    { question: "How do I choose the right CIDR prefix for my network?", answer: "You should choose the smallest possible subnet (largest CIDR number) that can accommodate your required number of hosts, plus a reasonable buffer for future growth. For example, if you need 50 hosts, you should choose a /26 (62 usable hosts), not a /27 (30 usable hosts). Our <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a> is designed for this kind of planning." },
    { question: "Does a larger CIDR number mean more or fewer hosts?", answer: "A larger CIDR number (e.g., /29) means more network bits and fewer host bits, resulting in *fewer* hosts. A smaller CIDR number (e.g., /22) means fewer network bits and more host bits, resulting in *more* hosts." },
    { question: "Is this calculator for IPv4 or IPv6?", answer: "This calculator is for IPv4 only. IPv6 uses a 128-bit address space and a similar prefix length concept, but the number of hosts is so astronomically large that calculating it is not typically a practical concern in the same way." },
    { question: "What CIDR prefix does a typical home network use?", answer: "Most home networks use a /24 prefix, which corresponds to a subnet mask of 255.255.255.0. This provides 254 usable host addresses (e.g., from 192.168.1.1 to 192.168.1.254), which is more than enough for most households." },
    { question: "Can I determine the number of hosts from a subnet mask?", answer: "Yes. The number of hosts is determined by the number of '0' bits in the binary representation of the subnet mask. This tool simplifies the process by starting with the CIDR prefix. You can use our <a href='/tools/subnet-mask-converter' class='text-primary hover:underline'>Subnet Mask Converter</a> to find the CIDR for any valid mask." },
    { question: "What's the relationship between this and subnetting?", answer: "This calculator is a core part of subnetting. When you perform subnetting, you are deciding how to divide a large network into smaller ones. The primary consideration is how many hosts each smaller subnet needs to support, which in turn determines the CIDR prefix you will assign to it. Our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a> provides a more complete view of a single subnet." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate the Number of Hosts in a Subnet',
    description: 'Determine the number of total and usable IP addresses available in a network based on its CIDR prefix.',
    step: [
        { '@type': 'HowToStep', name: 'Select CIDR Prefix', text: 'Choose the CIDR prefix of your network from the dropdown list (e.g., /24).' },
        { '@type': 'HowToStep', name: 'View Instant Results', text: 'The tool will automatically calculate and display the Total Hosts and Usable Hosts for the selected prefix.' },
        { '@type': 'HowToStep', name: 'Analyze Associated Data', text: 'The results card will also show the corresponding subnet mask for the chosen CIDR prefix.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Host', definition: 'Any network-connected device that is assigned an IP address, such as a computer, phone, or server.' },
    { term: 'CIDR Prefix', definition: 'A number (e.g., /24) that represents the number of network bits in a subnet mask, defining the size of the network.' },
    { term: 'Usable Hosts', definition: 'The number of IP addresses in a subnet that can actually be assigned to devices. It excludes the reserved Network ID and Broadcast Address.' },
    { term: 'Network ID', definition: 'The first IP address in a subnet, which identifies the network itself and cannot be assigned to a host.' },
    { term: 'Broadcast Address', definition: 'The last IP address in a subnet, used to send a message to all hosts on that network simultaneously.' },
    { term: 'Point-to-Point Link', definition: 'A network connection that directly links two devices, typically two routers. A /31 subnet is most efficient for this.' },
];
