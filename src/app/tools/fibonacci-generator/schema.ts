
export const faqData = [
    { question: "What is the Fibonacci sequence?", answer: "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. The sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, and so on." },
    { question: "What is the Golden Ratio and how does it relate to the Fibonacci sequence?", answer: "The Golden Ratio is an irrational number approximately equal to 1.618. As you go further into the Fibonacci sequence, the ratio of a number to its preceding number gets closer and closer to the Golden Ratio. This ratio is found throughout nature, art, and architecture." },
    { question: "Can this tool generate very long sequences?", answer: "This tool can generate very large Fibonacci numbers thanks to its use of JavaScript's `BigInt` type, which handles numbers larger than the standard integer limit. However, for browser performance, we have set a practical limit on the number of sequence elements you can generate at once (e.g., 2,000)." },
    { question: "What is the difference between an iterative and a recursive approach?", answer: "An iterative approach uses a loop to build the sequence from the start, which is very fast and efficient (O(n) time complexity). A naive recursive approach defines `fib(n)` by calling `fib(n-1)` and `fib(n-2)`, which is elegant but extremely slow (O(2^n) time complexity) because it re-calculates the same values over and over. This tool uses the efficient iterative method." },
    { question: "Are Fibonacci numbers used in the real world?", answer: "Yes, extensively. They appear in nature (flower petals, pinecones), art, architecture, computer science algorithms (Fibonacci heaps, search techniques), and even financial market analysis (Fibonacci retracement levels)." },
    { question: "Is 0 considered a Fibonacci number?", answer: "Yes, in the modern definition of the sequence, it starts with F(0) = 0. Some older definitions start the sequence with F(1) = 1 and F(2) = 1, but starting with 0 is now standard." },
    { question: "Is there a formula to calculate the nth Fibonacci number directly?", answer: "Yes, it's called Binet's Formula. It's a closed-form expression that uses the Golden Ratio to calculate the nth Fibonacci number directly without needing to calculate all the preceding numbers. However, it involves irrational numbers and can be prone to floating-point precision errors for large numbers." },
    { question: "How fast does the Fibonacci sequence grow?", answer: "The sequence grows exponentially. The numbers become very large very quickly, which is why `BigInt` is necessary for generating longer sequences." },
    { question: "Is this tool safe to use?", answer: "Yes. All calculations are performed on your local machine within your web browser. No data is sent to our servers." },
    { question: "Can I use this for programming homework?", answer: "Absolutely. This tool is great for verifying the output of your own Fibonacci implementations or for getting a quick sequence to use as test data. We recommend using it to check your work after you've tried to solve the problem yourself." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a Fibonacci Sequence',
    description: 'A step-by-step guide to using the Fibonacci Sequence Generator.',
    step: [
        { '@type': 'HowToStep', name: 'Set a Length', text: 'Enter the number of Fibonacci numbers you want to generate in the input field.' },
        { '@type': 'HowToStep', name: 'Generate Sequence', text: 'Click the "Generate Sequence" button.' },
        { '@type': 'HowToStep', name: 'Review and Copy', text: 'The tool will display the full sequence. Use the "Copy" button to copy the list to your clipboard.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Fibonacci Sequence', definition: 'A sequence of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.' },
    { term: 'Golden Ratio (φ)', definition: 'An irrational number approximately equal to 1.618, which is the limit of the ratio of consecutive Fibonacci numbers.' },
    { term: 'Recurrence Relation', definition: 'An equation that defines a sequence based on its preceding terms. For Fibonacci, it is F(n) = F(n-1) + F(n-2).' },
    { term: 'Iteration', definition: 'A computational approach that involves repeating a process in a loop to build up a result. It is an efficient way to generate the Fibonacci sequence.' },
    { term: 'Recursion', definition: 'A programming technique where a function calls itself to solve a problem. A naive recursive solution for Fibonacci is elegant but highly inefficient.' },
    { term: 'BigInt', definition: 'A JavaScript data type that can represent whole numbers of arbitrary precision, necessary for handling large Fibonacci numbers.' },
];
