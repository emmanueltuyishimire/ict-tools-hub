
export const faqData = [
    { question: "What is a wildcard mask?", answer: "A wildcard mask is a 32-bit quantity used with an IP address to determine which bits in the IP address to match. It is primarily used in Access Control Lists (ACLs) on routers and firewalls. In a wildcard mask, a '0' bit means the corresponding bit in the IP address must match, and a '1' bit means the corresponding bit does not matter." },
    { question: "How is a wildcard mask different from a subnet mask?", answer: "They are essentially inverses. A subnet mask uses binary '1's to identify the network portion of an address. A wildcard mask uses binary '0's to identify the same portion. For example, a `/24` subnet mask is `255.255.255.0`, while its corresponding wildcard mask is `0.0.0.255`." },
    { question: "Why do ACLs use wildcard masks instead of subnet masks?", answer: "Wildcard masks offer more flexibility than subnet masks for matching patterns. For example, you can use a wildcard mask to match a range of IP addresses that do not fall on a clean subnet boundary, or to match only the odd- or even-numbered hosts within a subnet, which is impossible with a standard subnet mask." },
    { question: "How do I calculate a wildcard mask from a CIDR prefix?", answer: "First, convert the CIDR prefix to its dot-decimal subnet mask (e.g., `/24` -> `255.255.255.0`). Then, subtract the subnet mask from `255.255.255.255`. The result is the wildcard mask. For example, `255.255.255.255 - 255.255.255.0 = 0.0.0.255`." },
    { question: "What is an ACL?", answer: "An ACL (Access Control List) is a set of rules applied to a router or firewall interface that tells it which packets to permit or deny. These rules often specify a source IP, destination IP, port number, and a wildcard mask to define the scope of the rule." },
    { question: "Is it safe to use this tool for my network configuration?", answer: "Yes. All calculations are performed entirely in your browser using JavaScript. No data about your network is sent to our servers." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert CIDR to a Wildcard Mask',
    description: 'A step-by-step guide to calculating the wildcard mask for a given CIDR prefix.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Select CIDR Prefix', text: 'Choose the CIDR prefix of your network from the dropdown list (e.g., /24).' },
        { '@type': 'HowToStep', name: 'Step 2: Review Results', text: 'The tool will instantly calculate and display the corresponding Subnet Mask and Wildcard Mask in both dot-decimal and binary formats.' },
        { '@type': 'HowToStep', name: 'Step 3: Copy the Wildcard Mask', text: 'Use the copy button to copy the wildcard mask for use in your router or firewall configuration.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Wildcard Mask', definition: 'An inverted subnet mask where binary 0s indicate bits that must match and 1s indicate "don\'t care" bits. Used in ACLs.' },
    { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'A compact notation for an IP network using a prefix length (e.g., /24) to denote the subnet mask.' },
    { term: 'Subnet Mask', definition: 'A 32-bit number that divides an IP address into its network and host portions.' },
    { term: 'ACL (Access Control List)', definition: 'A set of rules on a network device that filters traffic based on criteria like source/destination IP and port number.' },
];
