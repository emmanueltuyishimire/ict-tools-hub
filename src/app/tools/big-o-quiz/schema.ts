

export const faqData = [
    { question: "Why is Big O notation important for technical interviews?", answer: "Big O is a standard way to discuss the efficiency of code. Interviewers use it to gauge a candidate's understanding of algorithms and data structures, and their ability to write performant, scalable code. Being able to analyze the time and space complexity of a solution is a critical skill." },
    { question: "Is O(n) faster than O(n²)?", answer: "Yes, for any reasonably large input. O(n) (linear time) means the runtime grows in direct proportion to the input size 'n'. O(n²) (quadratic time) means the runtime grows with the square of the input size. As 'n' gets larger, the O(n) algorithm will be vastly more efficient." },
    { question: "Does Big O measure the exact speed of an algorithm?", answer: "No. Big O notation describes the growth rate or trend, not the exact speed in seconds. It ignores constant factors. For example, an algorithm that takes 5n + 10 steps and one that takes n + 1000 steps are both considered O(n) because they both grow linearly. You can use our <a href='/tools/big-o-calculator' class='text-primary hover:underline'>Time Complexity Estimator</a> to visualize these growth curves." },
    { question: "What is the difference between Time Complexity and Space Complexity?", answer: "Time complexity describes how the runtime of an algorithm changes with the input size. Space complexity describes how the amount of additional memory (space) an algorithm requires changes with the input size. Both are described using Big O notation." },
    { question: "What is O(1) or Constant Time?", answer: "An algorithm with O(1) complexity takes the same amount of time to execute regardless of the input size. Accessing an element in an array by its index is a classic example of a constant time operation." },
    { question: "What is O(log n) or Logarithmic Time?", answer: "Logarithmic time complexity is extremely efficient. It means that as the input size 'n' doubles, the time to execute only increases by a single unit. Binary search on a sorted array is the most famous example. Each step of the search cuts the remaining data in half, which you can see in our <a href='/tools/algorithm-simulator' class='text-primary hover:underline'>Algorithm Step Simulator</a>." },
    { question: "What is the best vs. worst-case complexity?", answer: "Big O notation describes the worst-case scenario. For example, when searching for an item in a list (linear search), the worst case is that the item is at the very end, requiring you to check every single element (O(n)). The best case is that the item is at the very beginning (O(1)). Big O focuses on the worst case as it provides a reliable upper bound on performance." },
    { question: "How can I improve my code's time complexity?", answer: "Improving complexity often involves changing your algorithm or data structure. For example, instead of a nested loop to find duplicates (O(n²)), you could use a hash set to achieve O(n) on average. Using the right data structure for the job is key." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Big-O Complexity Quiz',
    description: 'A guide to testing your knowledge of algorithm time complexity.',
    step: [
        { '@type': 'HowToStep', name: 'Start Quiz', text: 'Begin the quiz to be presented with a series of code snippets.' },
        { '@type': 'HowToStep', name: 'Analyze Code', text: 'For each snippet, analyze the loops and operations to determine how the runtime scales with the input size.' },
        { '@type': 'HowToStep', name: 'Select Complexity', text: 'Choose the Big O notation that best represents the code\'s worst-case time complexity.' },
        { '@type': 'HowToStep', name: 'Review Score', text: 'After finishing, review your score and the explanations for any incorrect answers to improve your understanding.' },
    ],
    totalTime: 'PT3M'
};

export const keyTerminologies = [
    { term: 'Big O Notation', definition: 'A mathematical notation used to classify algorithms according to how their run time or space requirements grow as the input size grows.' },
    { term: 'Time Complexity', definition: 'A measure of the amount of time an algorithm takes to run as a function of the length of the input. This is what Big O notation typically describes.' },
    { term: 'Space Complexity', definition: 'A measure of the amount of memory space an algorithm requires as a function of the length of the input.' },
    { term: 'O(1) - Constant', definition: 'The algorithm takes the same amount of time regardless of the input size.' },
    { term: 'O(log n) - Logarithmic', definition: 'The time increases by a constant amount as the input size doubles. Very efficient.' },
    { term: 'O(n) - Linear', definition: 'The time grows linearly with the size of the input. A common and acceptable complexity.' },
    { term: 'O(n log n) - Linearithmic', definition: 'Slightly less efficient than linear, but still very good for large datasets. Common in efficient sorting algorithms.' },
    { term: 'O(n²) - Quadratic', definition: 'The time grows with the square of the input size. Becomes very slow with large inputs. Often involves nested loops.' },
    { term: 'O(2ⁿ) - Exponential', definition: 'The time doubles with each addition to the input size. Extremely slow and impractical for all but the smallest inputs.' },
];
