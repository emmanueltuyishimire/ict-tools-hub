
export const faqData = [
    { question: "What makes a variable name valid?", answer: "A variable name is valid if it follows the syntax rules of a programming language. Generally, this means it must start with a letter or an underscore, contain only alphanumeric characters and underscores, and not be a reserved keyword (like 'if', 'class', or 'for')." },
    { question: "What is a 'reserved keyword'?", answer: "A reserved keyword is a word that has a special meaning in a programming language and therefore cannot be used as a variable name. For example, 'while' is a keyword used to create loops, so you cannot have a variable named 'while'." },
    { question: "Why can't a variable name start with a number?", answer: "This rule simplifies the job of the compiler or interpreter. It makes it easy to distinguish between a numerical literal (like 123) and an identifier (a variable name). If variables could start with numbers, it would create ambiguity." },
    { question: "What is the difference between camelCase and snake_case?", answer: "`camelCase` is a naming convention where the first word is lowercase and subsequent words are capitalized (e.g., `myVariableName`). It's standard in JavaScript and Java. `snake_case` separates words with underscores and is all lowercase (e.g., `my_variable_name`). It's the standard convention in Python and for database columns." },
    { question: "Is this tool safe to use?", answer: "Yes. All validation happens in your browser. The variable names you enter are not sent to any server, ensuring your code remains private." },
    { question: "Are variable names case-sensitive?", answer: "In most modern languages, including JavaScript, Python, Java, and C++, variable names are case-sensitive. This means `myVariable` and `myvariable` are treated as two different variables." },
    { question: "What is the best naming convention?", answer: "The best convention is the one that is standard for the language you are using (e.g., snake_case for Python, camelCase for JavaScript). Consistency is the most important rule. A project that mixes conventions is difficult to read." },
    { question: "Why is a descriptive variable name important?", answer: "A descriptive name (like `customerAddress`) makes code self-documenting. It allows other developers (and your future self) to understand the purpose of the variable without needing extra comments, which makes the code much easier to read, debug, and maintain." },
    { question: "Are there any limits on variable name length?", answer: "While most languages do not have a hard limit on the length of a variable name, or the limit is extremely large, it is best practice to keep names descriptive but reasonably concise. An overly long name can make code harder to read." },
    { question: "What is a 'magic number' and how does it relate to variable names?", answer: "A 'magic number' is a hard-coded numerical value in your code without any explanation (e.g., `if (user.role === 2)`). It's a bad practice because the meaning of '2' is unclear. This should be replaced with a well-named constant, like `const ADMIN_ROLE = 2; if (user.role === ADMIN_ROLE)`, which makes the code instantly understandable." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Variable Name Validator',
    description: 'Check if a variable name is valid for your chosen programming language.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Name', text: 'Type the variable name you want to check into the input field.' },
        { '@type': 'HowToStep', name: 'Select Language', text: 'Choose your programming language (JavaScript, Python, etc.) from the dropdown menu.' },
        { '@type': 'HowToStep', name: 'View Result', text: 'The tool will instantly tell you if the name is valid and provide an explanation if it is not, such as if it is a reserved keyword.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Variable', definition: 'A symbolic name associated with a value that can be changed.' },
    { term: 'Identifier', definition: 'The formal term for the name of a variable, function, class, or other entity in code.' },
    { term: 'Reserved Keyword', definition: 'A word that is part of a programming language\'s syntax and cannot be used as an identifier (e.g., `if`, `while`, `return`).' },
    { term: 'Naming Convention', definition: 'A set of rules for choosing the character sequence to be used for identifiers. Common conventions include camelCase, snake_case, and PascalCase.' },
    { term: 'camelCase', definition: 'A convention where the first word is lowercase and subsequent words are capitalized (e.g., `myVariableName`).' },
    { term: 'snake_case', definition: 'A convention where words are all lowercase and separated by underscores (e.g., `my_variable_name`).' },
];

export const reservedWords = {
    js: new Set(['await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface', 'let', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'static', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']),
    python: new Set(['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']),
    java: new Set(['abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null']),
    cpp: new Set(['alignas', 'alignof', 'and', 'and_eq', 'asm', 'auto', 'bitand', 'bitor', 'bool', 'break', 'case', 'catch', 'char', 'char8_t', 'char16_t', 'char32_t', 'class', 'compl', 'concept', 'const', 'consteval', 'constexpr', 'const_cast', 'continue', 'co_await', 'co_return', 'co_yield', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'requires', 'return', 'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq'])
};
