
export const faqData = [
    { question: "What is a broadcast address?", answer: "A broadcast address is a special IP address for a subnet that allows information to be sent to all devices on that subnet simultaneously. Any packet sent to the broadcast address is automatically delivered to every host within that network segment." },
    { question: "How is the broadcast address calculated?", answer: "The broadcast address is calculated by taking the Network ID of the subnet and setting all the host bits to '1'. This results in the highest possible IP address within that subnet's range. It is the address immediately following the last usable host IP." },
    { question: "Can I assign a broadcast address to a device?", answer: "No. The broadcast address is reserved for its special function and cannot be assigned to an individual device (host) on the network. The same is true for the Network ID, which is the first address in the range." },
    { question: "What is the difference between a directed broadcast and a limited broadcast?", answer: "A directed broadcast is sent to a specific subnet's broadcast address (e.g., 192.168.1.255) and is intended for all hosts on that *specific* network. A limited broadcast uses the destination address 255.255.255.255 and is only delivered to hosts on the *local* physical network segment of the sender." },
    { question: "Why do I need a broadcast address?", answer: "Broadcasts are essential for several core networking protocols. The most common is the Address Resolution Protocol (ARP), which sends a broadcast to discover the MAC address of a device with a known IP address. DHCP also uses broadcasts for devices to request an IP address from a DHCP server." },
    { question: "Does my home network have a broadcast address?", answer: "Yes. A typical home network using the IP range 192.168.1.0 with a subnet mask of 255.255.255.0 (/24) will have a broadcast address of 192.168.1.255." },
    { question: "What is a 'broadcast storm'?", answer: "A broadcast storm is a network-crippling event where a large number of broadcast packets are sent out simultaneously, either due to a misconfiguration or a malfunctioning device. This flood of traffic consumes bandwidth and CPU resources on every host, as each device must process every broadcast packet, potentially bringing the network to a halt." },
    { question: "How does the subnet mask affect the broadcast address?", answer: "The subnet mask is what defines the size of the network, and therefore where the network ends. The broadcast address is always the last IP in the range defined by the mask. A smaller CIDR prefix (like /23) creates a larger network with a higher broadcast address than a larger CIDR prefix (like /24). You can explore this using our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a>." },
    { question: "Is broadcasting used in IPv6?", answer: "No. IPv6, the successor to IPv4, completely eliminates the concept of broadcasting to reduce unnecessary network traffic. Instead, IPv6 uses multicast addresses for one-to-many communication. A multicast packet is only processed by devices that have explicitly subscribed to that multicast group." },
    { question: "Why does a /32 network have the same broadcast and network ID?", answer: "A /32 network contains only a single IP address. Since there are no host bits, there's no room for a separate network ID, broadcast address, and host IPs. The single address represents all three. This is typically used to define a route to a single specific host." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate a Broadcast Address',
    description: 'Find the broadcast address for any IPv4 network using an IP address and a subnet mask.',
    step: [
        { '@type': 'HowToStep', name: 'Enter an IP Address', text: 'Input any IP address that belongs to the network you want to analyze.' },
        { '@type': 'HowToStep', name: 'Select the Subnet Mask', text: 'Choose the correct subnet mask for the network from the CIDR dropdown list.' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate" button.' },
        { '@type': 'HowToStep', name: 'Review the Result', text: 'The tool will display the calculated broadcast address for that subnet, along with its Network ID, for context. Use the copy button to save the result.' }
    ],
    totalTime: 'PT1M',
};
