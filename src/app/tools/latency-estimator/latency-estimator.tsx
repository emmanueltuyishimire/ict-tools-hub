
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Check, Timer, MapPin, Gauge } from 'lucide-react';
import Link from 'next/link';

// Data for major world cities
const cities = [
    { name: 'New York, USA', lat: 40.7128, lon: -74.0060 },
    { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo, Japan', lat: 35.6895, lon: 139.6917 },
    { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Frankfurt, Germany', lat: 50.1109, lon: 8.6821 },
    { name: 'São Paulo, Brazil', lat: -23.5505, lon: -46.6333 },
    { name: 'Johannesburg, South Africa', lat: -26.2041, lon: 28.0473 },
    { name: 'Mumbai, India', lat: 19.0760, lon: 72.8777 },
    { name: 'Los Angeles, USA', lat: 34.0522, lon: -118.2437 },
    { name: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
    { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708 },
    { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6173 },
    { name: 'Toronto, Canada', lat: 43.6532, lon: -79.3832 },
    { name: 'Ashburn, USA (N. Virginia)', lat: 39.0438, lon: -77.4874 },
    { name: 'Seattle, USA', lat: 47.6062, lon: -122.3321 },
    { name: 'Chicago, USA', lat: 41.8781, lon: -87.6298 },
    { name: 'Dallas, USA', lat: 32.7767, lon: -96.7970 },
    { name: 'Miami, USA', lat: 25.7617, lon: -80.1918 },
    { name: 'Amsterdam, Netherlands', lat: 52.3676, lon: 4.9041 },
    { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
    { name: 'Seoul, South Korea', lat: 37.5665, lon: 126.9780 },
    { name: 'Beijing, China', lat: 39.9042, lon: 116.4074 },
];

const SPEED_OF_LIGHT_VACUUM = 299792.458; // km/s
const SPEED_OF_LIGHT_FIBER = SPEED_OF_LIGHT_VACUUM * 0.67; // approx. 2/3 speed of light

// Haversine formula to calculate distance between two lat/lon points
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is latency (ping)?", answer: "Latency, commonly known as 'ping', is the time it takes for a single packet of data to travel from your device to a server and back again. It's measured in milliseconds (ms). Lower latency is better, as it means a more responsive connection." },
    { question: "Why doesn't this match my actual ping test results?", answer: "This tool calculates the theoretical minimum latency based purely on the speed of light in fiber optic cables over the shortest possible distance (a straight line). Real-world latency is always higher due to several factors: network congestion, routing paths (which are never a straight line), processing time at each router and switch ('hops'), and the server's own processing time." },
    { question: "What is a 'good' ping?", answer: "It depends on the application. For competitive online gaming, a ping under 50ms is good, and under 20ms is excellent. For video conferencing, under 100ms is generally acceptable. For web browsing, you won't notice much difference until latency gets over 200ms." },
    { question: "How does this differ from bandwidth?", answer: "Bandwidth is the capacity of your connection (how much data you can transfer at once), while latency is the speed of that transfer. Think of it like a highway: bandwidth is the number of lanes, and latency is the speed limit. A 10-lane highway with a 20 mph speed limit (high bandwidth, high latency) will feel slow for a single car, while a 1-lane road with a 100 mph speed limit (low bandwidth, low latency) will feel very fast." },
    { question: "Why is the speed in fiber slower than the speed of light?", answer: "The speed of light in a vacuum is the absolute cosmic speed limit. When light travels through a medium like glass (in a fiber optic cable), it slows down because it interacts with the atoms in the material. The refractive index of the glass determines how much it slows down, which is typically to about 67% of its vacuum speed." },
    { question: "Does a VPN affect latency?", answer: "Yes, almost always. A VPN adds at least two extra 'hops' to your data's journey: from you to the VPN server, and from the VPN server to the final destination. This extra distance and processing time will increase your latency. The closer the VPN server is to you, the smaller the impact." },
    { question: "Can I reduce my latency?", answer: "To a degree. The physical distance to the server is a hard limit. However, you can improve real-world latency by using a wired Ethernet connection instead of Wi-Fi (which adds its own latency), choosing servers geographically closer to you (e.g., selecting 'US-East' instead of 'Asia' in a game menu), and using a high-quality ISP with efficient routing." },
    { question: "What is 'jitter'?", answer: "Jitter is the variation in latency over time. A stable connection might have a constant 30ms ping. A connection with high jitter might fluctuate between 20ms and 100ms. High jitter is very disruptive for real-time applications like VoIP and gaming, as it causes packets to arrive out of order, leading to stuttering and dropouts." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
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

// --- Component ---
export function LatencyEstimator() {
    const [locationA, setLocationA] = useState('New York, USA');
    const [locationB, setLocationB] = useState('London, UK');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);

    const handleCalculate = () => {
        setError('');
        if (locationA === locationB) {
            setError('Please select two different locations.');
            setResults(null);
            return;
        }

        const cityA = cities.find(c => c.name === locationA);
        const cityB = cities.find(c => c.name === locationB);

        if (!cityA || !cityB) {
            setError('Could not find location data. Please try again.');
            setResults(null);
            return;
        }

        const distance = haversineDistance(cityA.lat, cityA.lon, cityB.lat, cityB.lon);
        // One-way time in seconds
        const oneWayTime = distance / SPEED_OF_LIGHT_FIBER;
        // Round-trip time in milliseconds
        const roundTripTime = oneWayTime * 2 * 1000;

        setResults({
            distance: Math.round(distance),
            rtt: parseFloat(roundTripTime.toFixed(2)),
            cityA,
            cityB,
        });
    };

    useEffect(() => {
        if (results && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            resultRef.current.focus();
        }
    }, [results]);

    const presets = [
        { from: 'New York, USA', to: 'Los Angeles, USA', label: 'US Coast-to-Coast' },
        { from: 'New York, USA', to: 'London, UK', label: 'Transatlantic (NY-London)' },
        { from: 'London, UK', to: 'Tokyo, Japan', label: 'Europe to Asia' },
        { from: 'Los Angeles, USA', to: 'Sydney, Australia', label: 'Transpacific (LA-Sydney)' },
    ];
    
    const handlePresetClick = (from: string, to: string) => {
        setLocationA(from);
        setLocationB(to);
        // This is a bit of a trick to trigger calculation after state is set.
        // In a real app, you might want a more robust way to handle this,
        // but for this demo, we'll just call it directly.
        // A better approach would be useEffect on locationA and locationB.
        setTimeout(() => document.getElementById('calculate-btn')?.click(), 0);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>Latency Estimator</CardTitle>
                    <CardDescription>
                        Select two locations to estimate the theoretical best-case latency (ping) between them.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Quick Presets</Label>
                        <div className="flex flex-wrap gap-2">
                             {presets.map(p => (
                                <Button key={p.label} variant="outline" size="sm" onClick={() => handlePresetClick(p.from, p.to)}>{p.label}</Button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="loc-a">Location A</Label>
                            <Select value={locationA} onValueChange={setLocationA}>
                                <SelectTrigger id="loc-a"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {cities.sort((a,b) => a.name.localeCompare(b.name)).map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="loc-b">Location B</Label>
                            <Select value={locationB} onValueChange={setLocationB}>
                                <SelectTrigger id="loc-b"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {cities.sort((a,b) => a.name.localeCompare(b.name)).map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button id="calculate-btn" onClick={handleCalculate} className="w-full sm:w-auto"><Timer className="mr-2 h-4 w-4" /> Estimate Latency</Button>
                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {results && (
                <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estimated Latency Results</CardTitle>
                            <CardDescription>From {results.cityA.name} to {results.cityB.name}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 sm:grid-cols-2 text-center">
                            <div className="bg-muted p-4 rounded-lg">
                                <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Great-Circle Distance</p>
                                <p className="text-3xl font-bold">{results.distance.toLocaleString()} km</p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg border-2 border-primary/50">
                                <Gauge className="mx-auto h-8 w-8 text-primary mb-2" />
                                <p className="text-sm text-muted-foreground">Theoretical Best RTT (Ping)</p>
                                <p className="text-3xl font-bold text-primary">{results.rtt} ms</p>
                            </div>
                        </CardContent>
                         <CardContent>
                             <Alert>
                                <Lightbulb className="h-4 w-4" />
                                <AlertTitle>This is the speed-of-light limit!</AlertTitle>
                                <AlertDescription>
                                    Your actual ping will be higher due to router hops, network congestion, and server processing time. This value represents the absolute fastest possible time, which is useful for understanding the physical limitations of your connection.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </div>
            )}
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Latency Estimator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool helps you understand the physical limits of network speed. It calculates the absolute minimum time it takes for data to travel from one point on Earth to another and back again.</p>
                    <ol>
                        <li><strong>Select a Starting Point:</strong> Choose your location (or where your device is) from the "Location A" dropdown.</li>
                        <li><strong>Select a Destination:</strong> Choose the location of the server you want to connect to from the "Location B" dropdown. You can use our presets for common routes.</li>
                        <li><strong>Estimate Latency:</strong> Click the "Estimate Latency" button.</li>
                        <li><strong>Analyze the Results:</strong>
                            <ul>
                                <li><strong>Distance:</strong> This is the shortest possible path (a "great-circle" line) between the two cities. Real-world fiber optic cables follow coastlines and roads, so their path is always longer.</li>
                                <li><strong>Theoretical Best RTT (Ping):</strong> This is the Round-Trip Time. It's the time for a light pulse to travel the calculated distance *twice* (there and back) through a perfect fiber optic cable. This is the "speed of light" ping, a limit set by physics.</li>
                            </ul>
                        </li>
                    </ol>
                     <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Why is my real ping higher?</AlertTitle>
                        <AlertDescription>
                         Every router, switch, and server your data passes through adds a few milliseconds of processing delay. Network congestion adds more. This tool gives you the baseline. If your actual ping is 150ms and the theoretical best is 120ms, that means 30ms is being added by the real-world network infrastructure.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: Latency vs. Bandwidth</CardTitle>
                    </div>
                    <CardDescription>Uncover why "ping" is often more important than "speed" for making your connection feel fast.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">The Two Pillars of Network Performance</h3>
                        <p>When people talk about a "fast" internet connection, they are usually talking about **bandwidth**. It's the big number ISPs advertise: 500 Mbps, 1 Gbps, etc. Bandwidth is the *capacity* of your connection. Using the classic highway analogy, bandwidth is the number of lanes. More lanes mean more cars (data) can travel at the same time.</p>
                        <p>But there's another, equally important pillar: **latency**. Latency (or ping) is the *delay* of your connection. It's the time it takes for a single piece of information to make a round trip. In the highway analogy, latency is the time it takes for a single car to drive to a destination and come back. This is dictated by the speed limit and the distance. No matter how many lanes you add to the highway, you cannot make the car's journey faster than the speed limit and the physical distance allow.</p>
                        <p>This calculator focuses exclusively on the physical distance component of latency, which is governed by the speed of light. It's the hard, unbreakable speed limit of the internet. You can use our <Link href="/tools/bandwidth-estimator" className="text-primary hover:underline">Bandwidth Estimator</Link> to analyze the other side of this equation.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">When Does Latency Matter Most?</h3>
                        <p>High bandwidth is great for downloading large files, streaming 4K movies, or having many people use the internet at once. But for activities that depend on real-time interaction, low latency is king.</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Online Gaming:</strong> This is the classic example. In a fast-paced game, your actions need to reach the server instantly. If your ping is 150ms, it means there's a 0.15-second delay between when you click the mouse and when the server registers your action. In a competitive environment, this is a massive disadvantage.</li>
                            <li><strong>Video Conferencing (Zoom, Teams):</strong> High latency causes that awkward lag where you talk over each other. Your audio and video take longer to arrive, making conversation unnatural.</li>
                            <li><strong>VoIP Calls:</strong> Similar to video conferencing, high latency in voice calls leads to delays and choppy audio, making it difficult to hold a conversation.</li>
                            <li><strong>Remote Desktop & Cloud Computing:</strong> When you're controlling another computer remotely, every mouse movement and keystroke has to make a round trip. High latency makes this feel sluggish and unresponsive.</li>
                        </ul>
                         <p>For these applications, a connection with lower bandwidth but excellent latency (e.g., 50 Mbps fiber with 10ms ping) will feel much "faster" than a connection with huge bandwidth but poor latency (e.g., 1000 Mbps cable with 80ms ping).</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">What Makes Up Real-World Latency?</h3>
                        <p>This tool shows you the best-case scenario. Here's what adds on top of that physical limit to create the final ping you see in a speed test:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                           <li><strong>Propagation Delay:</strong> This is what our tool calculates. The time it takes for light to travel the physical distance through fiber. This is the largest and unavoidable component of long-distance communication.</li>
                           <li><strong>Transmission Delay:</strong> The time it takes to push all the bits of a packet onto the wire. This is affected by bandwidth but is usually negligible on modern broadband connections. Check out our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link> to see how this plays out.</li>
                           <li><strong>Processing Delay:</strong> Every router, switch, and firewall between you and the server must read the packet's header and decide where to send it next. Each "hop" adds a small delay, typically 1-2ms per hop. A cross-country connection might have 10-20 hops.</li>
                           <li><strong>Queuing Delay:</strong> If a router is congested with too much traffic, your packet has to wait in a line (a queue or buffer) before it can be processed. This is the primary cause of "lag spikes" and jitter.</li>
                            <li><strong>Server-Side Delay:</strong> The time it takes for the destination server itself to process your request and generate a response.</li>
                        </ol>
                    </section>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Pick the Right Server:</strong> Before starting an online game or a video call, check if the application lets you choose a server region. Always pick the one geographically closest to you. This tool can help you understand why a 'US-East' server gives a better experience from New York than a 'US-West' one.</li>
                            <li><strong>Go Wired:</strong> Wi-Fi adds its own latency (5-20ms or more). For latency-sensitive tasks like gaming, always use a wired Ethernet connection to your router.</li>
                            <li><strong>Understand "Peering":</strong> Not all ISPs are equal. Some have better 'peering' agreements, meaning they have more direct, efficient routes to popular services like Netflix or AWS. This results in fewer hops and lower latency.</li>
                            <li><strong>Use as a Sanity Check:</strong> If you're in London and a speed test to a server in London shows a 100ms ping, you know something is very wrong with your local network or ISP, because the speed-of-light delay should be less than 1ms.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Confusing Latency with Bandwidth:</strong> Thinking that upgrading to a faster (higher bandwidth) internet plan will automatically lower your ping for gaming. While it can help reduce queuing delay, it cannot overcome the physical distance to the server.</li>
                            <li><strong>Ignoring Physical Distance:</strong> Expecting a low ping to a server on the other side of the world. Physics is the ultimate limitation; data can't travel faster than light.</li>
                             <li><strong>Blaming the Server:</strong> While servers can be overloaded, often high ping is due to the network path *to* the server. Use `traceroute` (or `tracert` on Windows) to see the 'hops' your data takes and where delays are being introduced.</li>
                            <li><strong>Overlooking Local Network Issues:</strong> A slow or old router, a bad Ethernet cable, or a computer running too many background processes can all add latency before your data even leaves your home.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
             <section>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
            
             <section>
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/bandwidth-estimator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Network Bandwidth Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Estimate the other side of the equation: how much bandwidth (capacity) you need.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/data-transfer-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">See how bandwidth and file size affect download/upload duration.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Proper network design can reduce the number of hops and improve latency.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
