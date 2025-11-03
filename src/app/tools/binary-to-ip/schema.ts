
export const faqData = [
    {
      question: "Why is an IPv4 address 32 bits?",
      answer: "An IPv4 address is 32 bits long because it was designed with a structure of four octets (4 x 8 = 32 bits). This structure allows for approximately 4.3 billion (2^32) unique addresses, which was considered more than enough for the foreseeable future of the internet at the time of its creation."
    },
    {
      question: "Can a binary IP be shorter or longer than 32 bits?",
      answer: "No, a valid IPv4 address must be exactly 32 bits long. If your binary string is shorter, you likely need to pad it with leading zeros in one or more octets (e.g., `1010` becomes `00001010`). If it's longer, it's not a valid IPv4 address. This tool will show an error for any input that isn't 32 bits."
    },
    {
      question: "What's the main difference between IPv4 and IPv6?",
      answer: "The primary difference is the length and format. IPv4 is a 32-bit address represented in decimal, while IPv6 is a 128-bit address represented in hexadecimal. IPv6 was created to solve the problem of IPv4 address exhaustion, offering a vastly larger address space (2^128)."
    },
    {
      question: "What is an octet?",
      answer: "In networking, an octet is a group of 8 bits. An IPv4 address is composed of four octets, each of which can represent a decimal number from 0 (binary `00000000`) to 255 (binary `11111111`)."
    },
    {
      question: "Do I need to include the dots in the binary string?",
      answer: "No, it's optional. You can provide a continuous 32-bit string, and the tool will automatically divide it into four 8-bit octets for conversion. However, using dots can make it easier for you to read and verify your input."
    },
    {
      question: "How are binary numbers used in subnet masks?",
      answer: "A subnet mask uses a string of consecutive '1's followed by '0's to define the network and host portions of an IP address. The '1's correspond to the network ID, and the '0's correspond to the host ID. For example, the mask `255.255.255.0` is `11111111.11111111.11111111.00000000` in binary, indicating the first 24 bits are for the network. You can explore this further with our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a>."
    },
    {
      question: "What is the highest and lowest number an octet can represent?",
      answer: "The lowest value is 0 (binary `00000000`). The highest value is 255 (binary `11111111`), which is calculated by adding all the positional values: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1."
    },
    {
      question: "Is `192.168.1.1` a public or private IP address?",
      answer: "It is a private IP address. Private IP address ranges (like 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16) are reserved for use within local networks and are not routable on the public internet. You can use our <a href='/tools/ip-privacy-checker' class='text-primary hover:underline'>Public vs Private IP Checker</a> to verify this."
    },
    {
      question: "Can I convert an IPv6 address with this tool?",
      answer: "No, this tool is specifically designed for IPv4 addresses. IPv6 addresses are 128 bits long and are represented in hexadecimal format, so they require a different conversion process."
    },
    {
      question: "Why does my conversion fail even if I have 32 bits?",
      answer: "The most likely reason is an invalid character. The input must only contain '0's and '1's (and optional dots or spaces, which are stripped). Any other character, including letters or other numbers, will result in an error. Double-check your input for typos."
    }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert a Binary String to an IP Address',
    description: 'A step-by-step guide to converting a 32-bit binary string into its standard dot-decimal IPv4 address representation.',
    step: [
        {
            '@type': 'HowToStep',
            name: 'Enter the Binary String',
            text: 'In the input field, type or paste the 32-bit binary string you want to convert.',
        },
        {
            '@type': 'HowToStep',
            name: 'Convert',
            text: 'Click the "Convert" button. The tool will validate the input for correctness.',
        },
        {
            '@type': 'HowToStep',
            name: 'View and Copy the Result',
            text: 'The converted IPv4 address will appear in the result field. Click the clipboard icon to copy it.',
        },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Binary', definition: 'A base-2 number system that uses only two digits, 0 and 1. This is the fundamental language of computers.' },
    { term: 'Bit', definition: 'A single binary digit (a 0 or a 1), which is the smallest unit of data in computing.' },
    { term: 'Octet', definition: 'A group of 8 bits. An IPv4 address is composed of four octets.' },
    { term: 'IPv4 Address', definition: 'A 32-bit numerical label assigned to each device on a network, written in dot-decimal notation.' },
    { term: 'Dot-Decimal Notation', definition: 'The human-readable format for IPv4 addresses (e.g., 192.168.1.1).' },
];
