
export const faqData = [
    { id: "password-manager-faq", question: "What is a password manager and should I use one?", answer: "A password manager is a secure, encrypted application designed to store all your passwords. It allows you to generate and use long, complex, unique passwords for every site without having to memorize them. You only need to remember one strong master password. Using a password manager is one of the most effective security practices you can adopt today." },
    { id: "entropy-faq", question: "What is password entropy?", answer: "Entropy is a measure of a password's randomness, measured in 'bits.' A higher bit value means the password is exponentially harder for an attacker to guess. This generator creates passwords with high entropy. You can analyze it precisely with our <a href='/tools/password-entropy-calculator' class='text-primary hover:underline'>Password Entropy Calculator</a>." },
    { id: "length-faq", question: "Why is password length more important than complexity?", answer: "Each character you add to a password exponentially increases the number of possible combinations an attacker has to try. A long passphrase (e.g., 20+ characters) made of simple words has vastly more combinations than a short, 8-character password with symbols, making it much stronger against brute-force attacks." },
    { id: "secure-faq", question: "Is this password generator secure?", answer: "Yes. This tool uses `window.crypto.getRandomValues()`, a cryptographically secure pseudo-random number generator (CSPRNG) built into modern browsers. All generation happens on your local machine, and your passwords are never sent over the internet." },
    { id: "passphrase-faq", question: "What is a passphrase and is it better?", answer: "A passphrase is a password made up of multiple words, like `GreenDeskRunFast47!`. They are often more secure than traditional passwords because they can be made very long while still being memorable for humans. Length is the most critical factor for password strength." },
    { id: "reuse-faq", question: "Why is it so bad to reuse passwords?", answer: "If a website you use suffers a data breach, your password can be leaked. Attackers then use automated scripts to try that same email and password combination on thousands of other websites (banks, email, etc.). This is called 'credential stuffing'. Using a unique password for every single account is your only defense." },
    { id: "2fa-faq", question: "What is Two-Factor Authentication (2FA)?", answer: "2FA adds a second layer of security to your accounts. After entering your password, you must provide a second piece of information, usually a temporary code from an app on your phone. This means even if an attacker steals your password, they cannot log in without physical access to your device. You should enable it on all important accounts." },
    { id: "ambiguous-faq", question: "Why should I exclude ambiguous characters?", answer: "Excluding characters like `I`, `l`, `1`, `O`, and `0` is useful if you ever need to read or manually type the password. It prevents confusion and transcription errors. For passwords that will only ever be copied and pasted, this is less of a concern." },
    { id: "hash-faq", question: "How should passwords be stored?", answer: "Passwords should never be stored in plain text. A secure system stores a 'hash' of the password, which is a one-way cryptographic fingerprint. When you log in, the system hashes your input and compares it to the stored hash. Learn more with our <a href='/tools/hash-generator-md5-sha' class='text-primary hover:underline'>Hash Generator</a>." },
    { id: "refresh-faq", question: "How often should I change my passwords?", answer: "Modern security guidance, including from NIST, has moved away from mandatory, frequent password changes. It's better to have a very strong, unique password for each service and only change it if you suspect that specific account has been compromised." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a Secure Password',
    description: 'A step-by-step guide to using the Secure Password Generator.',
    step: [
        { '@type': 'HowToStep', name: 'Set Length', text: 'Use the slider to choose a password length. 16 or more characters is recommended.' },
        { '@type': 'HowToStep', name: 'Choose Character Sets', text: 'Select the checkboxes for the character types you want to include (lowercase, uppercase, numbers, symbols) to increase the password\'s complexity.' },
        { '@type': 'HowToStep', name: 'Exclude Ambiguous Characters', text: 'Optionally, define characters to exclude, such as `I`, `l`, `1`, `O`, `0` to improve readability.' },
        { '@type': 'HowToStep', name: 'Generate and Analyze', text: 'Click the "Generate Password" button. A new password will be created and its strength will be analyzed in the adjacent panel.' },
        { '@type': 'HowToStep', name: 'Copy and Save', text: 'Use the copy button to copy the password, then save it securely in a trusted password manager.' }
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Password Entropy', definition: 'A mathematical measure, in bits, of a password\'s unpredictability. Higher entropy means a stronger password that is more resistant to brute-force attacks.' },
    { term: 'Brute-Force Attack', definition: 'An attack method where an attacker systematically tries every possible combination of characters until the correct password is found.' },
    { term: 'CSPRNG', definition: 'Cryptographically Secure Pseudo-Random Number Generator. An algorithm that generates unpredictable random numbers suitable for security applications, which this tool uses.' },
    { term: 'Passphrase', definition: 'A type of password that consists of a sequence of words or other text. Long passphrases can be more secure and more memorable than short, complex passwords.' },
    { term: 'Password Manager', definition: 'A software application designed to securely store and manage passwords in an encrypted database.' },
    { term: 'Credential Stuffing', definition: 'An attack where stolen account credentials from one data breach are used to try and log into other unrelated services.' },
];
