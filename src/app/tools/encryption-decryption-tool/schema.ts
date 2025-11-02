
export const faqData = [
    { question: "What is encryption?", answer: "Encryption is the process of converting data from a readable format (plaintext) into a scrambled, unreadable format (ciphertext). This is done using an algorithm and a key. Only someone with the correct key can reverse the process (decryption) to read the original data." },
    { question: "What is symmetric-key encryption?", answer: "Symmetric encryption is a type of encryption where the same secret key is used for both encrypting and decrypting the data. It is very fast and efficient, making it ideal for encrypting large amounts of data. This tool uses AES, a symmetric algorithm. Its main challenge is securely sharing the secret key." },
    { question: "What is AES?", answer: "AES (Advanced Encryption Standard) is a symmetric block cipher that was adopted by the U.S. government and is now used as the global standard for encrypting sensitive data. It is widely considered to be secure against all known practical attacks when implemented correctly with a strong key." },
    { question: "Is this tool secure to use for my real secrets?", answer: "This is an educational tool. While it uses the strong AES algorithm, it should not be used for storing long-term, high-value secrets. Real-world secure systems involve more complex key management and protocols. However, for securely sending a message to a friend (and sharing the key via a separate channel), it's a practical demonstration." },
    { question: "What happens if I lose my secret key?", answer: "If you lose your secret key, the encrypted data is permanently lost. There is no 'forgot password' feature or backdoor. The security of the encryption relies on the fact that only the key can decrypt the data. This is why key management is so critical in cryptography." },
    { question: "Why is the ciphertext longer than the plaintext?", answer: "The ciphertext you see is in Base64 format. This is because the raw output of the AES algorithm is binary data. Base64 is used to encode this binary data into a text-safe string for easy copying and pasting. The ciphertext also includes the 'salt' and 'IV' (Initialization Vector), which are necessary for decryption and add to the total length." },
    { question: "Why do I get an error when I try to decrypt?", answer: "The most common reason for a decryption error is an incorrect secret key. Even a single character difference in the key will result in a completely different decryption key, causing the process to fail. It could also be because the ciphertext is corrupted or incomplete." },
    { question: "How is this different from hashing?", answer: "Encryption is a two-way process; what is encrypted can be decrypted with the correct key. Hashing is a one-way process; you can turn data into a hash, but you cannot reverse the process to get the original data back. Hashing is used for verifying integrity and storing passwords, while encryption is used for protecting the confidentiality of data. Explore this with our <a href='/tools/hash-generator-md5-sha' class='text-primary hover:underline'>Hash Generator</a>." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Encrypt and Decrypt Text',
    description: 'A guide to using the AES Encryption/Decryption Tool.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'Type the message you want to encrypt in the "Plaintext" box.' },
        { '@type': 'HowToStep', name: 'Enter Secret Key', text: 'Provide a strong password or key. This key will be required for decryption.' },
        { '@type': 'HowToStep', name: 'Encrypt', text: 'Click the "Encrypt" button. The resulting ciphertext will appear in the box below.' },
        { '@type': 'HowToStep', name: 'Decrypt', text: 'To decrypt, paste the ciphertext into the "Ciphertext" box, enter the exact same secret key, and click "Decrypt". The original message will appear as plaintext.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Encryption', definition: 'The process of converting readable plaintext into unreadable ciphertext.' },
    { term: 'Decryption', definition: 'The process of converting ciphertext back into its original plaintext.' },
    { term: 'Symmetric-Key Algorithm', definition: 'An encryption algorithm that uses the same key for both encryption and decryption (e.g., AES).' },
    { term: 'AES (Advanced Encryption Standard)', definition: 'The global standard for symmetric-key encryption, widely used to secure data at rest and in transit.' },
    { term: 'Ciphertext', definition: 'The scrambled, unreadable output of an encryption algorithm.' },
    { term: 'Plaintext', definition: 'The original, human-readable message or data.' },
    { term: 'Secret Key', definition: 'A piece of information (like a password) used by an encryption algorithm to transform plaintext into ciphertext and back again.' },
];
