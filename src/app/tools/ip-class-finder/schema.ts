
export const faqData = [
    { question: "What is classful IP addressing?", answer: "Classful addressing is the original IPv4 addressing architecture that divided the IP space into five classes: A, B, C, D, and E. Each class had a fixed-size network portion, which determined the number of networks and hosts it could support. This system was simple but very inefficient and has been replaced by Classless Inter-Domain Routing (CIDR)." },
    { question: "What are the ranges for each IP address class?", answer: "Class A: 1.0.0.0 to 126.255.255.255. Class B: 128.0.0.0 to 191.255.255.255. Class C: 192.0.0.0 to 223.255.255.255. Class D (Multicast): 224.0.0.0 to 239.255.255.255. Class E (Experimental): 240.0.0.0 to 255.255.255.255." },
    { question: "Why is classful addressing considered obsolete?", answer: "It was extremely wasteful. Assigning a Class A network (over 16 million addresses) to an organization that only needed a few thousand was common, wasting millions of IPs. Class C networks (254 hosts) were often too small. CIDR and VLSM were introduced to allow for flexible subnet sizes, which is a far more efficient allocation method." },
    { question: "What is the 127.0.0.0 range used for?", answer: "The entire 127.0.0.0/8 block is reserved for loopback addresses. It allows a device to send network traffic to itself, which is essential for testing and local development. `127.0.0.1` is the most common loopback address, also known as `localhost`." },
    { question: "What are Class D and E addresses used for?", answer: "Class D is reserved for multicast traffic, where a single packet is sent to a 'multicast group' of interested receivers. It's used for applications like IPTV and some financial data streams. Class E is reserved for experimental or future use and is not used on the public internet." },
    { question: "How can I tell the class of an IP just by looking at it?", answer: "You only need to look at the first octet (the first number). If it's between 1-126, it's Class A. 128-191 is Class B. 192-223 is Class C. 224-239 is Class D." },
    { question: "What is a 'default subnet mask'?", answer: "In the classful system, each class had a default, fixed subnet mask. Class A used `255.0.0.0` (/8), Class B used `255.255.0.0` (/16), and Class C used `255.255.255.0` (/24). Today, we can use any mask size we want thanks to CIDR." },
    { question: "Is this tool useful for modern networking?", answer: "While classful networking is obsolete, understanding it is important for historical context and for networking certification exams (like Network+ or CCNA), which still cover these fundamental concepts. It helps to understand *why* modern networking practices like CIDR and VLSM were developed." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find the Class of an IP Address',
    description: 'A step-by-step guide to determining the class of an IPv4 address.',
    step: [
        { '@type': 'HowToStep', name: 'Enter an IP Address', text: 'Type any valid IPv4 address into the input field.' },
        { '@type': 'HowToStep', name: 'Review the Instant Result', text: 'The tool will immediately analyze the first octet of the IP address and display its class (A, B, C, D, or E) along with a description.' },
        { '@type': 'HowToStep', name: 'Analyze Properties', text: 'The results card will also show the address range and default subnet mask associated with that class.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Classful Addressing', definition: 'The original IPv4 network architecture that divided the address space into five fixed classes (A, B, C, D, E).' },
    { term: 'Classless Inter-Domain Routing (CIDR)', definition: 'The modern system that replaced classful addressing, allowing for variable-length subnet masks and more efficient IP allocation.' },
    { term: 'First Octet', definition: 'The first of the four decimal numbers in an IPv4 address, which determines the address class in the classful system.' },
    { term: 'Default Subnet Mask', definition: 'The fixed subnet mask that was automatically assigned to a network based on its class (e.g., 255.255.0.0 for Class B).' },
    { term: 'Loopback Address', definition: 'A special IP address (typically 127.0.0.1) that a device uses to send traffic to itself for testing purposes.' },
    { term: 'Multicast', definition: 'A one-to-many communication method where data is sent from one source to a group of interested destinations simultaneously. Class D addresses are used for this.' },
];
