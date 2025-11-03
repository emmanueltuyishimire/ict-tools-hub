
export const faqData = [
    { question: "What's the difference between a subnet mask and a wildcard mask?", answer: "A subnet mask and a wildcard mask are inverses of each other. In a subnet mask, binary '1's represent the network portion and '0's represent the host portion. In a wildcard mask, '0's represent the network portion (the bits that must match) and '1's are 'don't care' bits (the host portion)." },
    { question: "Why is CIDR notation preferred over subnet masks?", answer: "CIDR notation (e.g., /24) is more concise and less prone to typos than writing out a full subnet mask (e.g., 255.255.255.0). It clearly states the number of network bits, which is often the most important piece of information for network planning." },
    { question: "When would I use a wildcard mask?", answer: "Wildcard masks are primarily used in Access Control Lists (ACLs) on routers and firewalls (like Cisco IOS). They provide a flexible way to specify a range of IP addresses to permit or deny. For example, a wildcard mask can match all IPs in a specific subnet or even match only the odd-numbered hosts." },
    { question: "How is a wildcard mask calculated?", answer: "The easiest way to calculate a wildcard mask is to subtract the subnet mask from 255.255.255.255. For example, for a subnet mask of 255.255.255.0, the wildcard mask would be 0.0.0.255." },
    { question: "Can a subnet mask have a CIDR of /31 or /32?", answer: "Yes. A /32 mask (255.255.255.255) represents a single host address. It's often used in routing tables to specify a route to one specific device. A /31 mask (255.255.255.254) is a special case used for point-to-point links between two devices, conserving IP addresses (as defined in RFC 3021)." },
    { question: "Is `255.255.0.255` a valid subnet mask?", answer: "No, it is not. A valid subnet mask must consist of a continuous block of '1's followed by a continuous block of '0's in its binary representation. The binary for `255.255.0.255` would be `11111111.11111111.00000000.11111111`, which breaks this rule. Our tool will flag such inputs as invalid." },
    { question: "What does the number of hosts mean?", answer: "The number of hosts is the total number of IP addresses available within a given subnet mask. For example, a /24 mask leaves 8 bits for hosts (32-24 = 8), which allows for 2^8 = 256 total addresses. The number of *usable* hosts is typically 2 less, as the first and last IPs are reserved for the network and broadcast addresses, respectively." },
    { question: "Does this converter work for IPv6?", answer: "No, this tool is specifically for IPv4. IPv6 uses a 128-bit address and a different prefix length notation. It does not use dot-decimal subnet masks or wildcard masks in the same way as IPv4." },
    { question: "What is a Class A, B, or C network?", answer: "This refers to the old 'classful' system of IP addressing. Class A used a /8 mask, Class B used a /16 mask, and Class C used a /24 mask. This system was inefficient and has been replaced by Classless Inter-Domain Routing (CIDR), which allows for flexible mask sizes." },
    { question: "Why can't I just type any number in the CIDR field?", answer: "The CIDR prefix must be a number between 0 and 32, as an IPv4 address has a total of 32 bits. A /0 represents all addresses, and a /32 represents a single address. Any other value is not valid in the context of IPv4." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert Subnet Masks',
    description: 'Convert seamlessly between CIDR prefix, dot-decimal subnet mask, and wildcard mask formats.',
    step: [
        { '@type': 'HowToStep', name: 'Select Input Type', text: 'Choose the format you are starting with: CIDR, Subnet Mask, or Wildcard Mask.' },
        { '@type': 'HowToStep', name: 'Enter the Value', text: 'Input your value in the text field. For CIDR, use the dropdown selector.' },
        { '@type': 'HowToStep', name: 'View Results', text: 'The tool instantly converts your input into all other formats and displays additional information like the number of hosts.' },
        { '@type': 'HowToStep', name: 'Copy Information', text: 'Use the copy buttons next to each result to quickly copy the value to your clipboard.' }
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'A compact notation for an IP network, using a forward slash and a number (e.g., /24) to represent the length of the subnet mask.' },
    { term: 'Subnet Mask', definition: 'A 32-bit number that divides an IP address into network and host portions. \'1\' bits represent the network; \'0\' bits represent the host.' },
    { term: 'Wildcard Mask', definition: 'An inverted subnet mask used in Access Control Lists (ACLs), where \'0\' bits indicate positions that must match and \'1\' bits are "don\'t care" positions.' },
    { term: 'ACL (Access Control List)', definition: 'A set of rules used by routers and firewalls to filter network traffic based on IP addresses, ports, and other criteria.' },
    { term: 'Usable Hosts', definition: 'The number of IP addresses in a subnet that can be assigned to devices, which is the total number of addresses minus two for the reserved network and broadcast addresses.' },
];
