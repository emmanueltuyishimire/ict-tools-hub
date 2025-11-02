
export const faqData = [
    { question: "What is VM scaling?", answer: "VM scaling is the process of adjusting the computational resources allocated to a virtual machine or a group of VMs to match workload demands. The goal is to ensure application performance and availability while minimizing costs." },
    { question: "What is the difference between vertical and horizontal scaling?", answer: "Vertical scaling ('scaling up') means making a single VM more powerful by adding more CPU or RAM. Horizontal scaling ('scaling out') means adding more VMs to a pool and distributing the load among them. This guide provides a detailed comparison." },
    { question: "Which scaling method is better?", answer: "Neither is universally 'better'; they suit different needs. Vertical scaling is simpler and often used for stateful applications like traditional databases. Horizontal scaling is more resilient, scalable, and cost-effective for modern, stateless web applications, but requires more architectural planning." },
    { question: "What is 'autoscaling'?", answer: "Autoscaling is a cloud computing feature that automatically adjusts the number of compute resources (in a horizontal scaling model) based on real-time demand. For example, it can automatically add more web servers during a traffic spike and remove them when the traffic subsides." },
    { question: "What is a 'stateless' application?", answer: "A stateless application is one that does not store any client session data on the server where it's running. Any necessary state is stored in a separate, shared backend resource like a database or a distributed cache. This design is a prerequisite for effective horizontal scaling, as any server in the pool can handle any user's request at any time." },
    { question: "What is a 'load balancer'?", answer: "A load balancer is a device or service that acts as a 'traffic cop' for your servers. It accepts incoming requests from users and distributes them across a pool of backend servers, ensuring no single server is overloaded. It is a critical component for horizontal scaling." },
    { question: "What are common triggers for autoscaling?", answer: "The most common trigger is average CPU utilization. A typical rule is to 'scale out' (add a VM) if the average CPU across the group exceeds 70% for 5 minutes, and 'scale in' (remove a VM) if it drops below 30%. Other triggers can include network traffic, request count, or the length of a processing queue." },
    { question: "Is scaling up (vertical scaling) instantaneous?", answer: "No. Resizing a VM almost always requires a reboot, which results in a brief period of downtime for the application running on it. This is why horizontal scaling is preferred for high-availability systems, as VMs can be added or removed from the pool with zero downtime." },
    { question: "What are the cost implications of each scaling model?", answer: "Vertical scaling can become very expensive, as the largest VM instances have a premium price. Horizontal scaling allows you to use cheaper, smaller instances and, with autoscaling, you only pay for the capacity you are actually using at any given moment, which is generally more cost-effective." },
    { question: "How do I monitor my VM's performance to know when to scale?", answer: "All major cloud providers have built-in monitoring tools (like AWS CloudWatch or Azure Monitor) that provide detailed graphs of CPU utilization, RAM usage, disk I/O, and network traffic. You should use these tools to understand your application's baseline performance and set appropriate thresholds for scaling alerts or autoscaling rules." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan a VM Scaling Strategy',
    description: 'A step-by-step framework for choosing between vertical and horizontal scaling.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Understand Your Workload', text: 'Analyze your application to determine if it is CPU-bound, memory-bound, or I/O-bound. This helps identify which resources need to scale.' },
        { '@type': 'HowToStep', name: 'Step 2: Choose Scaling Direction', text: 'Decide if vertical scaling (bigger server) or horizontal scaling (more servers) is a better fit for your application\'s architecture (stateful vs. stateless).' },
        { '@type': 'HowToStep', name: 'Step 3: Model Costs', text: 'Use cost calculators to estimate the financial impact of your chosen strategy. Compare the cost of one very large VM versus multiple smaller VMs.' },
        { '@type': 'HowToStep', name: 'Step 4: Define Autoscaling Triggers', text: 'If scaling horizontally, define the specific metrics (like CPU utilization > 70%) that will cause new instances to be added or removed.' },
        { '@type': 'HowToStep', name: 'Step 5: Monitor and Iterate', text: 'Deploy your initial setup, monitor its real-world performance, and use the data to continuously refine your instance sizes and scaling rules.' },
    ],
    totalTime: 'PT1H'
};

export const keyTerminologies = [
    { term: 'Vertical Scaling (Scaling Up)', definition: 'Increasing the resources of a single server, such as adding more CPU or RAM.' },
    { term: 'Horizontal Scaling (Scaling Out)', definition: 'Adding more servers to a pool to distribute the load across multiple machines.' },
    { term: 'Autoscaling', definition: 'A cloud feature that automatically adjusts the number of compute resources in response to real-time demand.' },
    { term: 'Load Balancer', definition: 'A service that distributes incoming network traffic across a group of backend servers.' },
    { term: 'Stateless Application', definition: 'An application that does not store client session data on the local server, a prerequisite for effective horizontal scaling.' },
    { term: 'Stateful Application', definition: 'An application that stores client data on the server that is handling the current session (e.g., a traditional database). These are typically harder to scale horizontally.' },
    { term: 'Monolithic Application', definition: 'An application built as a single, unified unit. These are often stateful and better suited to vertical scaling.' },
];
