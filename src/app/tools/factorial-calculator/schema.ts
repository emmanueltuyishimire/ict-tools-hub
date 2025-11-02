

export const faqData = [
    { question: "What is a factorial?", answer: "The factorial of a non-negative integer 'n', denoted by n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1." },
    { question: "Why is 0! equal to 1?", answer: "This is a mathematical convention. Defining 0! as 1 allows many mathematical formulas, especially in combinatorics and series expansions (like e^x), to work correctly. It represents an empty product, the number of ways to arrange zero objects, which is one way (doing nothing)." },
    { question: "What are factorials used for?", answer: "Factorials are fundamental in combinatorics for calculating permutations (the number of ways to arrange a set of objects). They are also used in probability, calculus (in Taylor series), and in the analysis of algorithms in computer science." },
    { question: "Can I calculate the factorial of a negative or decimal number?", answer: "The standard factorial function is only defined for non-negative integers. This calculator does not support negative numbers or decimals. The generalization of the factorial function to complex numbers is called the Gamma function, which is a much more advanced topic." },
    { question: "How fast do factorials grow?", answer: "Factorials grow extremely rapidly. This is known as superexponential growth. For example, 20! is already a huge number (2,432,902,008,176,640,000), and 70! is larger than the estimated number of atoms in the universe. This is why this tool uses `BigInt` for calculations." },
    { question: "What is the largest factorial this calculator can handle?", answer: "This tool uses JavaScript's `BigInt` type, which can handle numbers of arbitrary size, limited only by your browser's memory and performance. We have set a practical input limit to prevent the browser from becoming unresponsive due to the massive size of the resulting number." },
    { question: "What is Stirling's approximation?", answer: "For very large numbers, calculating the exact factorial is computationally expensive. Stirling's approximation is a formula (n! ≈ √(2πn) * (n/e)^n) that provides a very accurate estimate of the factorial's value, which is widely used in physics and statistics." },
    { question: "What is the difference between a permutation and a combination?", answer: "A permutation is an arrangement where order matters (e.g., 'abc' is different from 'bac'). The number of permutations of n items is n!. A combination is a selection where order does not matter. Factorials are used as the basis for calculating both." },
    { question: "Is this tool safe to use?", answer: "Yes. All calculations are performed on your local machine within your web browser using JavaScript. No data is sent to our servers." },
    { question: "How does this tool relate to the Fibonacci Sequence?", answer: "Both factorials and the Fibonacci sequence are fundamental sequences in mathematics, often used as classic examples for teaching programming concepts like iteration and recursion. You can explore the Fibonacci sequence with our <a href='/tools/fibonacci-generator' class='text-primary hover:underline'>Fibonacci Sequence Generator</a>." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Factorial Calculator',
    description: 'A step-by-step guide to calculating the factorial of a number.',
    step: [
        { '@type': 'HowToStep', name: 'Enter a Number', text: 'Type a non-negative integer into the input field.' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate" button.' },
        { '@type': 'HowToStep', name: 'View the Result', text: 'The tool will display the calculated factorial. For very large numbers, it will also show the result in scientific notation for easier reading.' },
        { '@type': 'HowToStep', name: 'Copy the Full Result', text: 'Use the "Copy" button to copy the complete, exact factorial number to your clipboard.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Factorial (n!)', definition: 'The product of all positive integers up to a given integer n. For example, 4! = 4 × 3 × 2 × 1 = 24.' },
    { term: 'Permutation', definition: 'An arrangement of objects in a specific order. The number of permutations of n distinct objects is n!.' },
    { term: 'Combinatorics', definition: 'An area of mathematics primarily concerned with counting, both as a means and an end in obtaining results, and certain properties of finite structures.' },
    { term: 'Recursion', definition: 'A programming technique where a function calls itself to solve a problem. A factorial can be defined recursively as n! = n × (n-1)!.' },
    { term: 'Iteration', definition: 'A programming technique that uses a loop to repeat a set of instructions. This is generally a more efficient way to calculate factorials than recursion.' },
    { term: 'BigInt', definition: 'A JavaScript data type that can represent whole numbers of arbitrary precision, necessary for handling the rapid growth of factorials.' },
];
