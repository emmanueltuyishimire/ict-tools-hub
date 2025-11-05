export const faqData = [
    { question: "What is an IP address range?", answer: "An IP address range is a set of contiguous IP addresses. It's often defined by a start IP and an end IP, or by a network address and a subnet mask (in CIDR notation). This tool helps you list out all the individual IPs within that range." },
    { question: "Why would I need to generate a list of IP addresses?", answer: "Generating an IP list is useful for many administrative and scripting tasks. For example, you might need a list of all IP addresses in a subnet to feed into a network scanning tool, to configure a firewall whitelist, or for documentation purposes." },
    { question: "What is the difference between the 'From CIDR' and 'From Range' modes?", answer: "The 'From CIDR' mode is for when you know the network block (e.g., `192.168.1.0/24`) and want to list all the usable host IPs within it. The 'From Range' mode is for when you have a specific start and end IP and want to list all addresses between them, inclusive." },
    { question: "Why is there a limit on the number of IPs that can be generated?", answer: "Generating and displaying a very large list of IP addresses (e.g., a /16 network has 65,536 addresses) can consume a significant amount of your browser's memory and cause it to become slow or unresponsive. The limit is in place to ensure a smooth user experience." },
    { question: "Does the 'From CIDR' mode include the network and broadcast addresses?", answer: "No. When generating from a CIDR block, this tool correctly lists only the *usable host addresses* in the range, excluding the reserved first (network) and last (broadcast) IPs. This is because these are the addresses you would typically use for configuration." },
    { question: "Is it safe to use this tool?", answer: "Yes. All IP generation is performed client-side, directly in your web browser. No information about the ranges you generate is ever sent to our servers." },
    { question: "How does this tool relate to a subnet calculator?", answer: "A subnet calculator provides the properties of a single network (like its range and host count). This tool takes that range and expands it into a full, explicit list of every single IP address within it." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a List of IP Addresses',
    description: 'A step-by-step guide to creating a list of IPs from a network range.',
    step: [
        { '@type': 'HowToStep', name: 'Select Mode', text: 'Choose whether you want to generate the list from a CIDR block or from a start/end IP range.' },
        { '@type': 'HowToStep', name: 'Enter Your Range', text: 'Provide the necessary input, such as the network address and CIDR prefix, or the start and end IP addresses.' },
        { '@type':- 'HowToStep', name: 'Generate IPs', text: 'Click the "Generate IPs" button.' },
        { '@type': 'HowToStep', name: 'Copy the List', text: 'The tool will display the full list of generated IP addresses in a text area. Use the copy button to copy the list to your clipboard.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [];
