
export const faqData = [
    { question: "What is IP summarization?", answer: "IP summarization, also known as route aggregation or supernetting, is the process of combining multiple smaller, contiguous IP network routes into a single, more general route. This single 'summary route' represents the entire range of the smaller networks, allowing routers to reduce the size and complexity of their routing tables." },
    { question: "Why is route summarization important?", answer: "Its primary importance is in improving router performance and network scalability. Routers have finite memory and CPU resources. A smaller routing table is faster to search, consumes less memory, and reduces CPU load. On the global internet, summarization is essential for preventing routing tables from growing to an unmanageable size. It also helps to contain routing updates, improving network stability." },
    { question: "How does this tool calculate the summary route?", answer: "The tool first converts all input network addresses into their binary form. It then finds the longest common binary prefix shared by all the addresses in the range. The length of this common prefix becomes the new CIDR for the summary route, and the common prefix itself (padded with zeros) becomes the new network address." },
    { question: "What does 'contiguous' mean in this context?", answer: "For summarization to be effective and accurate, the input networks should be contiguous, meaning they form a continuous, unbroken block of IP address space. For example, `192.168.0.0/24` and `192.168.1.0/24` are contiguous. This tool will still calculate a summary for non-contiguous networks, but it will be less efficient and cover a larger range than necessary, which might include networks you don't own." },
    { question: "What is a 'supernet'?", answer: "A supernet is the result of route summarization. It is a single network block that is larger than any of the individual networks it represents. For example, combining four `/24` networks creates one `/22` supernet." },
    { question: "Is a smaller CIDR prefix a larger or smaller network?", answer: "A smaller CIDR number represents a larger network. For example, a `/22` network is four times larger than a `/24` network because it has fewer network bits and more host bits." },
    { question: "Can I summarize any list of networks?", answer: "You can, but it's only truly efficient if the networks are contiguous and properly aligned on binary boundaries. Summarizing random, non-contiguous networks (e.g., `10.0.1.0/24` and `192.168.1.0/24`) will result in a very large summary route (like `/1` or `/0`) that covers almost the entire internet, which is not useful for practical routing." },
    { question: "How does this relate to VLSM?", answer: "VLSM (Variable Length Subnet Masking) and route summarization are two sides of the same coin. VLSM is the process of breaking a large network block down into smaller, custom-sized subnets. Summarization is the reverse process: taking those smaller subnets and aggregating them back up into a single route for advertisement to other parts of the network." },
    { question: "When should I summarize my routes?", answer: "You should summarize routes at the boundaries of your network. For example, when advertising your company's internal networks to your ISP, you should send a single summary route instead of dozens of specific internal routes. This hides your internal network complexity and simplifies the ISP's routing table." },
    { question: "Does this tool work with IPv6?", answer: "No, this calculator is designed for IPv4 only. IPv6 uses a similar concept of summarization, but the 128-bit address length and hexadecimal notation require a different set of tools and calculations." }
];


export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Summarize IP Networks',
    description: 'A step-by-step guide to calculating the optimal summary route for a list of IP networks.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Network List', text: 'In the text area, enter the list of IP networks you want to summarize, one per line, using CIDR notation (e.g., 192.168.0.0/24).' },
        { '@type': 'HowToStep', name: 'Calculate Summary', text: 'Click the "Summarize Routes" button.' },
        { '@type': 'HowToStep', name: 'Review the Optimal Route', text: 'The tool will display the calculated summary route, including its network address and CIDR prefix, which represents the smallest possible network that contains all your input networks.' },
        { '@type': 'HowToStep', name: 'Analyze Details', text: 'The results will also show the full address range of the summary route, the total number of hosts it contains, and its subnet and wildcard masks for use in configurations.' }
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Summarization (Aggregation)', definition: 'The process of combining multiple smaller, contiguous network routes into a single, larger summary route.' },
    { term: 'Supernet', definition: 'The single, larger network block that results from route summarization.' },
    { term: 'Contiguous Networks', definition: 'A set of networks that form a continuous, unbroken block of IP address space, making them ideal for summarization.' },
    { term: 'Routing Table', definition: 'A data table stored in a router that lists the routes to particular network destinations.' },
    { term: 'Route Flapping', definition: 'A situation where a route repeatedly appears and disappears in a routing table, which can cause network instability. Summarization helps contain this.' },
    { term: 'VLSM (Variable Length Subnet Masking)', definition: 'The technique of dividing a network into subnets of different sizes. Summarization is the reverse process.' },
];
