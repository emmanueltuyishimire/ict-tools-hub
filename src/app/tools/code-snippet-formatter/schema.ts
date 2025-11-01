
export const faqData = [
    { question: "What is code formatting?", answer: "Code formatting (or 'beautifying') is the process of automatically arranging source code to follow a consistent set of style rules, such as for indentation, spacing, and line breaks. It makes code easier for humans to read without changing its functionality." },
    { question: "Why is it important to format a code snippet before sharing it?", answer: "Presenting clean, well-formatted code is a professional courtesy. It makes your code easier to understand, review, and debug, which means you're more likely to get helpful feedback in presentations, code reviews, or on forums like Stack Overflow." },
    { question: "Is this tool safe to use with proprietary code?", answer: "Yes. All formatting is done client-side, directly in your browser. Your code is never sent to our servers, ensuring your data remains private and secure." },
    { question: "What's the difference between this and a linter?", answer: "A formatter purely adjusts code style (whitespace). A linter analyzes code for potential bugs, stylistic errors, and bad practices. A formatter makes code look good; a linter helps make code be good." },
    { question: "What styling conventions does this tool use?", answer: "It uses common conventions: 2 spaces for indentation in JavaScript, HTML, and CSS, and 4 spaces for Python as recommended by the PEP 8 style guide." },
    { question: "Can I customize the formatting rules?", answer: "This tool provides a quick, standardized formatting opinion. For customizable, project-wide formatting, you should use a professional tool like Prettier or ESLint integrated into your code editor." },
    { question: "Does this formatter minify the code?", answer: "No, this tool does the opposite. It adds whitespace to make code more readable. To reduce file size for production, you should use a tool like our <a href='/tools/code-minifier' class='text-primary hover:underline'>Code Minifier</a>." },
    { question: "Will this tool fix syntax errors in my code?", answer: "No. If your code has a syntax error (like a missing bracket), the formatter may fail or produce incorrect indentation. It beautifies valid code; it does not debug it. For debugging help, you can use our <a href='/tools/code-generator' class='text-primary hover:underline'>AI Code Generator & Debugger</a>." },
    { question: "What languages does this tool support?", answer: "This tool supports four of the most common languages for web development and scripting: JavaScript, Python, HTML, and CSS." },
    { question: "How can formatting help me find bugs?", answer: "While a formatter doesn't fix bugs directly, the process of formatting messy code can often reveal structural problems. For example, incorrect indentation after formatting can immediately highlight a missing closing brace `}` or tag that was hard to see in the original unformatted code." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Format a Code Snippet',
    description: 'A step-by-step guide to using the code snippet formatter.',
    step: [
        { '@type': 'HowToStep', name: 'Select Language', text: 'Choose the language of your code snippet (JavaScript, Python, HTML, or CSS) from the tabs.' },
        { '@type': 'HowToStep', name: 'Paste Your Code', text: 'Paste your messy, minified, or unformatted code into the "Input Code" text area.' },
        { '@type': 'HowToStep', name: 'Format the Snippet', text: 'Click the "Format Code" button.' },
        { '@type': 'HowToStep', name: 'Copy the Result', text: 'The formatted, properly indented code will appear in the "Formatted Snippet" box. Use the copy button to grab the clean code for your documentation, presentation, or forum post.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Code Formatting (Beautifying)', definition: 'The automated process of restructuring source code to adhere to stylistic conventions for indentation, spacing, and line breaks, improving readability.' },
    { term: 'Indentation', definition: 'The use of whitespace at the beginning of a line to visually represent the nesting and structure of code blocks.' },
    { term: 'Code Snippet', definition: 'A small, portable portion of source code that is intended to be shared or embedded in documentation.' },
    { term: 'Readability', definition: 'A measure of how easily a human can read and understand source code. It is a key component of maintainable software.' },
    { term: 'Style Guide', definition: 'A set of conventions and rules for writing code in a specific language or for a particular project to ensure consistency (e.g., Python\'s PEP 8).' },
    { term: 'Minification', definition: 'The opposite of formatting. The process of removing all unnecessary characters from code to reduce its file size for production environments.' },
];
