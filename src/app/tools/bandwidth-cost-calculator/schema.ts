
export const faqData = [
    { question: "What is data transfer 'egress'?", answer: "Egress refers to data traffic that exits a cloud provider's network and is sent to the public internet. It is one of the most significant and often overlooked costs of cloud computing. This tool helps you estimate these costs." },
    { question: "Why do cloud providers charge for egress?", answer: "Providers charge for egress because they have to pay for the massive, redundant, and high-speed internet connections required to deliver data globally. These costs are passed on to customers. In contrast, data ingress (transfer into the cloud) is almost always free." },
    { question: "What is tiered pricing for bandwidth?", answer: "Tiered pricing means the cost per gigabyte of data transfer decreases as your total usage increases. For example, your first 10 TB might cost $0.09/GB, but the next 40 TB might cost $0.07/GB. This benefits high-volume users." },
    { question: "Does this calculator include the free tier?", answer: "This tool uses simplified pricing tiers for estimation and may not reflect the full free tier offered by providers (e.g., AWS offers 100GB free egress per month). It is best used for planning and understanding how costs scale beyond the free tier." },
    { question: "How can I reduce my egress costs?", answer: "The most effective method is to use a Content Delivery Network (CDN). CDNs often have cheaper bandwidth rates and can cache your content, reducing requests to your origin. Other methods include compressing your data and architecting your application to minimize data transfer between regions." },
    { question: "Is data transfer between cloud regions free?", answer: "No. Data transfer between different cloud regions (e.g., from a US server to a European database) is cheaper than egress to the internet, but it is not free and can be a significant cost. Transfer within the same region is often free or very low-cost." },
    { question: "How can I monitor my actual egress costs?", answer: "All major cloud providers (AWS, Google Cloud, Azure) have detailed billing dashboards and cost explorers. It is crucial to set up billing alerts to be notified if your spending on data transfer unexpectedly spikes." },
    { question: "How does this relate to other tools?", answer: "This tool focuses on egress costs. For a more holistic view, you can use our <a href='/tools/cloud-storage-cost-estimator' class='text-primary hover:underline'>Cloud Storage Cost Estimator</a>, which combines storage and egress. To see how egress impacts performance, use our <a href='/tools/data-transfer-calculator' class='text-primary hover:underline'>Data Transfer Time Calculator</a>." },
    { question: "What is a 'bill shock'?", answer: "Bill shock is the surprise a cloud user experiences when they receive a much higher bill than expected. Egress costs are the most common cause of bill shock for new cloud users who are not aware of the fees." },
    { question: "Are all egress types priced the same?", answer: "No. Egress to the internet is the most expensive. Egress to other regions is cheaper, and egress to specific dedicated services (like a CDN front-end) can have special pricing. Always check your provider's specific pricing details." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Cloud Bandwidth Costs',
    description: 'Estimate your monthly data egress costs from major cloud providers.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Data Transfer Amount', text: 'Input the total amount of data you expect to transfer out to the internet each month, specifying GB or TB.' },
        { '@type': 'HowToStep', name: 'Select Provider', text: 'Choose your cloud provider (AWS, Google Cloud, or Azure).' },
        { '@type': 'HowToStep', name: 'Calculate Cost', text: 'Click the "Calculate Cost" button to see the estimated monthly expense based on the provider\'s tiered pricing.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Egress', definition: 'Network traffic that leaves a provider\'s network and is sent to the public internet. This is a primary source of cloud costs.' },
    { term: 'Ingress', definition: 'Network traffic that enters a provider\'s network. This is almost always free.' },
    { term: 'Tiered Pricing', definition: 'A pricing model where the cost per unit (e.g., per GB) decreases as the total volume of usage increases.' },
    { term: 'CDN (Content Delivery Network)', definition: 'A distributed network of servers that caches content and can significantly reduce egress costs from your origin server.' },
    { term: 'Free Tier', definition: 'A certain amount of service usage (e.g., the first 100 GB of egress) that a cloud provider offers for free each month.' },
];
