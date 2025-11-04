
export const faqData = [
    { question: "What is FLSM?", answer: "FLSM (Fixed-Length Subnet Masking) is a subnetting method where a larger network is divided into multiple smaller subnets that are all the exact same size. For example, dividing a /24 network into four /26 subnets. It is simpler than VLSM but less efficient in IP address allocation." },
    { question: "How does this tool work?", answer: "This tool takes a large network block (like a /24) and a new, larger CIDR prefix (like /27). It calculates how many smaller subnets this creates (a jump from /24 to /27 'borrows' 3 bits, so 2^3 = 8 subnets). It then lists out the network ID, host range, and broadcast address for each of those new, equal-sized subnets." },
    { question: "What's the difference between this and the VLSM calculator?", answer: "This tool uses FLSM, creating subnets of all the same size based on a chosen new CIDR prefix. The <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a> is more advanced; it takes a list of varying host requirements and creates optimally sized subnets for each need, which is more efficient." },
    { question: "Why can't the new CIDR be smaller than the original?", answer: "Subnetting is the process of creating *smaller* networks from a *larger* one. A smaller CIDR number (like /23) represents a larger network than a bigger CIDR number (like /24). Therefore, to create subnets, the new CIDR prefix must be larger than the original one." },
    { question: "How many subnets will be created?", answer: "The number of subnets created is determined by the number of bits 'borrowed' from the host portion. The formula is 2^n, where 'n' is the difference between the new CIDR prefix and the original CIDR prefix. For example, subnetting a /24 into /26s means n = 26 - 24 = 2, so 2^2 = 4 subnets will be created." },
    { question: "Is it safe to use my network information here?", answer: "Yes. All calculations are performed entirely in your browser using JavaScript. No information about your network plan is sent to our servers." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a List of Subnets (FLSM)',
    description: 'A step-by-step guide to dividing a network into equal-sized subnets.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Enter Major Network', text: 'Input the starting network address and CIDR prefix of the large network block you want to divide.' },
        { '@type': 'HowToStep', name: 'Step 2: Choose New Subnet Size', text: 'Select the new, larger CIDR prefix for your desired subnets. This will determine the size and number of the generated subnets.' },
        { '@type': 'HowToStep', name: 'Step 3: Generate the List', text: 'Click the "Generate Subnet List" button.' },
        { '@type': 'HowToStep', name: 'Step 4: Review the Subnet Plan', text: 'The tool will display a table listing all the new subnets with their network IDs, usable host ranges, and broadcast addresses.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'FLSM (Fixed-Length Subnet Masking)', definition: 'A subnetting method where all created subnets have the same size and subnet mask.' },
    { term: 'VLSM (Variable-Length Subnet Masking)', definition: 'A more flexible method where subnets can be of different sizes to better match host requirements.' },
    { term: 'Subnetting', definition: 'The process of dividing a single, large IP network into multiple smaller, logical sub-networks.' },
    { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'The modern method of allocating IP addresses and routing packets, using a prefix to denote the network portion of an address (e.g., /24).' },
];
