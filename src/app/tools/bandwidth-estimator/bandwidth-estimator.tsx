'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Plus, Trash2, SlidersHorizontal, Network, User, Activity, Percent } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const activityData = {
    'web-browsing': { name: 'Light Web Browsing', bandwidth: 1 },
    'hd-streaming': { name: 'HD Video Streaming', bandwidth: 5 },
    '4k-streaming': { name: '4K/UHD Video Streaming', bandwidth: 25 },
    'online-gaming': { name: 'Online Gaming', bandwidth: 3 },
    'video-conferencing': { name: 'Video Conferencing (HD)', bandwidth: 4 },
    'voip-call': { name: 'VoIP Call', bandwidth: 0.1 },
    'large-downloads': { name: 'Large File Downloads/Uploads', bandwidth: 10 },
    'music-streaming': { name: 'Music Streaming', bandwidth: 0.5 },
    'social-media': { name: 'Social Media & Email', bandwidth: 1 },
};

const faqData = [
    { question: "What is network bandwidth?", answer: "Network bandwidth is the maximum rate at which data can be transferred across a network path. It's often measured in megabits per second (Mbps). Think of it like the width of a highway—a wider highway can handle more cars (data) at once, preventing traffic jams (latency and buffering)." },
    { question: "What's the difference between bandwidth and internet speed?", answer: "While often used interchangeably, they are different. Bandwidth is the maximum potential data transfer rate of your connection. Internet speed is the actual rate at which you are currently transferring data, which can be affected by many factors like network congestion, server performance, and your local network setup. This tool helps you estimate the bandwidth you should be aiming for." },
    { question: "What is Mbps?", answer: "Mbps stands for Megabits Per Second. It's a standard unit of measurement for data transfer rates. One megabit is equal to one million bits. Internet service providers almost always advertise their plan speeds in Mbps." },
    { question: "Why is upload speed important?", answer: "Upload speed is crucial for activities where you send data from your device to the internet. This includes video conferencing (sending your video feed), online gaming (sending your actions to the server), uploading large files to cloud storage, and live streaming. Asymmetrical connections (like cable internet) often have much lower upload speeds than download speeds." },
    { question: "What is concurrency and why does it matter?", answer: "Concurrency refers to the number of devices or activities using the network at the same time. It's unlikely that every single device in a household or office will be performing its most bandwidth-intensive task at the exact same moment. The concurrency factor (e.g., 75%) helps provide a more realistic estimate by assuming only a certain percentage of the total potential load will occur simultaneously." },
    { question: "Why does 4K streaming require so much bandwidth?", answer: "A 4K Ultra HD video has four times the number of pixels as a 1080p HD video. To deliver this incredibly detailed picture without buffering, a massive amount of data must be streamed to your device every second, which requires a high-bandwidth connection. A stable 25 Mbps is the recommended minimum for a smooth 4K experience." },
    { question: "Does online gaming really use less bandwidth than streaming?", answer: "Yes, in terms of raw bandwidth, gaming is surprisingly light. A typical online game might only use 3-4 Mbps. This is because the game primarily sends small packets of data for your position, actions, and the state of other players. However, gaming is extremely sensitive to latency (ping), so while it doesn't need high bandwidth, it does need a stable, low-latency connection." },
    { question: "How much bandwidth do I need for a 'smart home'?", answer: "Most smart home devices (lights, thermostats, smart plugs) use very little bandwidth individually. However, the cumulative effect can be noticeable. The biggest bandwidth consumers are smart security cameras, especially those that stream high-definition video to the cloud. When planning, account for each camera as a separate video streaming device." },
    { question: "What is a 'Contention Ratio'?", answer: "A contention ratio is a term used by Internet Service Providers (ISPs) to describe how many users are sharing the total bandwidth available in a particular area. A ratio of 50:1 means up to 50 households are sharing the same main line. During peak hours (evenings, weekends), if many people in your area are online, your actual speeds may be lower than advertised due to this sharing." },
    { question: "Is it better to have more bandwidth than I need?", answer: "Yes, it's always better to have some overhead. This 'buffer' bandwidth ensures that your connection remains stable even when unexpected tasks occur, like a background software update or a new device connecting to the network. This calculator includes a 20% overhead recommendation to account for this." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Your Network Bandwidth Needs',
    description: 'Calculate the required internet bandwidth for your home or office based on devices and usage.',
    step: [
        { '@type': 'HowToStep', name: 'Add Usage Profiles', text: 'For each type of activity (e.g., video streaming, gaming), add a row. Specify the number of devices that will be performing this activity.' },
        { '@type': 'HowToStep', name: 'Set Concurrency', text: 'Adjust the "Peak Usage Concurrency" slider. This represents the percentage of the total activity you expect to happen at the same time during your busiest period. 100% means you expect everything to happen at once.' },
        { '@type': 'HowToStep', name: 'Calculate and Review', text: 'Click "Estimate Bandwidth". The tool calculates the total required bandwidth for concurrent usage and adds a recommended 20% overhead for stability.' },
        { '@type': 'HowToStep', name: 'Interpret the Results', text: 'The final result is the recommended internet plan speed you should look for (e.g., 150 Mbps). This ensures a smooth experience for all users during peak times.' }
    ],
    totalTime: 'PT3M',
};

type UsageRow = { id: number; activity: string; devices: number | '' };
type Result = { totalRequired: number; recommended: number; breakdown: any[] };

export function BandwidthEstimator() {
    let nextId = 2;
    const [usageRows, setUsageRows] = useState<UsageRow[]>([
        { id: 1, activity: 'hd-streaming', devices: 2 },
    ]);
    const [concurrency, setConcurrency] = useState(75);
    const [results, setResults] = useState<Result | null>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);

    const handleCalculate = () => {
        setError('');
        const validRows = usageRows.filter(row => row.devices > 0 && activityData[row.activity]);
        if (validRows.length === 0) {
            setError('Please add at least one activity with a valid number of devices.');
            return;
        }

        const breakdown = validRows.map(row => {
            const activity = activityData[row.activity];
            const totalBw = activity.bandwidth * (row.devices as number);
            return { name: activity.name, devices: row.devices, totalBw: totalBw };
        });

        const totalPotential = breakdown.reduce((acc, curr) => acc + curr.totalBw, 0);
        const totalRequired = totalPotential * (concurrency / 100);
        const recommended = totalRequired * 1.20; // 20% overhead

        setResults({
            totalRequired: parseFloat(totalRequired.toFixed(2)),
            recommended: parseFloat(recommended.toFixed(2)),
            breakdown: breakdown,
        });
    };

    useEffect(() => {
        if (results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const handleAddRow = () => {
        setUsageRows([...usageRows, { id: nextId++, activity: 'web-browsing', devices: 1 }]);
    };

    const handleRemoveRow = (id: number) => {
        setUsageRows(usageRows.filter(row => row.id !== id));
    };

    const handleRowChange = (id: number, field: 'activity' | 'devices', value: string) => {
        const newRows = usageRows.map(row => {
            if (row.id === id) {
                const updatedValue = field === 'devices' ? (value === '' ? '' : parseInt(value, 10)) : value;
                return { ...row, [field]: updatedValue };
            }
            return row;
        });
        setUsageRows(newRows);
    };
    
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>Bandwidth Estimator</CardTitle>
                    <CardDescription>
                        Define your household or office usage to get a tailored bandwidth recommendation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className='space-y-4'>
                        <Label>User Activities</Label>
                        {usageRows.map((row, index) => (
                            <div key={row.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                                <div className="sm:col-span-7">
                                    <Select value={row.activity} onValueChange={(v) => handleRowChange(row.id, 'activity', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(activityData).map(([key, data]) => (
                                                <SelectItem key={key} value={key}>{data.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="sm:col-span-4">
                                    <Input
                                        type="number"
                                        min="1"
                                        value={row.devices}
                                        onChange={(e) => handleRowChange(row.id, 'devices', e.target.value)}
                                        placeholder="No. of Devices"
                                    />
                                </div>
                                <div className="sm:col-span-1">
                                    <Button size="icon" variant="ghost" onClick={() => handleRemoveRow(row.id)} aria-label="Remove Row">
                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={handleAddRow}><Plus className="mr-2 h-4 w-4" /> Add Activity</Button>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className='flex justify-between items-center'>
                             <Label htmlFor="concurrency">Peak Usage Concurrency</Label>
                             <span className='font-bold text-primary'>{concurrency}%</span>
                        </div>
                        <Slider
                            id="concurrency"
                            min={10}
                            max={100}
                            step={5}
                            value={[concurrency]}
                            onValueChange={(value) => setConcurrency(value[0])}
                        />
                        <p className="text-sm text-muted-foreground">
                            Estimate what percentage of these activities will happen at the exact same time during your busiest hours.
                        </p>
                    </div>

                    <Button onClick={handleCalculate} className="w-full sm:w-auto"><Network className="mr-2 h-4 w-4" /> Estimate Bandwidth</Button>
                    
                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Input Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
            
            {results && (
                <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bandwidth Recommendation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <p className="text-muted-foreground">Recommended Internet Plan Speed</p>
                                <p className="text-5xl font-bold text-primary">{results.recommended} Mbps</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    (Includes a 20% overhead for stability and background tasks)
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Calculation Breakdown</h4>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Activity</TableHead>
                                            <TableHead className="text-right">Devices</TableHead>
                                            <TableHead className="text-right">Total Potential</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.breakdown.map((item, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell className="text-right">{item.devices}</TableCell>
                                                <TableCell className="text-right font-code">{item.totalBw.toFixed(2)} Mbps</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="font-bold border-t-2">
                                            <TableCell>Peak Usage Estimate ({concurrency}%)</TableCell>
                                            <TableCell colSpan={2} className="text-right font-code">{results.totalRequired} Mbps</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Bandwidth Estimator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>Not sure what internet speed you need? This tool helps you move beyond marketing claims and get a data-driven estimate tailored to your specific usage. Follow these simple steps:</p>
                    <ol>
                        <li><strong>List Your Activities:</strong> For each primary online activity (like streaming, gaming, or video calls), click "+ Add Activity". Choose the activity from the dropdown list.</li>
                        <li><strong>Enter Device Count:</strong> In the "No. of Devices" field, enter how many devices will be doing that activity *simultaneously*. For example, if two people might be streaming Netflix in HD at the same time, enter '2' for "HD Video Streaming".</li>
                        <li><strong>Adjust for Concurrency:</strong> The "Peak Usage Concurrency" slider is key. It's rare for every device to be maxed out at once. A typical household might have 70-80% concurrency during peak evening hours. A busy office might be higher. Adjust the slider to what feels realistic for your busiest time.</li>
                        <li><strong>Estimate Your Needs:</strong> Click the "Estimate Bandwidth" button.</li>
                        <li><strong>Review Your Recommendation:</strong> The tool calculates your estimated peak demand and then adds a 20% "overhead" buffer. This buffer accounts for background processes, software updates, and ensures a smooth experience without lag or buffering. The final number is the internet plan speed (in Mbps) you should look for from an ISP.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example Scenario</AlertTitle>
                        <AlertDescription>
                         A family of four: Two people might watch 4K TV, one person games online, and one browses social media. You'd add rows for 2x 4K Streaming, 1x Online Gaming, and 1x Social Media. With a 75% concurrency, the tool will recommend a plan that can handle that busy evening without anyone's experience suffering.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: Understanding Your Digital Lifeline</CardTitle>
                    </div>
                    <CardDescription>Demystify the numbers and concepts behind internet speed to make smarter decisions about your connectivity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is Bandwidth? More Than Just "Speed"</h3>
                        <p>When you shop for an internet plan, you're bombarded with numbers: 100 Mbps, 500 Mbps, 1 Gbps. This number represents your **bandwidth**. The most common analogy is a highway: bandwidth is the number of lanes on the highway. "Speed" is how fast the cars are legally allowed to go. If you only have one car, it doesn't matter if you have a 2-lane or 10-lane highway. But if you have dozens of cars (devices) that all want to travel at the same time, the number of lanes becomes critical to prevent a traffic jam. In network terms, this "traffic jam" is what you experience as buffering, lag, and slow-loading websites.</p>
                        <p>This calculator helps you determine how many "lanes" you need for all the "cars" (your devices and their activities) that will be active during your peak usage time. It ensures that even when your connection is being heavily used, there's enough capacity to go around for everyone to have a smooth experience.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Download vs. Upload Speed: The Two-Way Street</h3>
                        <p>Most internet plans are advertised with their **download speed**, which is the rate at which you can pull data from the internet to your devices. This is used for activities like streaming videos, browsing websites, and downloading files. For most consumer activities, this is the most important number.</p>
                        <p>However, **upload speed** is equally important for modern internet use. This is the rate at which you can send data from your devices *to* the internet. Critical activities that rely on upload speed include:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Video Conferencing:</strong> Sending your high-definition video feed to others on the call. A poor upload speed is why your video might look pixelated to others, even if their video looks fine to you.</li>
                            <li><strong>Online Gaming:</strong> Sending rapid, time-sensitive inputs about your character's actions to the game server.</li>
                            <li><strong>Cloud Backups & File Uploads:</strong> Uploading large photos, videos, or documents to services like Google Drive, iCloud, or Dropbox.</li>
                            <li><strong>Live Streaming:</strong> Broadcasting your gameplay or video feed to platforms like Twitch or YouTube.</li>
                        </ul>
                        <p>Many common internet types, like cable and DSL, are **asymmetrical**, meaning they have much slower upload speeds than download speeds (e.g., 500 Mbps download but only 20 Mbps upload). Fiber-optic internet, on the other hand, is often **symmetrical**, offering the same high speed for both downloading and uploading (e.g., 500 Mbps / 500 Mbps). When choosing a plan, consider your upload-heavy activities. This calculator provides a general estimate, but if you're a content creator or work from home with heavy video calls, you should specifically look for plans with strong upload speeds.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Latency (Ping): The Hidden Factor</h3>
                        <p>While bandwidth is the size of your data pipe, **latency** is the time it takes for a single piece of data to make a round trip from your device, to a server, and back again. This is also known as "ping," and it's measured in milliseconds (ms). Even with infinite bandwidth, high latency will make a connection feel slow.</p>
                        <p>Imagine sending a letter. Bandwidth is how many letters you can fit in the mailbox at once. Latency is the time it takes for one letter to be delivered and for you to receive a reply. For activities like streaming a movie, latency isn't very important; the data can be buffered in advance. But for real-time applications, it's everything:</p>
                         <ul className="list-disc pl-5">
                           <li><strong>Online Gaming:</strong> High latency means a noticeable delay between when you press a button and when the action happens on screen, putting you at a severe disadvantage. Gamers aim for a ping under 50ms, ideally under 20ms.</li>
                            <li><strong>Video Conferencing:</strong> High latency causes that awkward delay where you talk over each other because the audio and video signals are slow to arrive.</li>
                         </ul>
                        <p>This calculator focuses on bandwidth, but when choosing an ISP, especially for gaming or frequent video calls, look for technologies known for low latency, such as fiber-optic internet. You can use our <Link href="/tools/latency-estimator" className='text-primary hover:underline'>Latency Estimator</Link> to get a better sense of how distance impacts this.</p>
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
                            <li><strong>Prioritize Upload for WFH:</strong> If you work from home and use video conferencing daily, prioritize a plan with good upload speeds (at least 20-25 Mbps). Symmetrical fiber is ideal if available.</li>
                            <li><strong>Wi-Fi Isn't Everything:</strong> Your Wi-Fi can be a bottleneck. Even with a 1 Gbps internet plan, an old router or poor signal will slow you down. For critical devices like a gaming PC or work desktop, use a wired Ethernet connection for the best speed and lowest latency.</li>
                            <li><strong>The 20% Overhead Rule:</strong> Our calculator adds a 20% buffer, and you should too. This accounts for background tasks (OS updates, cloud syncs) and gives you room to grow without needing to upgrade your plan immediately.</li>
                            <li><strong>Re-run the Calculation:</strong> Your needs change. If you buy a new 4K TV, add a security camera, or have someone move in, re-run the calculation to see if your current plan is still sufficient.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Ignoring Concurrency:</strong> Simply adding up the max bandwidth of every device gives an inflated, unrealistic number. Forgetting to use the concurrency slider will lead you to overpay for a plan you don't need.</li>
                            <li><strong>Forgetting Upload Speeds:</strong> Choosing a plan based only on the big download number. If you upload large files or make many video calls, a cheap plan with 10 Mbps upload will feel painfully slow.</li>
                             <li><strong>Underestimating "Small" Devices:</strong> Ignoring IoT and smart home devices. A single smart camera streaming HD video can use 2-4 Mbps continuously, which adds up. Factor them into your calculations.</li>
                            <li><strong>Confusing Megabits (Mb) and Megabytes (MB):</strong> Internet speeds are sold in Megabits per second (Mbps), but file sizes are measured in Megabytes (MB). There are 8 bits in a byte. So, to download a 100 MB file on a 100 Mbps connection, it will take 8 seconds, not 1. Use our <Link href="/tools/data-transfer-calculator" className='text-primary hover:underline'>Data Transfer Time Calculator</Link> to see this in action.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Choosing an Internet Plan for a New Home</h3>
                        <p className="text-sm text-muted-foreground">A family is moving into a new home and needs to choose an internet plan. They input their expected usage: two 4K TVs, one online gamer, two remote workers on video calls, plus several phones browsing social media. The estimator recommends a 450 Mbps plan. Armed with this data, they can confidently ignore the ISP's upsell to a 2 Gbps plan and choose a more cost-effective option that perfectly meets their needs.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Upgrading a Small Office Network</h3>
                        <p className="text-sm text-muted-foreground">A small business with 20 employees is experiencing constant complaints about slow internet and dropped video calls. The office manager uses the estimator to input their activities: 15 employees on constant web/email, 5 on frequent HD video calls, and heavy use of a cloud-based CRM. The result shows they need at least 300 Mbps, but their current plan is only 100 Mbps. This provides clear justification for upgrading their service.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting Buffering Issues</h3>
                        <p className="text-sm text-muted-foreground">Someone is frustrated that their 4K movie keeps buffering in the evening. They run the estimator based on their family's typical evening activities and discover their estimated peak usage is around 90 Mbps. A speed test reveals their "100 Mbps" plan is only delivering 75 Mbps during peak hours. This tells them the problem isn't their TV; it's that their internet plan lacks the necessary overhead for peak-hour congestion.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Justifying a Fiber Upgrade</h3>
                        <p className="text-sm text-muted-foreground">A content creator is struggling with multi-hour upload times for their 4K YouTube videos on a 500/20 Mbps cable plan. They use the tool and, while their download bandwidth is more than sufficient, they can clearly articulate that the upload requirement is the bottleneck. This helps them justify the switch to a 500/500 Mbps symmetrical fiber plan, drastically cutting their upload times.</p>
                    </div>
                </div>
            </section>
            
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
                    <Link href="/tools/data-transfer-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Calculate how long it will take to download or upload a file with your connection.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/latency-estimator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Latency Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Understand how physical distance affects ping and real-time application performance.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">While not directly related to speed, proper subnetting can improve network performance.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
