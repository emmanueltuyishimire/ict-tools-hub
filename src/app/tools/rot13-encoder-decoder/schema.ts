
export const faqData = [
    { question: "What is ROT13?", answer: "ROT13 ('rotate by 13 places') is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet. It is a special case of the Caesar cipher." },
    { question: "Why is ROT13 its own inverse?", answer: "The English alphabet has 26 letters. Shifting by 13 places twice (13 + 13 = 26) results in a full rotation back to the original letter. This means the same ROT13 function can be used for both encoding and decoding a message." },
    { question: "Is ROT13 a form of encryption?", answer: "No. It provides no cryptographic security and should never be used to protect sensitive information. It is a form of simple obfuscation, intended only to hide text from a casual glance." },
    { question: "What was ROT13 used for historically?", answer: "It became popular in the early days of the internet on Usenet forums as a standard way to hide spoilers, punchlines, puzzle solutions, and potentially offensive material from accidental viewing." },
    { question: "Does ROT13 affect numbers or symbols?", answer: "No, the standard ROT13 cipher only applies to the 26 letters of the English alphabet. All numbers, symbols, and whitespace are left unchanged. This tool follows that standard." },
    { question: "How does ROT13 differ from the general Caesar cipher?", answer: "The <a href='/tools/caesar-cipher' class='text-primary hover:underline'>Caesar Cipher</a> allows for any shift value from 1 to 25. ROT13 is just a Caesar cipher with the shift value permanently fixed at 13." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the ROT13 Encoder/Decoder',
    description: 'A simple guide to encoding and decoding text with the ROT13 cipher.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'Type your plaintext or ROT13-encoded text into either of the text boxes.' },
        { '@type': 'HowToStep', name: 'View Real-Time Conversion', text: 'The tool will instantly convert your input and display the result in the other text box.' },
        { '@type': 'HowToStep', name: 'Copy the Result', text: 'Use the copy button to copy the output to your clipboard.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'ROT13', definition: 'A simple substitution cipher that replaces a letter with the 13th letter after it in the alphabet.' },
    { term: 'Caesar Cipher', definition: 'A family of substitution ciphers where each letter is shifted by a fixed number of positions. ROT13 is a specific case with a shift of 13.' },
    { term: 'Substitution Cipher', definition: 'A method of encryption where units of plaintext are replaced with ciphertext according to a fixed system.' },
    { term: 'Obfuscation', definition: 'The action of making something obscure, unclear, or unintelligible. ROT13 is used for obfuscation, not for security.' },
    { term: 'Inverse', definition: 'An operation that reverses the effect of another operation. ROT13 is its own inverse because applying it twice returns the original text.' },
];
