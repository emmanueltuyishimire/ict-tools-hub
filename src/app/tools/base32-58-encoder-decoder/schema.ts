
export const faqData = [
    { question: "What are Base32 and Base58?", answer: "Base32 and Base58 are binary-to-text encoding schemes, similar to Base64. They are designed to represent binary data in a text format that is more human-readable and less prone to transcription errors than Base64." },
    { question: "Why use Base32 or Base58 instead of Base64?", answer: "Base64 includes both uppercase and lowercase letters, making it case-sensitive, and uses '+' and '/' symbols which are not URL-safe. Base32 is case-insensitive. Base58 goes further by removing visually ambiguous characters like '0' (zero), 'O' (uppercase o), 'I' (uppercase i), and 'l' (lowercase L), making it ideal for manual data entry like cryptocurrency addresses." },
    { question: "Where is Base58 primarily used?", answer: "Base58 is most famously used for encoding Bitcoin and other cryptocurrency wallet addresses. Its design minimizes the risk of errors when a user has to manually type or read a long address string." },
    { question: "Where is Base32 primarily used?", answer: "Base32 is often used in applications where case-insensitivity is important or where the output might be used in filesystems or DNS records. It's also commonly used for the manual-entry 'secret keys' in two-factor authentication systems. You can see this in our <a href='/tools/totp-demo' class='text-primary hover:underline'>2FA TOTP Demo</a>." },
    { question: "Are these encodings a form of encryption?", answer: "No, absolutely not. Like Base64, these are encoding schemes, not encryption. They provide no security and are easily reversible. Their purpose is data representation, not data protection." },
    { question: "Is this tool safe for sensitive data?", answer: "Yes. All encoding and decoding operations are performed entirely within your browser using JavaScript. No data is sent to our servers." },
    { question: "Which encoding is more efficient?", answer: "Base64 is the most space-efficient, followed by Base58, and then Base32. The smaller the character set, the longer the resulting encoded string will be for the same amount of binary data." },
    { question: "What is Base58Check?", answer: "Base58Check is a variant of Base58 used in cryptocurrencies. It appends a checksum (a hash of the data) to the end of the data before encoding. When decoding, this checksum is verified to ensure the address was transcribed without any errors. This tool uses the raw Base58 encoding, not Base58Check." },
    { question: "Why don't I see padding characters like '=' in Base58?", answer: "Unlike Base64 or Base32, the Base58 encoding algorithm does not require padding. It treats the entire input as a single large number and converts it to base-58, which doesn't align to byte boundaries in the same way." },
    { question: "Can this tool handle large amounts of data?", answer: "This tool is designed for moderately sized text strings. Because all operations run in your browser, attempting to encode very large files could cause the browser to become slow or unresponsive." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Base32/Base58 Encoder/Decoder',
    description: 'A guide to converting text to and from Base32 and Base58 formats.',
    step: [
        { '@type': 'HowToStep', name: 'Select Encoding Type', text: 'Choose either the "Base32" or "Base58" tab.' },
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type plain text into the top "Decoded" box. To decode, paste your Base32 or Base58 string into the bottom "Encoded" box.' },
        { '@type': 'HowToStep', name: 'View Real-Time Results', text: 'The tool works in real-time, instantly showing the converted text in the other box.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Base32', definition: 'An encoding scheme using a 32-character set (A-Z, 2-7). It is case-insensitive, making it useful for systems that do not distinguish between uppercase and lowercase.' },
    { term: 'Base58', definition: 'An encoding scheme designed for human-readability, omitting visually ambiguous characters like 0 (zero), O (uppercase o), I (uppercase i), and l (lowercase L). Famously used for Bitcoin addresses.' },
    { term: 'Binary-to-Text Encoding', definition: 'A method of representing binary data in a plain text format, making it safe for transmission over systems designed to handle text.' },
    { term: 'Checksum', definition: 'A small piece of data derived from a block of digital data for the purpose of detecting errors that may have been introduced during its transmission or storage. Used in Base58Check.' },
    { term: 'Case-Insensitive', definition: 'A property of an encoding (like Base32) where uppercase and lowercase letters are treated as the same character.' },
    { term: 'Human-Readable', definition: 'A representation of data that is easy for a person to read and understand. Base58 is designed to be highly human-readable to prevent transcription errors.' },
];
