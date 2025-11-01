
export const faqData = [
    { question: "What is a JavaScript function?", answer: "A JavaScript function is a reusable block of code designed to perform a particular task. A function is executed when 'called' or 'invoked'. It can take parameters (inputs) and can return a value (output)." },
    { question: "Is this tool a full development environment (IDE)?", answer: "No. This tool is a simple sandbox for quickly testing isolated functions or formulas. It is not a full IDE and lacks features like a file system, debugger (other than `console.log`), or package management." },
    { question: "Why do my parameters need to be in JSON format?", answer: "The parameters are parsed as a JavaScript array. JSON (JavaScript Object Notation) is the standard format for representing data, and its rules (like using double quotes for strings) ensure that the parameters are parsed correctly and consistently into the function." },
    { question: "Is it safe to run any code here?", answer: "This tool uses the `new Function()` constructor, which is safer than `eval()` because it runs the code in an isolated scope. It cannot access local variables from the page's main script. However, it can still access global variables (like `window` or `Math`). While safer, you should still be cautious and not run untrusted code. Since it's all client-side, the risk is primarily to your own browser session (e.g., an infinite loop freezing the tab)." },
    { question: "Can I use modern JavaScript features (ES6+)?", answer: "Yes. This tool runs in your browser, so it supports whatever level of JavaScript your current browser supports, including ES6+ features like arrow functions (`=>`), `let`/`const`, template literals, and spread syntax (`...`)." },
    { question: "How can I test a function with multiple parameters?", answer: "Simply provide the values in the 'Parameters' box, separated by commas. The first value will be passed as variable `a`, the second as `b`, and so on. For example, for a function that adds two numbers, the body would be `return a + b;` and the parameters could be `10, 20`." },
    { question: "What does a `null` or `undefined` output mean?", answer: "`undefined` means your function did not have a `return` statement, or it returned `undefined` explicitly. `null` means your function specifically returned `null`. If you expect a value but get one of these, check to make sure you have a `return` statement." },
    { question: "Can I test asynchronous functions (async/await)?", answer: "Directly testing `async/await` in this simple setup is complex because the tool is synchronous. For testing asynchronous code, it is better to use your browser's developer console or a dedicated JavaScript environment like Node.js or a web-based IDE." },
    { question: "How can I debug my function if it's not working?", answer: "You can add `console.log()` statements anywhere inside your function body. Open your browser's developer console (usually by pressing F12) to see the logged output, which can help you trace the values of variables at different points in your function's execution." },
    { question: "What's the difference between this and a browser console?", answer: "A browser console is a more powerful and complete JavaScript environment. This tool provides a more structured and isolated 'scratchpad' focused on a single function and its inputs/outputs, which can be less intimidating and faster for simple, isolated tests without needing to open dev tools." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Function / Formula Tester',
    description: 'A step-by-step guide to testing a JavaScript function snippet.',
    step: [
        { '@type': 'HowToStep', name: 'Write Function Body', text: 'In the "Function Body" text area, write the JavaScript code you want to test. Ensure it includes a `return` statement to produce an output.' },
        { '@type': 'HowToStep', name: 'Provide Parameters', text: 'In the "Parameters" box, enter the comma-separated values you want to pass as arguments to your function. Remember to use valid JSON formatting (e.g., strings in double quotes).' },
        { '@type': 'HowToStep', name: 'Run the Test', text: 'Click the "Run Test" button to execute the code.' },
        { '@type': 'HowToStep', name: 'Analyze Output', text: 'The return value of your function will be displayed in the "Output" box. If an error occurs during execution, the error message will be shown instead.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Function', definition: 'A reusable block of code that performs a specific task. It can accept inputs (parameters) and produce an output (return value).' },
    { term: 'Parameter', definition: 'A variable name listed in a function\'s definition, which acts as a placeholder for the value that will be passed to the function.' },
    { term: 'Argument', definition: 'The actual value that is passed to a function when it is called.' },
    { term: 'Return Value', definition: 'The value that a function outputs after it has finished executing. Specified by the `return` keyword.' },
    { term: 'Scope', definition: 'The context in which variables are declared and accessible. JavaScript has global scope, function scope, and block scope.' },
    { term: 'Sandbox', definition: 'An isolated environment where code can be executed without affecting the containing application. This tool uses the `new Function()` constructor to create a simple sandbox.' },
];
