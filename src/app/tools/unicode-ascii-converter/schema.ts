
export const faqData = [
    { question: "What is the difference between ASCII and Unicode?", answer: "ASCII is an early, 7-bit character set that represents 128 characters, mostly for English text and control characters. Unicode is a modern, universal standard that defines a unique number (code point) for every character in every language, including symbols and emoji. Unicode is a superset of ASCII." },
    { question: "What is a 'code point'?", answer: "A code point is the unique number assigned by the Unicode standard to a single character. It is typically written in hexadecimal with a 'U+' prefix, for example, `U+0041` for the letter 'A'." },
    { question: "What is UTF-8?", answer: "UTF-8 is an encoding that represents Unicode code points as a sequence of bytes. Its key feature is being a variable-width encoding: it uses 1 byte for all ASCII characters, and up to 4 bytes for other characters. This makes it efficient and backward-compatible with ASCII, and it has become the dominant character encoding on the web." },
    { question: "Why do I see strange characters like 'â€TM' on a webpage?", answer: "This is a classic sign of an encoding mismatch. It often happens when text saved as UTF-8 (which might use multiple bytes for a character like a smart quote) is misinterpreted by the browser as a different single-byte encoding (like Windows-1252). Each byte of the multi-byte character is displayed individually, resulting in gibberish." },
    { question: "Is it safe to use this tool with sensitive information?", answer: "Yes. All conversions happen entirely within your browser using JavaScript. No data is sent to our servers, ensuring your information remains completely private." },
    { question: "What does 'U+1F60A' mean?", answer: "This is the Unicode code point for the 'Smiling Face with Smiling Eyes' emoji (😊). The `1F60A` is a hexadecimal number. This tool can convert that emoji into its code point and vice-versa." },
    { question: "How many characters are in Unicode?", answer: "The Unicode standard has space for over a million characters. As of version 15.1, it includes more than 149,000 characters, covering over 160 modern and historic scripts, as well as a vast collection of symbols, emoji, and pictographs." },
    { question: "Does this tool handle all Unicode characters?", answer: "Yes, this tool uses modern JavaScript which has native support for the full Unicode character set. It can correctly handle multi-byte characters, including emoji and characters from all modern languages." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Unicode/ASCII Converter',
    description: 'A step-by-step guide to converting between text characters and their numerical code points.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text or Code Points', text: 'Type plain text (including emoji) into the top box, or space-separated Unicode/ASCII code points (e.g., U+0041 66 U+1F60A) into the bottom box.' },
        { '@type': 'HowToStep', name: 'View Real-Time Conversion', text: 'The tool will automatically convert your input to the other format as you type.' },
        { '@type': 'HowToStep', name: 'Copy the Result', text: 'Use the copy button next to either output to copy the text or the code points to your clipboard.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'ASCII', definition: 'American Standard Code for Information Interchange. An early 7-bit character set for English characters and control codes.' },
    { term: 'Unicode', definition: 'A universal character set that defines a unique numerical code point for every character in every language.' },
    { term: 'Code Point', definition: 'The unique number assigned by Unicode to a character, often written in hexadecimal (e.g., U+0041 for "A").' },
    { term: 'Character Encoding', definition: 'A system that maps Unicode code points to a sequence of bytes for storage or transmission. UTF-8 is the most common encoding.' },
    { term: 'UTF-8', definition: 'A variable-width character encoding that is backward-compatible with ASCII and is the dominant encoding for the web.' },
];
