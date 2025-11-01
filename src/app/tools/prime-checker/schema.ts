
export const faqData = [
    { question: "What is a prime number?", answer: "A prime number is a whole number greater than 1 that has only two divisors: 1 and itself. Examples include 2, 3, 5, 7, and 11." },
    { question: "Is 1 a prime number?", answer: "No, 1 is not a prime number. By definition, a prime number must be greater than 1. The number 1 is considered a 'unit'." },
    { question: "Is 2 a prime number?", answer: "Yes, 2 is a prime number. It is the only even prime number, as all other even numbers are divisible by 2." },
    { question: "What is a composite number?", answer: "A composite number is a whole number greater than 1 that is not prime. This means it has at least one divisor other than 1 and itself. For example, 6 is a composite number because it is divisible by 2 and 3." },
    { question: "How does this tool check for primality?", answer: "This tool uses an optimized trial division method. It checks for divisibility by 2 and 3, and then iterates through numbers up to the square root of the input number. This is a fast and efficient method for numbers within a reasonable range." },
    { question: "Why do you only need to check divisors up to the square root of a number?", answer: "If a number `n` has a divisor `d` that is larger than its square root, then it must also have a corresponding divisor `n/d` that is smaller than its square root. Therefore, if we don't find any divisors by the time we reach the square root, we can be sure that no divisors exist." },
    { question: "What is the largest prime number known?", answer: "As of late 2023, the largest known prime number is 2^82,589,933 − 1, a number with over 24 million digits! Large prime numbers are discovered through massive distributed computing projects like GIMPS (Great Internet Mersenne Prime Search)." },
    { question: "What are prime numbers used for?", answer: "The most significant real-world application of prime numbers is in cryptography, particularly in public-key encryption algorithms like RSA. The security of these systems relies on the fact that it is extremely difficult to find the two large prime factors of a very large composite number." },
    { question: "Are there infinite prime numbers?", answer: "Yes. This was proven by the ancient Greek mathematician Euclid. No matter how large a prime number you find, there is always another, larger one." },
    { question: "How does this relate to other tools?", answer: "Understanding primes is fundamental to many areas of computer science and mathematics. You can use our <a href='/tools/number-converter' class='text-primary hover:underline'>Number Converter</a> to see how these numbers are represented in binary, or our <a href='/tools/fibonacci-generator' class='text-primary hover:underline'>Fibonacci Sequence Generator</a> to explore other famous number sequences." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check if a Number is Prime',
    description: 'A step-by-step guide to using the Prime Number Checker tool.',
    step: [
        { '@type': 'HowToStep', name: 'Enter a Number', text: 'Type any whole number into the input field.' },
        { '@type': 'HowToStep', name: 'View the Instant Result', text: 'The tool will immediately analyze the number and tell you if it is "Prime" or "Not Prime".' },
        { '@type': 'HowToStep', name: 'Understand the Explanation', text: 'If the number is not prime, the tool will provide an example of a divisor to show why. If it is prime, it will confirm its properties.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Prime Number', definition: 'A whole number greater than 1 whose only divisors are 1 and itself.' },
    { term: 'Composite Number', definition: 'A whole number greater than 1 that is not prime; it has divisors other than 1 and itself.' },
    { term: 'Divisor (Factor)', definition: 'A number that divides into another number exactly, with no remainder.' },
    { term: 'Trial Division', definition: 'An algorithm for primality testing that involves systematically checking for divisors of a number.' },
    { term: 'Cryptography', definition: 'The practice and study of techniques for secure communication. Prime numbers are a cornerstone of modern public-key cryptography.' },
    { term: 'Fundamental Theorem of Arithmetic', definition: 'A theorem stating that every integer greater than 1 is either a prime number itself or can be represented as a unique product of prime numbers.' },
];

    