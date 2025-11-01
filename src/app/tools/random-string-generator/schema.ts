
export const faqData = [
    { question: "What is a random string?", answer: "A random string is a sequence of characters generated in a way that is unpredictable. It is used in computing for a variety of purposes where a unique, non-guessable value is needed, such as for passwords, session tokens, API keys, and temporary filenames." },
    { question: "Is this generator cryptographically secure?", answer: "Yes. This tool uses `window.crypto.getRandomValues()`, which is a standardized Web API for generating cryptographically secure random numbers. This provides a much higher level of security and unpredictability than standard pseudo-random number generators like `Math.random()`." },
    { question: "What is the difference between pseudo-random and 'true' random?", answer: "Pseudo-Random Number Generators (PRNGs) create sequences of numbers that appear random but are actually deterministic, based on an initial 'seed' value. Cryptographically Secure Pseudo-Random Number Generators (CSPRNGs), which this tool uses, are designed to be unpredictable by gathering entropy from various system-level sources (like hardware timing and user input), making them suitable for security-sensitive applications." },
    { question: "Why is length important for a random string?", answer: "Length is a critical factor in the security of a random string. Each additional character exponentially increases the total number of possible combinations, making it exponentially harder for an attacker to guess the string through a brute-force attack. A longer string has higher entropy." },
    { question: "What is entropy?", answer: "Entropy, in this context, is a measure of the randomness or unpredictability of the generated string. It is calculated in 'bits' and depends on both the length of the string and the size of the character set it is drawn from. Higher entropy means a more secure string. You can analyze this with our <a href='/tools/password-strength-checker' class='text-primary hover:underline'>Password Strength Checker</a>." },
    { question: "Why would I want to exclude certain characters?", answer: "Excluding characters is useful when the string needs to be read or transcribed by a human. It's common to exclude characters that are easily confused, such as 'I' (uppercase i), 'l' (lowercase L), '1' (one), 'O' (uppercase o), and '0' (zero), to prevent ambiguity and errors." },
    { question: "Is it safe to use this tool for generating passwords?", answer: "Yes, because it uses a cryptographically secure random source and all generation happens on your computer. However, for creating user passwords, you might also consider our <a href='/tools/password-generator' class='text-primary hover:underline'>Password Generator</a>, which offers options for creating more memorable (but still strong) passphrases." },
    { question: "How large can I make the string?", answer: "This tool has a practical limit (e.g., 128 characters) to ensure the user interface remains responsive. While cryptographically you could generate much longer strings, lengths between 16 and 64 are sufficient for most common security applications like API keys and tokens." },
    { question: "What are some common use cases for a random string generator?", answer: "Common uses include creating secure default passwords, generating unique API keys for developers, creating session IDs for user logins, generating salts for password hashing, and creating unique, non-colliding names for temporary files or database entries." },
    { question: "Does a random string need to be hashed before storing?", answer: "If the string is being used as a password, yes, it should absolutely be hashed using a modern algorithm like Argon2 or bcrypt before being stored in a database. If it's a session token or API key, the key itself is often stored in the database for comparison. You can learn more with our <a href='/tools/hash-generator-md5-sha' class='text-primary hover:underline'>Hash Generator</a>." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a Secure Random String',
    description: 'A step-by-step guide to using the Random String Generator.',
    step: [
        { '@type': 'HowToStep', name: 'Set Length', text: 'Use the slider or input to define the desired length of your string.' },
        { '@type': 'HowToStep', name: 'Choose Character Sets', text: 'Select the checkboxes for the character types you want to include (lowercase, uppercase, numbers, symbols).' },
        { '@type': 'HowToStep', name: 'Exclude Characters', text: 'Optionally, enter any characters you wish to exclude from the generated string to avoid ambiguity.' },
        { '@type': 'HowToStep', name: 'Generate and Copy', text: 'Click the "Generate String" button. A secure random string will be created. Use the copy button to copy it to your clipboard.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Random String', definition: 'A sequence of characters generated from a specified set in an unpredictable manner.' },
    { term: 'Entropy', definition: 'A measure of randomness or unpredictability, typically measured in bits. Higher entropy means a more secure string.' },
    { term: 'CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)', definition: 'An algorithm for generating random numbers that is suitable for use in security applications. This tool uses a CSPRNG provided by the browser.' },
    { term: 'Character Set', definition: 'The pool of characters (e.g., a-z, 0-9, !@#) from which the random string is constructed.' },
    { term: 'Brute-Force Attack', definition: 'An attack method that involves systematically trying every possible combination of characters to guess a secret value like a password or token.' },
    { term: 'Session Token', definition: 'A unique piece of data, often a random string, used to identify and maintain a user\'s logged-in session on a website.' },
];
