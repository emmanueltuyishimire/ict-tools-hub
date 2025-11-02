
export const faqData = [
    { question: "What is recursion?", answer: "Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem. In programming, this means a function calls itself with a slightly modified input until it reaches a 'base case'." },
    { question: "What is a 'base case' in recursion?", answer: "The base case is the condition under which the recursive function stops calling itself and returns a specific, known value. It is the most critical part of a recursive function, as it prevents an infinite loop and the resulting 'stack overflow' error." },
    { question: "What is the 'call stack'?", answer: "The call stack is a data structure used by a programming language to keep track of the functions that have been called. When a function is called, a 'frame' is pushed onto the stack. When the function returns, its frame is popped off. This simulator visualizes this exact process." },
    { question: "Why does the stack build up and then unwind?", answer: "The stack builds up as the function calls itself repeatedly (e.g., factorial(5) calls factorial(4), which calls factorial(3)...). It only starts to unwind once it hits the base case (factorial(0)). At that point, `factorial(0)` returns a value to `factorial(1)`, which can then finish its calculation and return a value to `factorial(2)`, and so on, until the original call is resolved." },
    { question: "Is recursion efficient?", answer: "It depends. For some problems (like tree traversal), recursion leads to clean, elegant code. However, a naive recursive algorithm (like the one for Fibonacci) can be extremely inefficient due to recalculating the same values many times. Often, an iterative (loop-based) solution is faster and uses less memory because it avoids the overhead of multiple function calls." },
    { question: "What is a stack overflow error?", answer: "A stack overflow error occurs when there are too many nested function calls, and the call stack runs out of its allocated memory space. This is a common result of a recursive function that either has no base case or a base case that is never reached." },
    { question: "Why is factorial a classic example for teaching recursion?", answer: "Factorial has a naturally recursive definition: n! = n * (n-1)!. This makes it a very clear and simple way to demonstrate the two key components of a recursive function: the recursive step (`n * factorial(n-1)`) and the base case (`0! = 1`)." },
    { question: "Can all recursive problems be solved with a loop?", answer: "Yes, any problem that can be solved with recursion can also be solved with iteration (using loops). Sometimes the iterative solution is simple, but for complex, branching problems, the iterative equivalent of a recursive solution can be much harder to write and understand." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Recursion Simulator',
    description: 'A step-by-step guide to visualizing the call stack for a recursive function.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Enter a Number', text: 'Input a small integer (0-15) for which you want to simulate the factorial calculation.' },
        { '@type': 'HowToStep', name: 'Step 2: Start Simulation', text: 'Click "Start" to generate the step-by-step execution plan.' },
        { '@type': 'HowToStep', name: 'Step 3: Control Playback', text: 'Use the "Play" button to watch the full animation or "Step" to walk through each function call and return one at a time.' },
        { '@type': 'HowToStep', name: 'Step 4: Observe the Call Stack', text: 'The main visualization shows function calls being pushed onto the stack as they are made and popped off as they return a value.' },
    ],
    totalTime: 'PT2M',
};

export const keyTerminologies = [
    { term: 'Recursion', definition: 'A programming technique where a function calls itself to solve a problem.' },
    { term: 'Base Case', definition: 'The condition that terminates a recursive function and provides a known, direct result.' },
    { term: 'Recursive Step', definition: 'The part of a recursive function where it calls itself with a modified input that moves it closer to the base case.' },
    { term: 'Call Stack', definition: 'A data structure that manages active function calls in a program, operating in a Last-In, First-Out (LIFO) manner.' },
    { term: 'Stack Frame', definition: 'A block of memory on the call stack containing a function\'s arguments, local variables, and return address.' },
    { term: 'Stack Overflow', definition: 'An error that occurs when the call stack exceeds its maximum size, typically caused by an infinite or too-deep recursion.' },
];
