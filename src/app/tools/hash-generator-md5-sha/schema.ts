
export const faqData = [
    { question: "What is a cryptographic hash function?", answer: "A cryptographic hash function is a mathematical algorithm that takes an input of any size and produces a fixed-size string of characters, which is the 'hash'. This process is one-way, meaning it's practically impossible to reverse. Key properties include determinism (the same input always produces the same output) and collision resistance (it's extremely difficult to find two different inputs that produce the same output)." },
    { question: "Is MD5 secure? Why is it considered broken?", answer: "No, MD5 is not secure for cryptographic purposes like password storage. It is considered 'cryptographically broken' because practical collision attacks have been demonstrated, meaning attackers can find two different inputs that produce the same MD5 hash. This makes it vulnerable. It should only be used for non-security purposes, like as a basic checksum to verify file integrity." },
    { question: "What is the difference between SHA-1, SHA-256, and SHA-512?", answer: "They are all part of the SHA (Secure Hash Algorithm) family but differ in their output size and security level. SHA-1 produces a 160-bit hash and is now considered insecure. SHA-256 and SHA-512 are part of the SHA-2 family, producing 256-bit and 512-bit hashes respectively. SHA-256 is the current industry standard for most applications, including SSL certificates and blockchain technology, while SHA-512 offers an even higher level of security." },
    { question: "Is it safe to enter my data into this tool?", answer: "Yes. All hashing calculations are performed entirely within your web browser using JavaScript's built-in Web Crypto API (and a JS implementation for MD5). Your data is never sent to our servers, ensuring your privacy and security." },
    { question: "What is a 'hash collision'?", answer: "A hash collision occurs when two different inputs produce the exact same hash output. For a secure cryptographic hash function, finding a collision should be computationally infeasible (i.e., it would take millions of years with current technology). The discovery of practical collision attacks against MD5 and SHA-1 is why they are no longer considered secure." },
    { question: "What is 'salting' and how does it relate to hashing?", answer: "Salting is a crucial technique used in password hashing. Before hashing a user's password, a unique, random string (the 'salt') is added to it. This means that even if two users have the same password, their stored hashes will be different. Salting makes 'rainbow table' attacks (which use pre-computed hash values) ineffective. Our <a href='/tools/salting-hashing-demo' class='text-primary hover:underline'>Salting & Hashing Demo Tool</a> illustrates this concept." },
    { question: "Can I use this tool to hash a file?", answer: "This tool is designed for text input only. To hash a file, you would need a tool that can read the file's binary data and process it through the hashing algorithm. Command-line tools like `md5sum` or `shasum` are commonly used for this purpose." },
    { question: "Why do the SHA hashes look longer than the MD5 hash?", answer: "This is because they have a larger output size. MD5 produces a 128-bit hash (32 hexadecimal characters). SHA-1 produces a 160-bit hash (40 characters). SHA-256 produces a 256-bit hash (64 characters), and SHA-512 produces a 512-bit hash (128 characters). The longer the hash, the more possible combinations exist, making it more secure against collisions and brute-force attacks." },
    { question: "What are checksums?", answer: "A checksum is a value calculated from a block of data, used to detect errors that may have been introduced during its transmission or storage. While any hash function can be used to generate a checksum, non-cryptographic checksums are often faster but offer no security against intentional modification. MD5 is commonly used as a checksum to verify file integrity after a download." },
    { question: "How does blockchain technology use hashing?", answer: "Hashing is fundamental to blockchain. Each block in the chain contains a hash of the previous block's header, creating a secure, tamper-evident chain. If a single piece of data in a previous block is altered, its hash will change, which would cause all subsequent block hashes to change, immediately revealing the tampering. Bitcoin, for example, heavily uses the SHA-256 algorithm." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate MD5/SHA Hashes',
    description: 'A step-by-step guide to generating cryptographic hashes from text.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Input Text', text: 'Type or paste the text you want to hash into the "Input Text" area.' },
        { '@type': 'HowToStep', name: 'View Real-Time Results', text: 'The tool automatically calculates the MD5, SHA-1, SHA-256, and SHA-512 hashes for your input as you type.' },
        { '@type': 'HowToStep', name: 'Copy a Hash', text: 'Click the copy icon next to any of the generated hashes to copy it to your clipboard for use in your application, script, or documentation.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Hash Function', definition: 'An algorithm that converts an input of arbitrary size into a fixed-size output, known as the hash value.' },
    { term: 'One-Way Function', definition: 'A function that is easy to compute in one direction (input to output) but computationally infeasible to compute in the reverse direction (output to input).' },
    { term: 'Collision Resistance', definition: 'A property of a cryptographic hash function that makes it extremely difficult to find two different inputs that produce the same hash output.' },
    { term: 'Checksum', definition: 'A value used to verify the integrity of a file or data transfer, ensuring it has not been accidentally corrupted.' },
    { term: 'Salting', definition: 'The process of adding a unique, random string to a password before hashing it to protect against rainbow table attacks.' },
    { term: 'SHA (Secure Hash Algorithm)', definition: 'A family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST).' },
];
