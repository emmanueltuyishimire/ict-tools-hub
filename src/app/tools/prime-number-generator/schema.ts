
export const faqData = [
    { question: "How does this prime number generator work?", answer: "This tool uses the 'Sieve of Eratosthenes', a highly efficient ancient algorithm for finding all prime numbers up to a specified limit. It works by iteratively marking as composite (i.e., not prime) the multiples of each prime, starting with the first prime number, 2." },
    { question: "What is the maximum limit I can set?", answer: "To ensure good performance in your web browser, this tool has a maximum limit for prime generation (e.g., 100,000). Generating primes up to very large numbers requires significant memory and processing power, which can slow down or crash the browser tab." },
    { question: "Why is generating prime numbers useful?", answer: "Generating lists of prime numbers is essential for various fields, including cryptography (for creating keys), computer science (for hashing algorithms and data structures), and number theory research. It's also a classic problem for learning and benchmarking algorithm efficiency." },
    { question: "Is there a formula to generate any prime number?", answer: "No, there is no known simple formula that can generate all prime numbers and only prime numbers. Their distribution is one of the most famous unsolved problems in mathematics, though there are patterns and theorems that describe their general behavior." },
    { question: "What is the Sieve of Eratosthenes?", answer: "It is an ancient algorithm for finding all prime numbers up to a specified integer. It works by creating a list of numbers and progressively marking off multiples of primes, leaving only the prime numbers unmarked at the end. It's much faster than checking each number individually." },
    { question: "How does this tool differ from the Prime Number Checker?", answer: "The <a href='/tools/prime-checker' class='text-primary hover:underline'>Prime Number Checker</a> is designed to test if one specific number is prime. This generator is designed to produce a list of all prime numbers within a given range." },
    { question: "Can I use the generated list in my own code?", answer: "Yes. You can copy the comma-separated list and paste it into an array or list in your programming language of choice. For applications requiring frequent prime checks within a known range, using a pre-computed list like this is much faster than recalculating primality each time." },
    { question: "Are prime numbers really 'random'?", answer: "While the distribution of prime numbers can appear random and chaotic, it is entirely deterministic. Mathematicians have discovered deep patterns in their distribution, but many aspects, like the famous Riemann Hypothesis, remain unproven." },
    { question: "What are Twin Primes?", answer: "Twin primes are pairs of prime numbers that differ by two. For example, (3, 5), (5, 7), and (11, 13). It is another famous unsolved problem whether there are infinitely many twin prime pairs." },
    { question: "Why start checking from 2?", answer: "The number 2 is the first and only even prime number. All other even numbers are divisible by 2 and therefore not prime. The Sieve of Eratosthenes algorithm starts with 2, eliminates all its multiples, and then moves on to the next unmarked number, which is 3." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a List of Prime Numbers',
    description: 'A step-by-step guide to using the Prime Number Generator.',
    step: [
        { '@type': 'HowToStep', name: 'Set a Limit', text: 'Enter the upper boundary for your prime number search in the "Generate primes up to" field.' },
        { '@type': 'HowToStep', name: 'Generate Primes', text: 'Click the "Generate Primes" button.' },
        { '@type': 'HowToStep', name: 'Review and Copy', text: 'The tool will display the total count of primes found and a list of the numbers. Use the "Copy" button to copy the list to your clipboard.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Prime Number', definition: 'A whole number greater than 1 that has only two divisors: 1 and itself.' },
    { term: 'Sieve of Eratosthenes', definition: 'An ancient and efficient algorithm for finding all prime numbers up to a specified limit by iteratively marking out the multiples of primes.' },
    { term: 'Composite Number', definition: 'A whole number greater than 1 that is not prime, meaning it has factors other than 1 and itself.' },
    { term: 'Primality Test', definition: 'An algorithm for determining whether an input number is prime.' },
    { term: 'Cryptography', definition: 'The practice of secure communication techniques. Large prime numbers are the foundation of modern public-key cryptography.' },
];

    