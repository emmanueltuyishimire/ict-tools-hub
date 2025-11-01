
export const faqData = [
    { question: "What is a random number generator?", answer: "A random number generator (RNG) is an algorithm or device that produces a sequence of numbers that cannot be reasonably predicted better than by random chance. They are crucial in computing for applications ranging from gaming and statistical sampling to cryptography." },
    { question: "Is the output of this generator truly random?", answer: "This tool uses `window.crypto.getRandomValues()`, a feature in modern browsers that provides access to a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG). This is a much higher quality of randomness than standard generators like `Math.random()`, making it suitable for most applications, though not for high-stakes cryptographic key generation which should be done on a secure server." },
    { question: "What's the difference between a PRNG and a CSPRNG?", answer: "A standard Pseudo-Random Number Generator (PRNG) produces a sequence of numbers that appears random but is completely determined by an initial 'seed' value. A Cryptographically Secure PRNG (CSPRNG) has additional properties that make its output unpredictable, even if an attacker has some knowledge of previous outputs. It achieves this by gathering entropy from unpredictable system sources." },
    { question: "Why would I want to disallow duplicates?", answer: "Disallowing duplicates is essential for tasks like drawing lottery numbers, picking a random winner from a list of entrants without replacement, or generating unique identifiers for a batch of items. When you need to ensure every number in your set is unique, you should uncheck this option." },
    { question: "What happens if I ask for more unique numbers than are available in the range?", answer: "The tool will show an error. It's mathematically impossible to generate, for example, 20 unique numbers from a range of 1 to 10. The count of numbers must be less than or equal to the size of the range (max - min + 1) when duplicates are not allowed." },
    { question: "How large of a range can this tool handle?", answer: "While the tool can handle very large numbers for the min/max values, generating a large count of numbers, especially unique ones, can be memory and CPU intensive for your browser. We have set a practical limit on the count to ensure a smooth user experience." },
    { question: "How is this different from the Random String Generator?", answer: "The <a href='/tools/random-string-generator' class='text-primary hover:underline'>Random String Generator</a> is designed to create text-based tokens, passwords, or keys. This tool is specifically for generating numerical data, which is more useful for statistical analysis, simulations, gaming, or generating random numerical IDs." },
    { question: "Can I use these numbers for scientific simulations?", answer: "For many educational and simple simulations, yes. The CSPRNG is of high quality. However, for rigorous scientific research (like Monte Carlo simulations), experts often use specialized libraries (e.g., in Python or R) that offer specific statistical distributions (like Normal or Poisson) and have been extensively peer-reviewed for statistical correctness." },
    { question: "Is a random number the same as a prime number?", answer: "No. A random number is one chosen from a set with no predictable pattern. A <a href='/tools/prime-checker' class='text-primary hover:underline'>prime number</a> is a specific type of number that has exactly two divisors: 1 and itself. A random number might happen to be prime, but the concepts are unrelated." },
    { question: "What are some real-world applications of random numbers?", answer: "Random numbers are used everywhere: in video games for loot drops and procedural map generation, in statistics for creating random samples, in cryptography for generating keys, in machine learning for initializing weights in a neural network, and in simulations for modeling unpredictable events." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Random Number Generator',
    description: 'A step-by-step guide to generating a set of random numbers.',
    step: [
        { '@type': 'HowToStep', name: 'Set Range', text: 'Enter the Minimum and Maximum values to define the inclusive range for your random numbers.' },
        { '@type': 'HowToStep', name: 'Set Count', text: 'Enter how many random numbers you want to generate.' },
        { '@type': 'HowToStep', name: 'Choose Uniqueness', text: 'Check or uncheck the "Allow Duplicates" box. Uncheck it if you need every number in the output to be unique.' },
        { '@type': 'HowToStep', name: 'Generate and Copy', text: 'Click the "Generate Numbers" button. The results will appear in the text area, where you can copy them using the copy button.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Random Number Generator (RNG)', definition: 'An algorithm or device that creates a sequence of numbers that lacks any discernible pattern.' },
    { term: 'CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)', definition: 'A high-quality RNG that generates unpredictable sequences, making it suitable for security-sensitive applications.' },
    { term: 'Entropy', definition: 'A measure of randomness or uncertainty. CSPRNGs gather entropy from the operating system to ensure unpredictability.' },
    { term: 'Seed', definition: 'An initial value used to start a sequence of pseudo-random numbers. Given the same seed, a standard PRNG will always produce the same sequence.' },
    { term: 'Uniform Distribution', definition: 'A probability distribution where every number within a given range has an equal chance of being selected. This tool generates numbers with a uniform distribution.' },
];
