
export const faqData = [
    { question: "What is file integrity?", answer: "File integrity is the assurance that a digital file is complete and has not been altered or corrupted from its original state. Verifying integrity is a way to confirm that the file you have is identical to the one the source provided." },
    { question: "What is a checksum or hash?", answer: "A checksum or hash is a unique, fixed-size 'digital fingerprint' generated from a file's contents using a cryptographic hash function. If even one bit of the file changes, the resulting hash will be completely different." },
    { question: "How does this tool verify file integrity?", answer: "This tool uses cryptographic hash algorithms (SHA-1, SHA-256, SHA-512) to compute a checksum for the file you provide. You can then compare this calculated checksum to the one provided by the file's source. If they match exactly, the file's integrity is verified." },
    { question: "Why should I verify a downloaded file?", answer: "Verification is a crucial security step. It protects you from two main risks: 1) Data Corruption, where the file was damaged during download, and 2) Malicious Tampering, where an attacker has modified the file to include malware or a virus. A hash mismatch is a red flag for both." },
    { question: "Is this tool secure? Is my file uploaded anywhere?", answer: "Yes, this tool is completely secure and private. It uses modern browser APIs (`FileReader` and `Web Crypto API`) to read and process the file entirely on your local machine. Your file's data never leaves your computer and is not uploaded to our server." },
    { question: "Which hash algorithm should I use?", answer: "You should use whichever hash the software provider offers. However, if multiple options are available, always prefer the most secure one available, which is typically SHA-256 or SHA-512. SHA-1 is older and no longer recommended for security-critical applications." },
    { question: "Why does calculating the hash for a large file take a long time?", answer: "The hashing algorithm must read every single byte of the file to compute the final checksum. For large files (several gigabytes), this can take a significant amount of time and CPU power on your local machine." },
    { question: "What should I do if the hashes do not match?", answer: "Do not open or run the file. Delete it immediately. A hash mismatch is a definitive sign that the file you have is not the original. Try downloading the file again, preferably from an official and different source if possible. If it still fails, contact the software provider to report the issue." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Verify File Integrity with a Checksum',
    description: 'A step-by-step guide to using a checksum to verify that a file is not corrupt or tampered with.',
    step: [
        { '@type': 'HowToStep', name: 'Obtain the Official Checksum', text: 'From the software developer\'s official website, copy the checksum (e.g., the SHA-256 hash) provided for the file you are downloading.' },
        { '@type': 'HowToStep', name: 'Select Your File', text: 'In this tool, drag and drop your downloaded file into the designated area, or click to select it from your computer.' },
        { '@type': 'HowToStep', name: 'Generate the Hashes', text: 'The tool will automatically read the file and calculate its hashes. This may take a moment for large files.' },
        { '@type': 'HowToStep', name: 'Compare the Hashes', text: 'Compare the generated hash in the tool with the official hash you copied in step 1. They must be identical.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'File Integrity', definition: 'The state of a file being whole, complete, and unaltered from its original version.' },
    { term: 'Checksum', definition: 'A small-sized block of data derived from another block of digital data for the purpose of detecting errors. A hash is a type of checksum.' },
    { term: 'Cryptographic Hash Function', definition: 'An algorithm that produces a fixed-size, unique "fingerprint" (hash) from any given input data. It is one-way and collision-resistant.' },
    { term: 'SHA-256', definition: 'A secure and widely used cryptographic hash function that produces a 256-bit (64-character hexadecimal) hash. It is the current industry standard for file integrity verification.' },
    { term: 'MD5', definition: 'An older hash function that produces a 128-bit hash. It is no longer considered secure against malicious attacks but is still sometimes used for basic file corruption checks.' },
    { term: 'Collision', definition: 'A scenario where two different input files produce the exact same hash output. This is practically impossible for secure algorithms like SHA-256 but has been demonstrated for MD5.' },
];
