import React from 'react';
import VmScalingCalculator from './vm-scaling-calculator';

export const metadata = {
    title: 'VM Scaling Planning Guide | Horizontal vs. Vertical Scaling | ICT Toolbench',
    description: 'A comprehensive guide to VM scaling. Learn the difference between vertical and horizontal scaling, and when to use each strategy to optimize performance and cost.',
    openGraph: {
        title: 'VM Scaling Planning Guide | ICT Toolbench',
        description: 'Plan your cloud infrastructure growth with our guide to vertical and horizontal VM scaling. Make informed decisions to ensure performance and manage costs.',
        url: '/tools/vm-scaling-calculator',
    }
};

export default function VmScalingCalculatorPage() {
    return <VmScalingCalculator />;
};
