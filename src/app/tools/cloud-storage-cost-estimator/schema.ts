
export const faqData = [
    { question: "What is cloud object storage?", answer: "Object storage is a data storage architecture that manages data as objects, as opposed to a file hierarchy. It's ideal for unstructured data like images, videos, and backups. Major providers include AWS S3, Google Cloud Storage, and Azure Blob Storage." },
    { question: "Why does data transfer (egress) cost money?", answer: "Cloud providers charge for data transferred *out* of their network to the public internet. This is a significant cost factor because it consumes network bandwidth, which is a finite and expensive resource for the providers to maintain. Data transfer *into* the cloud is almost always free." },
    { question: "What is a 'storage class' or 'tier'?", answer: "Providers offer different storage tiers optimized for different access patterns. 'Standard' or 'Hot' tiers are for frequently accessed data and have higher storage costs but lower access costs. 'Archive' tiers (like AWS Glacier) are for long-term archival, with extremely low storage costs but high retrieval fees." },
    { question: "Are the prices in this tool accurate?", answer: "This tool uses recent, publicly available pricing for standard storage tiers but should be considered an *estimate*. Cloud pricing is complex and changes frequently. For exact billing, always use the official pricing calculator for the specific provider." },
    { question: "What is a GB-Month?", answer: "This is the standard unit for calculating storage costs. If you store 1 GB of data for 30 days, that is 1 GB-Month. If you store 30 GB for 1 day, that is also 1 GB-Month. It's a measure of volume over time." },
    { question: "How can I reduce my storage costs?", answer: "The best ways are to use a CDN to reduce egress, implement lifecycle policies to move old data to cheaper archive tiers, compress data before uploading, and delete data you no longer need. Use our <a href='/tools/compression-estimator' class='text-primary hover:underline'>Compression Savings Estimator</a> to see potential savings." },
    { question: "Does region choice affect cost?", answer: "Yes, significantly. The cost of storage, data transfer, and operations can vary widely from one geographic region to another, often based on local energy costs, taxes, and market competition." },
    { question: "What are 'requests costs' (GET, PUT)?", answer: "Providers charge a very small fee for every operation you perform, such as uploading a file (PUT request) or downloading it (GET request). For most use cases, this is a minor part of the bill, but for applications that access millions of tiny files, it can become significant." },
    { question: "What is a 'free tier'?", answer: "Most cloud providers offer a perpetual free tier that includes a small amount of storage (e.g., 5 GB), data transfer, and requests each month at no cost. This is great for small projects and learning. This estimator does not account for free tier usage." },
    { question: "Should I use one cloud provider or multiple?", answer: "Using a single provider is simpler to manage. A multi-cloud strategy can provide redundancy and allow you to take advantage of the best pricing for different services, but it adds significant architectural and operational complexity." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Cloud Storage Costs',
    description: 'A step-by-step guide to forecasting your monthly object storage expenses.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Storage and Transfer Needs', text: 'Input the total amount of data you plan to store and the amount you expect to transfer out (egress) each month.' },
        { '@type': 'HowToStep', name: 'Select Provider and Region', text: 'Choose your preferred cloud provider (AWS, Google, or Azure) and the geographic region where your data will be stored.' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate Cost" button to see the estimated monthly bill.' },
        { '@type': 'HowToStep', name: 'Analyze Breakdown', text: 'Review the results to see the cost breakdown between storage (the cost to keep your data) and data transfer (the cost to send it to users).' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Object Storage', definition: 'A data storage architecture for unstructured data, treating files as objects with metadata and a unique ID (e.g., AWS S3, Google Cloud Storage).' },
    { term: 'Egress', definition: 'Data traffic that exits a network. In cloud terms, this is data being transferred *out* of the cloud provider\'s network to the public internet, which incurs costs.' },
    { term: 'Ingress', definition: 'Data traffic that enters a network. Data transfer *into* the cloud is typically free.' },
    { term: 'Storage Tier/Class', definition: 'A category of object storage with a specific pricing model and performance characteristics, designed for different access patterns (e.g., Standard, Infrequent Access, Archive).' },
    { term: 'GB-Month', definition: 'The standard unit for calculating storage costs over time. Storing 100 GB for half a month would be 50 GB-Months.' },
    { term: 'CDN (Content Delivery Network)', definition: 'A network of distributed servers that caches content closer to users, reducing latency and egress costs from your origin storage.' }
];
