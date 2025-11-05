
export const faqData = [
    { question: "What is an IP lookup?", answer: "An IP lookup, or IP geolocation, is the process of mapping an IP address to the real-world geographic location of a device. This is possible because IP address blocks are allocated to Internet Service Providers (ISPs) in specific regions. By querying databases that track these allocations, a tool can estimate the location, ISP, and network owner of an IP." },
    { question: "How accurate is IP geolocation?", answer: "Accuracy varies. It's generally very accurate at the country level. For city-level accuracy, it's good but not perfect, especially for mobile networks where traffic might be routed through a central point far from the user's actual location. It can never pinpoint a specific street address." },
    { question: "What is an ISP?", answer: "An ISP, or Internet Service Provider, is the company that provides internet access to a user or business. Examples include Comcast, Verizon, AT&T, and cloud providers like Amazon Web Services who provide internet connectivity to their servers." },
    { question: "What is an ASN?", answer: "An ASN, or Autonomous System Number, is a unique number assigned to an Autonomous System (AS). An AS is a large network or group of networks that has a unified routing policy. The ASN helps identify the larger network entity that owns the IP address block, such as 'Google LLC' or 'Microsoft Corporation'." },
    { question: "Can this tool detect VPNs or proxies?", answer: "Yes, to an extent. Geolocation databases often flag IP addresses that belong to known VPN providers, proxies, Tor exit nodes, or data centers (like AWS). This tool will indicate if the IP is associated with these types of services, which can be a useful signal for fraud detection or security analysis." },
    { question: "Why would I need to look up an IP address?", answer: "Common use cases include: cybersecurity (investigating the source of suspicious traffic), content personalization (serving content in a user's local language or currency), fraud detection (flagging transactions from high-risk locations), and network troubleshooting." },
    { question: "What's the difference between this tool and the one on the homepage?", answer: "The tool on the homepage automatically detects and displays *your own* public IP address. This dedicated IP Lookup tool allows you to enter *any* IP address to get information about it." },
    { question: "Is it legal to look up an IP address?", answer: "Yes. IP addresses and their associated geolocation and network data are public information. Performing a lookup is a standard and legal practice for network diagnostics and analysis." },
    { question: "Does this work for private IP addresses?", answer: "No. This tool only works for public IP addresses. Private IP addresses (like those starting with 192.168.x.x or 10.x.x.x) are not unique and are not routable on the public internet, so they cannot be geolocated. You can use our <a href='/tools/ip-privacy-checker' class='text-primary hover:underline'>Public vs. Private IP Checker</a> to see if an IP is private." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the IP Address Lookup Tool',
    description: 'A step-by-step guide to finding the geolocation and network details for an IP address.',
    step: [
        { '@type': 'HowToStep', name: 'Enter an IP Address', text: 'Type or paste the IPv4 address you want to investigate into the input field.' },
        { '@type': 'HowToStep', name: 'Perform Lookup', text: 'Click the "Lookup IP" button. Our server will query a geolocation database for the IP\'s details.' },
        { '@type': 'HowToStep', name: 'Analyze the Results', text: 'The tool will display the results in a clear table, showing the country, city, ISP, ASN, and whether the IP is associated with a VPN or proxy.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'IP Geolocation', definition: 'The process of mapping an IP address to the geographic location of the device it is assigned to.' },
    { term: 'ISP (Internet Service Provider)', definition: 'The company that provides internet connectivity to an end-user or business.' },
    { term: 'ASN (Autonomous System Number)', definition: 'A unique number that identifies a large network or group of networks with a single, unified routing policy.' },
    { term: 'VPN (Virtual Private Network)', definition: 'A service that encrypts a user\'s internet traffic and routes it through a server in a different location, masking their true IP address.' },
    { term: 'Proxy', definition: 'An intermediary server that acts on behalf of a user, forwarding their requests to the internet. It can be used for caching, filtering, or anonymization.' },
];
