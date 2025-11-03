

export const faqData = [
    { question: "What is the Caesar cipher?", answer: "The Caesar cipher is one of the simplest and most widely known encryption techniques. It's a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet." },
    { question: "Why is it named after Caesar?", answer: "It is named after Julius Caesar, who, according to Suetonius, used it with a shift of three to protect messages of military significance. While Caesar's was the first recorded use, other substitution ciphers were used earlier." },
    { question: "How does the 'shift' work?", answer: "The shift is the 'key' to the cipher. A shift of 3 means 'A' becomes 'D', 'B' becomes 'E', and so on. The alphabet wraps around, so with a shift of 3, 'X' becomes 'A'. This tool allows any shift from 1 to 25." },
    { question: "Is the Caesar cipher secure?", answer: "No, it provides no real security. It can be broken very easily in a few ways. The most common is a 'brute-force' attack, where the attacker simply tries all 25 possible shifts until the message becomes readable. It can also be broken with frequency analysis." },
    { question: "What is ROT13?", answer: "ROT13 is a special case of the Caesar cipher with a fixed shift of 13. Because there are 26 letters in the alphabet, applying ROT13 twice restores the original text, meaning the same function can be used for both encryption and decryption. You can try it with our <a href='/tools/rot13-encoder-decoder' class='text-primary hover:underline'>ROT13 tool</a>." },
    { question: "What happens to numbers and symbols?", answer: "The standard Caesar cipher only applies to alphabetic characters. Numbers, symbols, and whitespace are typically left unchanged. This tool adheres to that standard." },
    { question: "Is it safe to use this tool with sensitive information?", answer: "Yes, the tool is safe because all operations are performed in your browser. No data is sent to our servers. However, you should never use the Caesar cipher itself to protect any sensitive information, as the method is completely insecure." },
    { question: "What is frequency analysis?", answer: "Frequency analysis is a cryptanalytic technique used to break ciphers by observing how often different letters appear in the ciphertext. In English, 'E' is the most common letter. If 'H' is the most common letter in your ciphertext, it's very likely that 'E' was shifted to become 'H', which would reveal a shift of 3." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Caesar Cipher Tool',
    description: 'A step-by-step guide to encrypting and decrypting messages with the Caesar cipher.',
    step: [
        { '@type': 'HowToStep', name: 'Select a Shift Value', text: 'Use the slider to choose a shift value (the "key") between 1 and 25.' },
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encrypt, type your message in the "Decoded" box. To decrypt, paste your ciphertext in the "Encoded" box.' },
        { '@type': 'HowToStep', name: 'View the Result', text: 'The tool will instantly show the translated text in the other box as you type.' },
        { '@type': 'HowToStep', name: 'Copy or Swap', text: 'Use the copy button to grab the output, or the swap button to switch the contents of the two boxes.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Substitution Cipher', definition: 'A method of encryption where units of plaintext are replaced with ciphertext according to a fixed system.' },
    { term: 'Caesar Cipher', definition: 'A specific type of substitution cipher where each letter is shifted by a fixed number of positions down the alphabet.' },
    { term: 'Shift (Key)', definition: 'The secret number of positions that the letters are shifted. In a Caesar cipher, the shift value is the key.' },
    { term: 'Plaintext', definition: 'The original, unencrypted message.' },
    { term: 'Ciphertext', definition: 'The encrypted, unreadable message.' },
    { term: 'Frequency Analysis', definition: 'A cryptanalytic technique used to break ciphers by analyzing the frequency of letters or groups of letters in a ciphertext.' },
];
