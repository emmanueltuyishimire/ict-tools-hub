
export const faqData = [
    { question: "What is VLSM?", answer: "VLSM (Variable Length Subnet Masking) is a technique that allows network administrators to divide an IP address space into subnets of different sizes. Unlike traditional subnetting where all subnets are the same size, VLSM minimizes IP address waste by tailoring the subnet size to the specific host requirements of that subnet." },
    { question: "How is VLSM different from traditional subnetting?", answer: "In traditional (or 'fixed-length') subnetting, if you decide to create four subnets from a major network, all four subnets will have the exact same size and host capacity. With VLSM, you can create subnets of varying sizes from that same major network. For example, you can create one large subnet for 100 users, a smaller one for 25 users, and several tiny ones for point-to-point WAN links, all from the same original block." },
    { question: "Why should I sort my subnets from largest to smallest?", answer: "This is the cardinal rule of VLSM. By allocating the largest blocks of IP addresses first, you ensure that there is a contiguous block of address space large enough to satisfy the request. If you allocate smaller subnets first, you might fragment the address space, leaving you with multiple small, unused blocks that cannot be combined to fit a larger subnet requirement later." },
    { question: "What does 'Address Space Exhausted' mean?", answer: "This error means that the major network block you started with is not large enough to accommodate all of the subnet requests you have entered. You either need to reduce the number of hosts required for your subnets or start with a larger major network (i.e., one with a smaller CIDR prefix, like /23 instead of /24)." },
    { question: "Can a subnet have 0 usable hosts?", answer: "Yes. A subnet with a /31 mask has a total of 2 addresses, and both are considered usable for point-to-point links (as per RFC 3021), so there are 0 'hosts' in the traditional sense. A /32 subnet has only 1 address, which is the network address itself, and is used to specify a single host route. Our calculator accounts for this, showing 0 usable hosts for these cases." },
    { question: "What happens to the leftover IP addresses?", answer: "After the VLSM calculation is complete, any remaining IP address space within the major network that was not allocated to a subnet is considered 'unallocated'. This space can be reserved for future growth or used for new subnets later, as long as there is a large enough contiguous block to meet the new requirement." },
    { question: "Is it better to use a /30 or a /31 for a WAN link?", answer: "Traditionally, a /30 was used, providing 4 total IPs (2 usable for devices, 1 for network ID, 1 for broadcast). However, modern best practice (RFC 3021) recommends using a /31 for point-to-point links. A /31 provides 2 total IPs, both of which are assigned to the devices, eliminating waste from network and broadcast addresses that are unnecessary on a link with only two endpoints." },
    { question: "How do I calculate the required CIDR for a number of hosts?", answer: "You need to find the smallest power of 2 that is greater than or equal to the number of hosts plus two (for the network and broadcast addresses). For example, for 30 hosts, you need 30+2=32 addresses. 2^5 = 32. So you need 5 host bits. Since an IPv4 address has 32 bits total, the network portion will be 32 - 5 = 27 bits. Therefore, you need a /27 subnet." },
    { question: "Does this calculator work for IPv6?", answer: "No, this calculator is designed exclusively for IPv4. IPv6 uses a 128-bit address space and a similar concept of subnetting with prefix lengths, but the calculations and terminology are different." },
    { question: "What is 'route summarization' and how does VLSM relate to it?", answer: "Route summarization (or supernetting) is the process of combining multiple smaller network routes into a single, more general route. VLSM is the process of breaking a network down, while summarization is the reverse process. A well-designed VLSM scheme makes route summarization more effective, which can significantly reduce the size of routing tables and improve router performance." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the VLSM Calculator',
    description: 'A step-by-step guide to designing an efficient IP address plan using Variable Length Subnet Masking.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Major Network', text: 'Input the main network IP address and CIDR prefix you want to divide (e.g., 172.16.0.0/22).' },
        { '@type': 'HowToStep', name: 'Define Subnets', text: 'For each required subnet, enter a descriptive name (e.g., "Engineering LAN") and the number of hosts it needs to support. Use the "Add Subnet" button to create more entries.' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Design Network" button. The calculator will automatically sort your requests from largest to smallest and allocate the most appropriately sized subnets.' },
        { '@type': 'HowToStep', name: 'Review the Allocation Table', text: 'The results table will show the allocated details for each subnet, including its assigned network ID, usable host range, broadcast address, and subnet mask. Any unallocated space will also be shown.' },
        { '@type': 'HowToStep', name: 'Copy Information', text: 'Use the copy buttons within the results table to easily copy any piece of information you need for your documentation or device configuration.' }
    ],
    totalTime: 'PT3M',
};

export const keyTerminologies = [
    { term: 'VLSM (Variable Length Subnet Masking)', definition: 'A network design technique that allows subnets of various sizes to be created from a larger address block, minimizing IP address waste.' },
    { term: 'FLSM (Fixed-Length Subnet Masking)', definition: 'An older subnetting method where all subnets are of the same size, regardless of the host requirements of each subnet.' },
    { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'A method for allocating IP addresses and routing IP packets that gets rid of the rigid Class A, B, and C system. It is the basis for VLSM.' },
    { term: 'Subnetting', definition: 'The process of dividing a single network into multiple smaller, logical networks (subnets).' },
    { term: 'Route Summarization (Supernetting)', definition: 'The process of aggregating multiple smaller network routes into a single larger route, which is the reverse of VLSM.' },
    { term: 'Contiguous Address Space', definition: 'An unbroken block of IP addresses. VLSM relies on allocating contiguous blocks to function correctly.' },
];
