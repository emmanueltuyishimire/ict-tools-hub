export const faqData = [
    { question: "What is password entropy?", answer: "Password entropy is a quantitative measure of a password's unpredictability or randomness. It is measured in 'bits.' A higher entropy value means there are more possible combinations, making the password exponentially harder for an attacker to guess or brute-force." },
    { question: "How is entropy calculated?", answer: "The formula is `E = L * log₂(R)`, where 'E' is the entropy in bits, 'L' is the password length, and 'R' is the size of the character pool (e.g., 26 for lowercase letters, 62 for alphanumeric). This tool calculates 'R' based on the characters you actually use in your password." },
    { question: "What is a 'good' entropy value?", answer: "Security standards vary, but a common guideline is: Below 40 bits is very weak. 40-60 bits is weak. 60-80 bits is acceptable. 80-120 bits is strong. Above 120 bits is very strong and provides excellent protection against all current and foreseeable brute-force attacks." },
    { question: "Why is entropy a better measure than just 'strength'?", answer: "A 'strength' meter is often a qualitative guess based on simple rules (e.g., has a number, has a symbol). Entropy is a quantitative, mathematical measure of a password's resistance to brute-force attacks. A long, simple passphrase can have much higher entropy than a short, 'complex' password, a fact this tool can demonstrate clearly." },
    { question: "Is it safe to type my password here?", answer: "Yes. This tool is 100% client-side. All calculations are performed in your browser using JavaScript. Your password is never sent to our servers or stored anywhere." },
    { question: "What is a 'character pool'?", answer: "The character pool is the set of unique characters a password could be made from. For example, if you only use lowercase letters, the pool size is 26. If you use lowercase, uppercase, and numbers, the pool size is 26 + 26 + 10 = 62. The larger the character pool, the higher the entropy for a given length." },
    { question: "How does this relate to the Password Strength Checker?", answer: "Our <a href='/tools/password-strength-checker' class='text-primary hover:underline'>Password Strength Checker</a> provides a quick, visual score. This tool provides the underlying mathematical value (entropy) that determines that score. It's for users who want to dive deeper into the 'why' of password security." },
    { question: "What is a brute-force attack?", answer: "A brute-force attack is an attempt to crack a password by systematically trying every single possible combination. The time it takes is directly related to the password's entropy. Higher entropy means an exponentially longer time to crack." },
    { question: "Does entropy account for dictionary attacks?", answer: "No. The standard entropy calculation assumes every character is chosen with equal randomness. It does not account for an attacker using a 'dictionary' of common words, names, or previously breached passwords. This is why using random, non-dictionary words in a passphrase is so important." },
    { question: "How can I increase my password's entropy?", answer: "There are two ways: 1) Increase the length of the password. This is the most effective method. 2) Increase the size of the character pool by including more character types (uppercase, lowercase, numbers, symbols)." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Password Entropy',
    description: 'A step-by-step guide to measuring the entropy of your password.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Your Password', text: 'Type or paste the password you want to analyze into the input field.' },
        { '@type': 'HowToStep', name: 'Review the Entropy Score', text: 'The tool will instantly calculate and display the entropy value in bits.' },
        { '@type': 'HowToStep', name: 'Analyze the Breakdown', text: 'The results will show the factors used in the calculation: the password length and the detected size of the character pool (e.g., lowercase + numbers).' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Password Entropy', definition: 'A mathematical measure, in bits, of a password\'s unpredictability and resistance to brute-force attacks.' },
    { term: 'Bit of Entropy', definition: 'Each bit of entropy doubles the complexity of a password, making it twice as hard to crack.' },
    { term: 'Brute-Force Attack', definition: 'An attack method where an attacker systematically tries every possible password combination.' },
    { term: 'Character Pool', definition: 'The set of unique characters (e.g., a-z, A-Z, 0-9) that a password is composed of. A larger pool increases entropy.' },
    { term: 'Passphrase', definition: 'A password composed of a sequence of words. Long passphrases can have very high entropy and be easier to remember.' },
    { term: 'Information Theory', definition: 'A branch of mathematics and computer science that deals with the quantification, storage, and communication of information. Entropy is a key concept from this field.' }
];
