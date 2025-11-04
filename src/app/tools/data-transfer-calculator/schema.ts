
export const faqData = [
    { question: "Why is my download speed slower than what my ISP advertises?", answer: "The advertised speed is a theoretical maximum ('up to'). Real-world speed, or 'throughput', is often lower due to factors like network congestion, Wi-Fi signal quality, server load on the other end, and protocol overhead. This calculator provides an estimate based on the speed you enter, which should be your actual measured speed for best results." },
    { question: "What is the difference between a megabit (Mb) and a megabyte (MB)?", answer: "This is a critical distinction. A byte is 8 bits. File sizes are measured in bytes (MB, GB), while internet speeds are measured in bits (Mbps, Gbps). To download a 10 MB file over a 10 Mbps connection, it will take 8 seconds, not 1. This calculator handles this 8-to-1 conversion automatically." },
    { question: "Why is upload speed important?", answer: "Upload speed is crucial for sending data *from* your device *to* the internet. This includes activities like uploading files to cloud storage, sending large email attachments, live video streaming, and video conferencing. Many internet plans are 'asymmetrical,' meaning their upload speed is much slower than their download speed." },
    { question: "How can I check my actual internet speed?", answer: "You can use various online speed test websites. For the most accurate result, use a computer connected directly to your router with an Ethernet cable and ensure no other devices are heavily using the network during the test." },
    { question: "Does latency affect transfer time?", answer: "Latency (or ping) is the delay before a transfer begins. For a single, large file transfer, its effect on the total time is minimal. However, for transferring thousands of small files, the cumulative delay can be significant. This calculator focuses on the time to transfer the bulk data, not the initial latency." },
    { question: "Is KiB/MiB the same as KB/MB?", answer: "They are very similar but technically different. KB/MB use decimal (base-10) prefixes (1 KB = 1000 bytes). KiB/MiB use binary (base-2) prefixes (1 KiB = 1024 bytes). This tool allows you to use both standards for file size." },
    { question: "How can I speed up my file transfers?", answer: "Aside from getting a faster internet plan, you can use a wired Ethernet connection instead of Wi-Fi, perform large transfers during off-peak hours when network congestion is lower, and compress your files into a single archive (like a .zip file) before uploading. You can estimate compression savings with our <a href='/tools/compression-estimator' class='text-primary hover:underline'>Compression Savings Estimator</a>." },
    { question: "Is this tool's calculation accurate?", answer: "This tool provides a mathematically accurate calculation based on the numbers you provide. However, it represents a best-case scenario. Real-world transfer times will always be slightly longer due to the factors mentioned above, like network overhead and server load." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Data Transfer Time',
    description: 'A step-by-step guide to estimating the duration of a file transfer.',
    step: [
        { '@type': 'HowToStep', name: 'Enter File Size', text: 'Input the total size of the data you need to transfer and select the correct unit (e.g., GB, TB).' },
        { '@type': 'HowToStep', name: 'Enter Transfer Speed', text: 'Input your network connection speed, making sure to use your upload speed for uploads or download speed for downloads. Select the correct unit (usually Mbps).' },
        { '@type': 'HowToStep', name: 'Calculate Transfer Time', text: 'Click the "Calculate Transfer Time" button.' },
        { '@type': 'HowToStep', name: 'Review the Estimate', text: 'The tool will display the estimated time required for the transfer in a human-readable format (days, hours, minutes, seconds).' }
    ],
    totalTime: 'PT1M'
};

export const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Data Transfer Time Calculator",
    "operatingSystem": "All",
    "applicationCategory": "Utilities",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to estimate file transfer times based on file size and network speed.",
    "url": "https://calculation.site/ict/tools/data-transfer-calculator"
};

export const keyTerminologies = [
    { term: 'Bit', definition: 'The smallest unit of data in computing. Network speeds are measured in bits per second.' },
    { term: 'Byte', definition: 'A group of 8 bits. File sizes are measured in bytes.' },
    { term: 'Bandwidth', definition: 'The maximum theoretical data transfer rate of a network, measured in bits per second (e.g., Mbps).' },
    { term: 'Throughput', definition: 'The actual measured data transfer rate achieved in a real-world scenario, which is often lower than the theoretical bandwidth.' },
    { term: 'Latency', definition: 'The delay in network communication, often called "ping," representing the time for a signal to travel to a destination and back.' },
    { term: 'Asymmetrical Connection', definition: 'An internet connection where the download speed is significantly faster than the upload speed, common for cable and DSL services.' },
];
