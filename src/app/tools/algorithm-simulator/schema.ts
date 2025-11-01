
export const faqData = [
    { question: "What is an algorithm?", answer: "An algorithm is a step-by-step set of instructions or rules designed to solve a specific problem or perform a computation. In computer science, algorithms are the foundation of all programs." },
    { question: "Why is visualizing algorithms important?", answer: "Visualizing an algorithm's steps helps to build an intuitive understanding of how it works. It makes abstract concepts like loops, comparisons, and swaps tangible, which is incredibly valuable for students learning data structures and algorithms." },
    { question: "What is Bubble Sort?", answer: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It's known for its simplicity but is very inefficient for large lists." },
    { question: "What is the time complexity of Bubble Sort?", answer: "The time complexity of Bubble Sort is O(n²) in the worst and average cases, where 'n' is the number of items being sorted. This makes it impractical for large datasets. You can learn more about this with our <a href='/tools/big-o-calculator' class='text-primary hover:underline'>Time Complexity Estimator</a>." },
    { question: "What is Linear Search?", answer: "Linear Search is the most basic search algorithm. It sequentially checks each element of a list until a match is found or the whole list has been searched. It does not require the list to be sorted." },
    { question: "What is the time complexity of Linear Search?", answer: "The time complexity of Linear Search is O(n) in the worst case, as it may have to check every single element in the list. On average, it checks n/2 elements." },
    { question: "Is Linear Search a good algorithm?", answer: "For small or unsorted lists, Linear Search is perfectly fine and simple to implement. For large, sorted lists, more efficient algorithms like Binary Search (which has a complexity of O(log n)) are far superior." },
    { question: "How does the 'Step' function in the simulator work?", answer: "Each 'step' in our simulator represents a single, meaningful action in the algorithm. For Bubble Sort, a step is one comparison and a potential swap. For Linear Search, a step is the inspection of one element. This helps to break down the process into understandable chunks." },
    { question: "Can I use my own data in the simulator?", answer: "This version of the simulator uses a pre-defined or randomly generated dataset to ensure a clear and controlled demonstration. Custom data input is a feature we are considering for the future." },
    { question: "What other algorithms can I visualize?", answer: "Currently, this tool simulates Bubble Sort and Linear Search. We plan to add more fundamental algorithms in the future, such as Insertion Sort, Selection Sort, and Binary Search." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Algorithm Step Simulator',
    description: 'A step-by-step guide to visualizing sorting and searching algorithms.',
    step: [
        { '@type': 'HowToStep', name: 'Select an Algorithm', text: 'Choose the algorithm you want to visualize from the dropdown menu (e.g., Bubble Sort, Linear Search).' },
        { '@type': 'HowToStep', name: 'Prepare Data', text: 'Click "Randomize" to generate a new set of data to be sorted or searched. If you are searching, enter the target value you want to find.' },
        { '@type': 'HowToStep', name: 'Control the Simulation', text: 'Use the control buttons: "Play" to run the simulation automatically, "Pause" to stop it, "Step" to advance one operation at a time, and "Reset" to start over.' },
        { '@type': 'HowToStep', name: 'Observe the Visualization', text: 'The main display shows the data array. The colors highlight the elements currently being processed: compared, swapped, or finalized. The log below provides a textual explanation of each step.' },
    ],
    totalTime: 'PT3M',
};

export const keyTerminologies = [
    { term: 'Algorithm', definition: 'A finite sequence of well-defined, computer-implementable instructions to solve a class of problems or to perform a computation.' },
    { term: 'Time Complexity', definition: 'A measure of the amount of time an algorithm takes to run as a function of the length of the input. Often expressed using Big O notation.' },
    { term: 'Bubble Sort', definition: 'A simple comparison-based sorting algorithm where adjacent elements are repeatedly compared and swapped until the list is sorted. It has a time complexity of O(n²).' },
    { term: 'Linear Search', definition: 'A sequential search algorithm that starts at one end and goes through each element of a list until the desired element is found. It has a time complexity of O(n).' },
    { term: 'Comparison', definition: 'The act of comparing two elements to determine their relative order, a fundamental operation in many sorting algorithms.' },
    { term: 'Swap', definition: 'The act of exchanging the positions of two elements in an array or list.' },
];
