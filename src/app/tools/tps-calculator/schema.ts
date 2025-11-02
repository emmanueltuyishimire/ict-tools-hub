
export const faqData = [
    { question: "What does TPS stand for?", answer: "TPS stands for Transactions Per Second. It is a common metric used to measure the throughput or performance of a computer system, indicating how many atomic operations it can process in one second." },
    { question: "What counts as a 'transaction'?", answer: "The definition of a transaction depends on the context. For a database, it might be a single SQL query. For an API, it's one HTTP request. For an e-commerce platform, it could be a completed order. It represents a single, logical unit of work." },
    { question: "Is higher TPS always better?", answer: "Generally, yes. A higher TPS means the system can handle a greater load. However, it must be considered alongside latency. A system with very high TPS but also very high latency (slow individual responses) may still provide a poor user experience." },
    { question: "How does TPS relate to hardware performance?", answer: "A system's maximum TPS is limited by its bottleneck, which could be its CPU, RAM, disk I/O speed, or network bandwidth. To increase TPS, you must identify and upgrade the limiting resource." },
    { question: "What is the difference between TPS and QPS?", answer: "TPS (Transactions Per Second) and QPS (Queries Per Second) are often used interchangeably. QPS is more specific to databases and refers to the number of SQL queries. TPS is a more general term that can apply to any system." },
    { question: "How can I measure my application's TPS?", answer: "You can measure TPS through load testing tools (like JMeter, k6, or Locust) that simulate a large number of concurrent users making requests to your system. Application Performance Monitoring (APM) tools also track TPS in real-time for production systems." },
    { question: "How does concurrency affect TPS?", answer: "Concurrency is the number of operations happening at the same time. As concurrency increases, TPS will typically rise until it hits a saturation point where a system resource becomes a bottleneck. Beyond this point, increasing concurrency will cause TPS to level off or even decrease as the system becomes overloaded." },
    { question: "Can I use this tool to calculate my required bandwidth?", answer: "Not directly. This tool calculates the number of transactions, not the size of the data transferred. To calculate bandwidth, you would need to know the average size of each transaction and use a tool like our Data Transfer Time Calculator." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Transactions Per Second (TPS)',
    description: 'A step-by-step guide to calculating TPS from a total transaction count and time period.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Total Transactions', text: 'Input the total number of operations or transactions that were completed.' },
        { '@type': 'HowToStep', name: 'Enter Time Period', text: 'Input the duration over which the transactions occurred and select the correct time unit (Seconds, Minutes, or Hours).' },
        { '@type': 'HowToStep', name: 'View the Result', text: 'The tool will automatically calculate and display the average Transactions Per Second (TPS).' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'TPS (Transactions Per Second)', definition: 'A measure of system throughput, representing the number of atomic operations processed per second.' },
    { term: 'Throughput', definition: 'The rate at which a system can process work. TPS is a measure of throughput.' },
    { term: 'Latency', definition: 'The time it takes for a single operation to complete. It is the measure of a system\'s responsiveness.' },
    { term: 'Concurrency', definition: 'The number of operations or requests being processed by a system at the same time.' },
    { term: 'Bottleneck', definition: 'The most constrained resource in a system (e.g., CPU, disk I/O) that limits its overall performance and maximum TPS.' },
    { term: 'Benchmarking', definition: 'The process of testing a system\'s performance under a specific workload to establish a baseline metric, such as its maximum TPS.' },
];

    