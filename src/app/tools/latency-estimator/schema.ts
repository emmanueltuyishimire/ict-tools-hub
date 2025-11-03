
export const faqData = [
    { question: "What is latency (ping)?", answer: "Latency, commonly known as 'ping', is the time it takes for a single packet of data to travel from your device to a server and back again. It's measured in milliseconds (ms). Lower latency is better, as it means a more responsive connection." },
    { question: "Why doesn't this match my actual ping test results?", answer: "This tool calculates the theoretical minimum latency based purely on the speed of light in fiber optic cables over the shortest possible distance (a straight line). Real-world latency is always higher due to several factors: network congestion, routing paths (which are never a straight line), processing time at each router and switch ('hops'), and the server's own processing time." },
    { question: "What is a 'good' ping?", answer: "It depends on the application. For competitive online gaming, a ping under 50ms is good, and under 20ms is excellent. For video conferencing, under 100ms is generally acceptable. For web browsing, you won't notice much difference until latency gets over 200ms." },
    { question: "How does this differ from bandwidth?", answer: "Bandwidth is the capacity of your connection (how much data you can transfer at once), while latency is the speed of that transfer. Think of it like a highway: bandwidth is the number of lanes, and latency is the speed limit. A 10-lane highway with a 20 mph speed limit (high bandwidth, high latency) will feel slow for a single car, while a 1-lane road with a 100 mph speed limit (low bandwidth, low latency) will feel very fast." },
    { question: "Why is the speed in fiber slower than the speed of light?", answer: "The speed of light in a vacuum is the absolute cosmic speed limit. When light travels through a medium like glass (in a fiber optic cable), it slows down because it interacts with the atoms in the material. The refractive index of the glass determines how much it slows down, which is typically to about 67% of its vacuum speed." },
    { question: "Does a VPN affect latency?", answer: "Yes, almost always. A VPN adds at least two extra 'hops' to your data's journey: from you to the VPN server, and from the VPN server to the final destination. This extra distance and processing time will increase your latency. The closer the VPN server is to you, the smaller the impact." },
    { question: "Can I reduce my latency?", answer: "To a degree. The physical distance to the server is a hard limit. However, you can improve real-world latency by using a wired Ethernet connection instead of Wi-Fi (which adds its own latency), choosing servers geographically closer to you (e.g., selecting 'US-East' instead of 'Asia' in a game menu), and using a high-quality ISP with efficient routing." },
    { question: "What is 'jitter'?", answer: "Jitter is the variation in latency over time. A stable connection might have a constant 30ms ping. A connection with high jitter might fluctuate between 20ms and 100ms. High jitter is very disruptive for real-time applications like VoIP and gaming, as it causes packets to arrive out of order, leading to stuttering and dropouts." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Network Latency',
    description: 'Calculate the theoretical minimum ping between two locations.',
    step: [
        { '@type': 'HowToStep', name: 'Select Start Location', text: 'Choose your starting point from the "Location A" dropdown list.' },
        { '@type': 'HowToStep', name: 'Select Destination Location', text: 'Choose the server or destination location from the "Location B" dropdown list.' },
        { '@type': 'HowToStep', name: 'Calculate Latency', text: 'Click the "Estimate Latency" button.' },
        { '@type': 'HowToStep', name: 'Review Results', text: 'The results will show the great-circle distance and the best-case round-trip time (RTT) based on the speed of light in fiber optic cable.' }
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Latency (Ping)', definition: 'The round-trip time it takes for a data packet to travel from a source to a destination and back, measured in milliseconds (ms).' },
    { term: 'RTT (Round-Trip Time)', definition: 'The total time taken for a signal to be sent plus the time taken for an acknowledgment of that signal to be received. This is what latency/ping measures.' },
    { term: 'Bandwidth', definition: 'The maximum capacity of a network connection, indicating how much data can be transferred per second (e.g., in Mbps).' },
    { term: 'Throughput', definition: 'The actual rate of data transfer that is achieved over a network, which is often lower than the theoretical maximum bandwidth.' },
    { term: 'Jitter', definition: 'The variation in latency over time. A high jitter can cause issues for real-time applications like VoIP and online gaming.' },
    { term: 'CDN (Content Delivery Network)', definition: 'A network of distributed servers that caches content closer to users, a primary method for reducing latency for a global audience.' },
];

    