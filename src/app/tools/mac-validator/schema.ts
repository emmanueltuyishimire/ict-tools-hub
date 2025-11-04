
export const faqData = [
    { question: "What is a MAC address?", answer: "A MAC (Media Access Control) address is a unique 48-bit hardware identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment. It's like a physical serial number for your network hardware." },
    { question: "Is a MAC address the same as an IP address?", answer: "No. A MAC address is a permanent, hardware-level address, while an IP address is a logical, network-level address that can change. A MAC address is used for communication on the local network (Layer 2), while an IP address is used for routing data across different networks and the internet (Layer 3)." },
    { question: "Can two devices have the same MAC address?", answer: "Theoretically, no. MAC addresses are assigned by the manufacturer and are designed to be globally unique. However, it's possible for duplicate MAC addresses to exist due to manufacturing errors or through 'MAC spoofing,' where a user intentionally changes a device's MAC address." },
    { question: "What is an OUI?", answer: "An OUI (Organizationally Unique Identifier) is the first 24 bits (or 6 hexadecimal digits) of a MAC address. The IEEE assigns these prefixes to hardware manufacturers. By looking at the OUI, you can identify the company that made the network device, which is what this tool does." },
    { question: "What are the common formats for writing a MAC address?", answer: "The most common format uses colons as separators (e.g., 00:1A:2B:3C:4D:5E). Hyphens are also common, especially in Windows (e.g., 00-1A-2B-3C-4D-5E). Cisco devices often use a dot-separated format (e.g., 001a.2b3c.4d5e). This tool validates all these common formats." },
    { question: "Is it safe to enter my device's MAC address here?", answer: "Yes. This tool runs entirely in your web browser using JavaScript. The MAC address you enter is not sent to any server, stored, or logged. All validation happens on your local machine." },
    { question: "What is MAC spoofing?", answer: "MAC spoofing is the act of changing the MAC address reported by a network interface. It can be used for legitimate reasons, such as to bypass a network access control list on a router, or for malicious purposes, like impersonating another device on a network." },
    { question: "What is a broadcast MAC address?", answer: "The broadcast MAC address is FF:FF:FF:FF:FF:FF. A data frame sent to this address is received and processed by all devices on the local network segment. It's used for services like ARP to discover the MAC address of a device with a known IP address." },
    { question: "Does my Wi-Fi and Ethernet have the same MAC address?", answer: "No. Each network interface in a device has its own unique MAC address. Your laptop's Wi-Fi card has one MAC address, and its wired Ethernet port has another. Similarly, your phone's Wi-Fi and Bluetooth interfaces have different MAC addresses." },
    { question: "How can I find my device's MAC address?", answer: "On Windows, open Command Prompt and type `ipconfig /all`. On macOS or Linux, open the Terminal and type `ifconfig` or `ip addr`. On a mobile device, this information is usually found in the Wi-Fi or 'About Phone' settings." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Validate a MAC Address',
    description: 'A step-by-step guide to check if a MAC address is valid and identify its manufacturer.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the MAC Address', text: 'Type or paste the MAC address you want to validate into the input field. The tool accepts common formats like colon-separated (XX:XX:XX:XX:XX:XX), hyphen-separated (XX-XX-XX-XX-XX-XX), and no separator (XXXXXXXXXXXX).' },
        { '@type': 'HowToStep', name: 'Review Real-Time Results', text: 'The tool validates the address as you type. A status message will immediately indicate whether the format is valid.' },
        { '@type': 'HowToStep', name: 'Analyze the Details', text: 'If the address is valid, the results card will show the detected format, the normalized colon-separated format, the OUI (the first 6 characters), and the manufacturer associated with that OUI.' },
        { '@type': 'HowToStep', name: 'Clear or Copy', text: 'Use the "Clear" button to reset the tool or the copy button to copy the normalized MAC address.' }
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'MAC Address', definition: 'A unique 48-bit hardware identifier assigned to a Network Interface Controller (NIC) for communication on a local network.' },
    { term: 'IP Address', definition: 'A logical 32-bit (IPv4) or 128-bit (IPv6) address that identifies a device on a network and is used for routing traffic across the internet.' },
    { term: 'OUI (Organizationally Unique Identifier)', definition: 'The first 24 bits (6 hex digits) of a MAC address, assigned by the IEEE to a specific hardware manufacturer.' },
    { term: 'NIC (Network Interface Controller)', definition: 'The physical hardware component (e.g., Ethernet port, Wi-Fi card) that connects a device to a network.' },
    { term: 'ARP (Address Resolution Protocol)', definition: 'A protocol used on a local network to map a known IP address to its corresponding physical MAC address.' },
    { term: 'Layer 2 (Data Link Layer)', definition: 'The second layer of the OSI model, responsible for node-to-node data transfer between two directly connected devices. MAC addresses operate at this layer.' },
];
