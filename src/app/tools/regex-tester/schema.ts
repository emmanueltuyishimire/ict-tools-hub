
export const faqData = [
    { question: "What is a regular expression (regex)?", answer: "A regular expression is a sequence of characters that specifies a search pattern. It's a powerful tool used in programming and text editing to find, match, and manage text. For example, the regex `\\d+` will match one or more digits in a string." },
    { question: "Is this tool safe to use?", answer: "Yes. All processing, including regex matching and highlighting, is done entirely on your computer (client-side) using JavaScript. Your text and patterns are never sent to any server." },
    { question: "What regex engine does this tool use?", answer: "This tool uses the JavaScript regular expression engine, which is built into your web browser. The syntax and behavior will match what you would expect when using regex in JavaScript code. It supports modern features like lookaheads, lookbehinds, and named capture groups." },
    { question: "What do the `g`, `i`, and `m` flags do?", answer: "`g` (Global): Finds all matches instead of stopping after the first one. `i` (Case-insensitive): Ignores case when matching (e.g., 'a' will match 'A'). `m` (Multiline): Allows the `^` and `$` anchors to match the start and end of individual lines within the text, not just the start and end of the whole string." },
    { question: "What is a 'capture group'?", answer: "A capture group is a part of a regex pattern enclosed in parentheses `()`. It 'captures' the portion of the string that matches the pattern inside the parentheses. This allows you to extract specific sub-strings from a larger match. For example, in the date `2024-10-26`, the regex `(\\d{4})-(\\d{2})-(\\d{2})` has three capture groups to extract the year, month, and day separately." },
    { question: "What is the difference between greedy and lazy matching?", answer: "By default, quantifiers like `*` and `+` are 'greedy,' meaning they match as much text as possible. For example, in `<h1>title</h1>`, the regex `<.*>` would match the entire string from the first `<` to the last `>`. By making a quantifier 'lazy' with a `?` (e.g., `<.*?>`), it matches as little text as possible, correctly matching `<h1>` and `</h1>` separately." },
    { question: "How can I use this tool to build a regex?", answer: "Start with a simple pattern and a sample test string. Gradually add more complexity to your regex, observing how the matches change in real-time. The instant feedback loop is the best way to learn and build complex patterns." },
    { question: "Why is my regex causing the page to freeze?", answer: "This can happen due to a phenomenon called 'catastrophic backtracking.' It occurs with poorly written regexes that have nested quantifiers and multiple paths to a match. When a match fails, the engine has to backtrack through an exponentially large number of possibilities, causing it to hang. A common example is `(a*)*$`. Be careful with nested quantifiers." },
];

export const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
};

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Regex Tester',
    description: 'A step-by-step guide to testing and debugging your regular expressions.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Regex Pattern', text: 'In the "Regular Expression" field, type your pattern. You don\'t need to include the starting and ending slashes (e.g., use `\\d+`, not `/\\d+/`).' },
        { '@type': 'HowToStep', name: 'Select Flags', text: 'Choose the regex flags you need, such as `g` for global search or `i` for case-insensitive matching.' },
        { '@type': 'HowToStep', name: 'Provide Test String', text: 'In the "Test String" field, enter the text you want to test your regex against.' },
        { '@type': 'HowToStep', name: 'Analyze Results', text: 'The tool will update in real-time. Matches will be highlighted in the test string. A "Match Information" card will appear, listing all the found matches and any capture groups within them.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Literal', definition: 'An ordinary character in a regex that matches itself (e.g., `a` matches "a").' },
    { term: 'Metacharacter', definition: 'A character with a special meaning, like `.` (matches any character) or `*` (matches zero or more times).' },
    { term: 'Quantifier', definition: 'Specifies how many times a character or group must appear (e.g., `+` for one or more, `{2,4}` for two to four).' },
    { term: 'Anchor', definition: 'A token that matches a position, not a character (e.g., `^` for start of string, `$` for end of string).' },
    { term: 'Character Class', definition: 'A set of characters to match, enclosed in square brackets `[]` (e.g., `[aeiou]` matches any vowel).' },
    { term: 'Capture Group', definition: 'A part of the pattern enclosed in parentheses `()` that captures the matched substring for later use or extraction.' },
];
