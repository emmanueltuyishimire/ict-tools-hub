
export const faqData = [
    { question: "What is a vCPU?", answer: "A vCPU (virtual Central Processing Unit) represents a share of a physical server's CPU core. When you provision a VM with 2 vCPUs, you are being allocated processing power equivalent to two hardware threads from the underlying host machine. More vCPUs allow your VM to run more tasks simultaneously." },
    { question: "How much RAM do I need?", answer: "This is highly dependent on your workload. A simple static website might only need 512MB of RAM, while a large database server might need 64GB or more to keep its data in cache. This tool provides a starting estimate, but monitoring your actual usage is key." },
    { question: "What does 'Performance Buffer' mean?", answer: "The performance buffer is extra capacity added on top of your estimated needs. A 25% buffer means we calculate your needs and then add an extra 25% to both CPU and RAM. This buffer is crucial for handling unexpected traffic spikes and preventing your application from slowing down under peak load." },
    { question: "Why is Windows Server more resource-intensive than Linux?", answer: "Windows Server has a full graphical user interface (GUI) and a larger set of background services running by default compared to a typical minimal Linux server installation. This graphical environment and additional services consume more baseline RAM and CPU resources." },
    { question: "What is a 'CPU-bound' vs. 'Memory-bound' workload?", answer: "A CPU-bound workload is one where performance is limited by the CPU's processing speed (e.g., video encoding). A Memory-bound workload is one limited by the amount of RAM available (e.g., an in-memory database). Identifying your workload type helps you decide whether to add more vCPUs or more RAM to improve performance." },
    { question: "Is it better to 'scale up' or 'scale out'?", answer: "'Scaling up' (vertical scaling) means making a single VM more powerful by adding more CPU/RAM. 'Scaling out' (horizontal scaling) means adding more, smaller VMs and distributing the load between them with a load balancer. Scaling out is often more resilient and flexible for modern web applications." },
    { question: "What are burstable instances (like AWS T-series)?", answer: "Burstable instances are a cost-effective option for workloads that have low average CPU usage but occasional spikes. They provide a baseline level of CPU performance and allow you to 'burst' to a higher level for short periods when needed. They are great for development servers, build servers, and low-traffic websites." },
    { question: "Can I change the size of my VM later?", answer: "Yes. One of the major advantages of cloud computing is flexibility. Most cloud providers allow you to easily resize your VM (change its instance type) with just a few clicks and a reboot. This makes it easy to 'right-size' your resources based on actual usage." },
    { question: "How do I monitor my VM's resource usage?", answer: "All major cloud providers (AWS CloudWatch, Google Cloud Monitoring, Azure Monitor) have built-in monitoring tools that provide detailed graphs of your VM's CPU utilization, memory usage, disk I/O, and network traffic. Setting up and regularly reviewing these dashboards is essential for performance tuning and cost optimization." },
    { question: "Does this calculator consider disk I/O?", answer: "No. This tool focuses on CPU and RAM. However, disk I/O (Input/Output Operations Per Second) is another critical performance factor, especially for databases. For I/O-bound workloads, choosing a VM with high-performance SSD or Provisioned IOPS storage is just as important as CPU and RAM." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate VM Resource Requirements',
    description: 'A step-by-step guide to getting a baseline estimate for your virtual machine\'s CPU and RAM needs.',
    step: [
        { '@type': 'HowToStep', name: 'Select OS and Workload', text: 'Choose your operating system (Linux/Windows) and the primary workload (e.g., Web Server, Database) for the VM.' },
        { '@type': 'HowToStep', name: 'Enter User Load', text: 'Specify the number of concurrent users or connections you expect the workload to handle.' },
        { '@type': 'HowToStep', name: 'Set Performance Buffer', text: 'Add a buffer (e.g., 25%) to account for traffic spikes and ensure smooth performance under peak load.' },
        { '@type': 'HowToStep', name: 'Estimate and Review', text: 'Click "Estimate Resources" to see the recommended vCPU count and RAM allocation. Use this as a starting point for provisioning your VM.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Virtual Machine (VM)', definition: 'A software-based emulation of a physical computer that runs on a host machine but functions as a separate computer system.' },
    { term: 'vCPU (Virtual CPU)', definition: 'A share of a physical CPU core\'s processing power that is allocated to a virtual machine.' },
    { term: 'RAM (Random Access Memory)', definition: 'The fast, volatile memory a computer uses to store the operating system, running applications, and data currently in use.' },
    { term: 'Workload', definition: 'The type of tasks a server performs. Different workloads have different resource needs (e.g., CPU-bound, Memory-bound, I/O-bound).' },
    { term: 'Provisioning', definition: 'The process of setting up IT infrastructure, including allocating and configuring resources for a new virtual machine.' },
    { term: 'Rightsizing', definition: 'The process of analyzing a VM\'s actual resource usage and adjusting its size to match its needs, avoiding waste (overprovisioning) or poor performance (underprovisioning).' },
];
