
export const faqData = [
    { question: "What is a network address (or Network ID)?", answer: "The network address, also known as the Network ID, is the very first IP address in a subnet. It is used to identify the subnet itself within a larger network. It cannot be assigned to any individual device (host)." },
    { question: "How is the network address calculated?", answer: "The network address is calculated by performing a bitwise AND operation between any IP address in the subnet and the subnet mask. This operation effectively zeroes out all the 'host' bits of the IP address, leaving only the 'network' portion, which results in the first address of that subnet." },
    { question: "Why can't I assign the network address to a computer?", answer: "The network address is reserved for routing purposes. Routers use the network address in their routing tables to determine how to forward packets to the correct subnet. If it were assigned to a host, it would create ambiguity and break routing." },
    { question: "What is the difference between the network address and the broadcast address?", answer: "The network address is the *first* address in a subnet (all host bits are 0) and identifies the network. The broadcast address is the *last* address (all host bits are 1) and is used to send messages to all hosts on the network. Neither can be assigned to a device. You can find the latter using our <a href='/tools/broadcast-address-calculator' class='text-primary hover:underline'>Broadcast Address Calculator</a>." },
    { question: "Does every IP address have a network address?", answer: "Yes. Every IP address, when combined with a subnet mask, belongs to a specific subnet that is identified by a unique network address. This is a fundamental concept of IP networking." },
    { question: "If I have an IP and a mask, how does this tool find the network address?", answer: "This tool takes your IP address and subnet mask, converts both to their 32-bit binary forms, performs a logical AND operation between them, and then converts the resulting binary number back into a human-readable IP address format. This result is the network address." },
    { question: "What is the network address for a typical home network?", answer: "A typical home network uses the `192.168.1.0/24` range. The network address for this setup is `192.168.1.0`. The usable IPs for your devices would then start at `192.168.1.1`." },
    { question: "Can the network address be the same as the IP address I enter?", answer: "Yes, this can happen in two scenarios: 1) if the IP address you enter happens to be the network address itself (e.g., entering `192.168.1.0` with a `/24` mask), or 2) in a `/32` network, where there is only one IP address which acts as both the network address and the host address." },
    { question: "How does this relate to a router's routing table?", answer: "A routing table is a list of network addresses and instructions on how to reach them. When a router receives a packet, it looks at the destination IP, determines its network address using the routing table's subnet masks, and forwards the packet to the interface that leads to that network. The network address is the key piece of information in this process." },
    { question: "Does IPv6 have network addresses?", answer: "Yes, IPv6 also uses prefixes to define networks, similar to IPv4's CIDR notation. However, the concept of a specific reserved 'network address' with all host bits set to zero is not a strict requirement in the same way. The principles are similar, but the implementation details differ." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate a Network Address (Network ID)',
    description: 'Find the network address for any IPv4 subnet using an IP address and its subnet mask.',
    step: [
        { '@type': 'HowToStep', name: 'Enter an IP Address', text: 'Input any IP address that belongs to the network you are analyzing (e.g., 172.16.50.100).' },
        { '@type': 'HowToStep', name: 'Select the Subnet Mask', text: 'Choose the correct subnet mask for the network from the CIDR dropdown list (e.g., /22).' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate" button.' },
        { '@type': 'HowToStep', name: 'Review the Result', text: 'The tool will display the calculated Network Address (or Network ID) for that subnet. Use the copy button to save the result.' }
    ],
    totalTime: 'PT1M',
};
