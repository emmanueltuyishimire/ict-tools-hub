
export const faqData = [
    { question: "What makes a subnet mask valid?", answer: "A subnet mask is valid if its binary representation consists of a contiguous block of '1's followed by a contiguous block of '0's. For example, `255.255.255.0` (`...11111111.00000000`) is valid, but `255.255.0.255` (`...11111111.00000000.11111111`) is invalid because the '1's are not contiguous." },
    { question: "Can a subnet mask be `0.0.0.0` or `255.255.255.255`?", answer: "Yes. A subnet mask of `0.0.0.0` (or /0) represents a network containing all possible IPv4 addresses, and is used for default routes. A mask of `255.255.255.255` (or /32) represents a network with only a single host address, often used in routing tables to specify a route to one specific machine." },
    { question: "Why can't I have a mask like `255.0.255.0`?", answer: "This mask is invalid because its binary representation is `11111111.00000000.11111111.00000000`. The '1's are not in a single, unbroken sequence from left to right. This would create an ambiguous definition of the network and host portions of an IP address, which network devices cannot interpret." },
    { question: "What is a wildcard mask and how does it relate to a subnet mask?", answer: "A wildcard mask is the inverse of a subnet mask and is used primarily in Access Control Lists (ACLs). Where a subnet mask uses '1's to mark the network portion, a wildcard mask uses '0's to mark the bits that must match. It is calculated by subtracting the subnet mask from `255.255.255.255`." },
    { question: "Is this tool checking if the mask is appropriate for my network?", answer: "No. This tool only validates the *format* and *structure* of the mask itself. It does not know about your specific network's IP addresses or requirements. For network planning, use our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a> or <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a>." },
    { question: "What is CIDR notation?", answer: "CIDR (Classless Inter-Domain Routing) notation is a shorthand for a subnet mask. It's a forward slash followed by a number (e.g., `/24`) that represents the number of leading '1's in the subnet mask. It's a more compact and less error-prone way to write masks." },
    { question: "Do all devices on the same network need the same subnet mask?", answer: "Yes, absolutely. For devices to communicate directly on the same local network (subnet), they must share the same network ID. This requires that they all be configured with the same subnet mask." },
    { question: "Can a host have an IP address but no subnet mask?", answer: "No. An IP address is meaningless without a subnet mask. The mask is what allows the device to determine which other IPs are on its local network and which ones require routing through a gateway." },
    { question: "How does the subnet mask relate to the number of hosts?", answer: "The number of '0's at the end of the binary mask determines the number of hosts. If there are 'n' zero bits, the subnet can contain 2^n total addresses. For example, a /24 mask has 8 zero bits, so it has 2^8 = 256 addresses." },
    { question: "Why did my input `255.255.256.0` fail?", answer: "Each of the four numbers (octets) in a subnet mask must be a value between 0 and 255. The number 256 is outside this valid range, making the entire mask invalid." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Validate a Network Mask',
    description: 'Check if an IPv4 subnet mask is valid and see its properties.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the Subnet Mask', text: 'Type or paste the dot-decimal subnet mask you want to check into the input field (e.g., 255.255.240.0).' },
        { '@type': 'HowToStep', name: 'Review Instant Results', text: 'The tool provides real-time feedback, indicating if the mask is valid or invalid and explaining why.' },
        { '@type': 'HowToStep', name: 'Analyze Properties', text: 'If the mask is valid, the results table will display its equivalent CIDR prefix, wildcard mask, and full 32-bit binary representation.' },
    ],
    totalTime: 'PT1M',
};
