
export const faqData = [
    { question: "What is encryption?", answer: "Encryption is the process of converting data from a readable format (plaintext) into a scrambled, unreadable format (ciphertext). This is done using an algorithm and a key. Only someone with the correct key can reverse the process (decryption) to read the original data." },
    { question: "What is symmetric-key encryption?", answer: "Symmetric encryption is a type of encryption where the same secret key is used for both encrypting and decrypting the data. It is very fast and efficient, making it ideal for encrypting large amounts of data. This tool uses AES, a symmetric algorithm. Its main challenge is securely sharing the secret key." },
    { question: "What is AES-GCM?", answer: "AES (Advanced Encryption Standard) is a global standard for encryption. GCM (Galois/Counter Mode) is a mode of operation for AES that provides both data confidentiality (encryption) and data authenticity (integrity checking). This means it not only scrambles the data but also ensures it hasn't been tampered with, making it a highly secure and recommended choice." },
    { question: "Is this tool secure to use for my real secrets?", answer: "This tool uses the strong, industry-standard AES-GCM algorithm via the browser's built-in Web Crypto API. For securely sending a message to someone (where you share the key via a separate channel), it is a very practical and secure method. However, for long-term, 'at-rest' storage of critical secrets, dedicated, audited software is always recommended." },
    { question: "What happens if I lose my secret key?", answer: "If you lose your secret key, the encrypted data is permanently and irretrievably lost. There is no 'forgot password' feature or backdoor. The security of the encryption relies on the fact that only the key can decrypt the data. This is why key management is so critical." },
    { question: "Why is the ciphertext longer than the plaintext?", answer: "The ciphertext you see is in Base64 format. This is because the raw output of the AES algorithm is binary data. Base64 is used to encode this binary data into a text-safe string for easy copying and pasting. The ciphertext also includes a 'salt' and an 'IV' (Initialization Vector), which are random data necessary for the security of the encryption and for decryption, adding to the total length." },
    { question: "Why did my decryption fail?", answer: "A decryption error almost always means one of two things: 1) The secret key is incorrect, even by a single character. 2) The ciphertext has been altered or corrupted in some way. The AES-GCM mode used by this tool has a built-in integrity check, so it will refuse to decrypt data that has been tampered with." },
    { question: "How is this different from hashing?", answer: "Encryption is a two-way process; what is encrypted can be decrypted with the correct key. Hashing is a one-way process; you can turn data into a hash, but you cannot reverse the process to get the original data back. Hashing is used for verifying integrity and storing passwords, while encryption is used for protecting the confidentiality of data. Explore this with our <a href='/tools/hash-generator-md5-sha' class='text-primary hover:underline'>Hash Generator</a>." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Encrypt and Decrypt Text with AES',
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
    { term: 'AES-GCM', definition: 'Advanced Encryption Standard in Galois/Counter Mode. A modern, highly secure mode that provides both confidentiality and data authenticity.' },
    { term: 'Ciphertext', definition: 'The scrambled, unreadable output of an encryption algorithm.' },
    { term: 'Plaintext', definition: 'The original, human-readable message or data.' },
    { term: 'Secret Key', definition: 'A piece of information (like a password) used by an encryption algorithm to transform plaintext into ciphertext and back again.' },
    { term: 'Salt', definition: 'Random data used as an additional input to a key derivation function to protect against pre-computation attacks.' },
    { term: 'Initialization Vector (IV)', definition: 'A random number used to ensure that encrypting the same plaintext multiple times with the same key will produce different ciphertexts.' },
];
