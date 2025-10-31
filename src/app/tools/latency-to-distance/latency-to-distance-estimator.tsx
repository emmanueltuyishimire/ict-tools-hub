
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertCircle, ServerIcon, Route, HardDrive, Cpu, RadioTower, Router } from 'lucide-react';
import Image from 'next/image';

const SPEED_OF_LIGHT_VACUUM = 299792.458; // km/s

const propagationMedia = {
  fiber: { name: 'Silica Fiber (≈0.67c)', factor: 0.67 },
  copper: { name: 'Copper (≈0.77c)', factor: 0.77 },
  submarine: { name: 'Submarine Cable (≈0.66c)', factor: 0.66 },
  vacuum: { name: 'Vacuum / Air (≈1.0c)', factor: 1.0 },
};

type FormData = {
  latency: number;
  overhead: number;
  jitter: number;
  medium: string;
  customVf: string;
  inflation: number;
};

type Results = {
    distance: number;
    range: { min: number; max: number };
    assumptions: { vf: number; inflation: number; speed: number };
    raw: { inputLatency: number; overhead: number; oneWay: number; jitter: number };
};

export function LatencyToDistanceEstimator() {
  const [formData, setFormData] = useState<FormData>({
    latency: 40,
    overhead: 0,
    jitter: 0.5,
    medium: 'fiber',
    customVf: '',
    inflation: 30,
  });
  const [results, setResults] = useState<Results | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSliderChange = (field: 'inflation', value: number[]) => {
     setFormData(prev => ({ ...prev, [field]: value[0] }));
  };

  const resetForm = () => {
    setFormData({
      latency: 40,
      overhead: 0,
      jitter: 0.5,
      medium: 'fiber',
      customVf: '',
      inflation: 30,
    });
    setResults(null);
  };

  const calculateDistance = () => {
    const { latency, overhead, jitter, medium, customVf, inflation } = formData;
    
    // One-way time in ms
    const oneWayTime = (latency - overhead) / 2;
    if (oneWayTime <= 0) {
        setResults(null); // Or show an error
        return;
    }

    const velocityFactor = customVf ? parseFloat(customVf) : propagationMedia[medium as keyof typeof propagationMedia].factor;
    const propagationSpeed = SPEED_OF_LIGHT_VACUUM * velocityFactor;
    
    const oneWayDistance = (oneWayTime / 1000) * propagationSpeed;
    const straightLineDistance = oneWayDistance / (1 + inflation / 100);
    
    const jitterEffect = (jitter / 1000) * propagationSpeed / (1 + inflation / 100);

    setResults({
        distance: parseFloat(straightLineDistance.toFixed(2)),
        range: {
            min: parseFloat(Math.max(0, straightLineDistance - jitterEffect).toFixed(2)),
            max: parseFloat((straightLineDistance + jitterEffect).toFixed(2)),
        },
        assumptions: {
            vf: velocityFactor,
            inflation: inflation,
            speed: parseFloat(propagationSpeed.toFixed(2)),
        },
        raw: {
            inputLatency: latency,
            overhead: overhead,
            oneWay: oneWayTime,
            jitter: jitter,
        },
    });

  };
  
  useEffect(() => {
    if(results && resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [results]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card>
        <CardHeader>
          <CardTitle>Ping Latency to Distance Estimator</CardTitle>
          <CardDescription>
            Estimate the straight-line distance from measured network latency. Adjust for medium velocity, path inflation and jitter. No external services required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                     <div>
                        <Label htmlFor="latency">Latency (RTT) (ms)</Label>
                        <Input id="latency" type="number" value={formData.latency} onChange={e => handleInputChange('latency', parseFloat(e.target.value))} />
                        <p className="text-xs text-muted-foreground mt-1">RTT (e.g., ping) will be halved to approximate one-way propagation time.</p>
                    </div>
                     <div>
                        <Label htmlFor="overhead">Processing overhead (ms)</Label>
                        <Input id="overhead" type="number" value={formData.overhead} onChange={e => handleInputChange('overhead', parseFloat(e.target.value))} />
                         <p className="text-xs text-muted-foreground mt-1">Switch/stack/queue time to subtract before distance estimation.</p>
                    </div>
                     <div>
                        <Label htmlFor="jitter">Jitter (± ms)</Label>
                        <Input id="jitter" type="number" step="0.1" value={formData.jitter} onChange={e => handleInputChange('jitter', parseFloat(e.target.value))}/>
                        <p className="text-xs text-muted-foreground mt-1">Used to produce a min–max distance band.</p>
                    </div>
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="medium">Propagation medium</Label>
                        <Select value={formData.medium} onValueChange={v => handleInputChange('medium', v)}>
                            <SelectTrigger id="medium"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.entries(propagationMedia).map(([key, {name}]) => (
                                    <SelectItem key={key} value={key}>{name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">Velocity factor (v = VF × c). You can fine-tune below.</p>
                    </div>
                     <div>
                        <Label htmlFor="customVf">Custom velocity factor (optional)</Label>
                        <Input id="customVf" type="number" step="0.001" placeholder="e.g., 0.6815" value={formData.customVf} onChange={e => handleInputChange('customVf', e.target.value)} />
                        <p className="text-xs text-muted-foreground mt-1">If set, overrides the selected medium.</p>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <Label htmlFor="inflation">Path inflation</Label>
                            <span className="font-bold text-primary">{formData.inflation}%</span>
                        </div>
                        <Slider id="inflation" min={0} max={100} step={1} value={[formData.inflation]} onValueChange={v => handleSliderChange('inflation', v)} />
                        <p className="text-xs text-muted-foreground mt-1">Extra path vs. straight-line (fiber routing, detours, peering, etc.).</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 pt-4">
                <Button onClick={calculateDistance}>Estimate distance</Button>
                <Button variant="outline" onClick={resetForm}>Reset</Button>
            </div>
        </CardContent>
      </Card>
      
      {results && (
        <div ref={resultsRef} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Estimated Straight-line Distance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="text-center bg-muted p-6 rounded-lg">
                        <p className="text-5xl font-bold text-primary">{results.distance.toLocaleString()} km</p>
                        <p className="text-muted-foreground mt-1">Range (with jitter): {results.range.min.toLocaleString()}–{results.range.max.toLocaleString()} km</p>
                    </div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="assumptions">
                            <AccordionTrigger>Assumptions & Raw Timings</AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                <div className="bg-background/50 p-4 rounded-md">
                                    <h4 className="font-semibold mb-2">Assumptions</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>Velocity factor (VF): <span className="font-code">{results.assumptions.vf}</span></li>
                                        <li>Path inflation: <span className="font-code">{results.assumptions.inflation}%</span></li>
                                        <li>Propagation speed: <span className="font-code">{results.assumptions.speed.toLocaleString()} km/s</span></li>
                                    </ul>
                                </div>
                                 <div className="bg-background/50 p-4 rounded-md">
                                    <h4 className="font-semibold mb-2">Raw timings</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>Input latency: <span className="font-code">{results.raw.inputLatency} ms (RTT)</span></li>
                                        <li>Overhead subtracted: <span className="font-code">{results.raw.overhead} ms</span></li>
                                        <li>Effective one-way propagation: <span className="font-code">{results.raw.oneWay} ms (jitter ±{results.raw.jitter} ms)</span></li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      )}

        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Understanding Network Latency and Distance</h2>
             <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
                When you run a ping test, you usually see a small number — perhaps 30 ms or 80 ms — showing how long it takes for a packet of data to travel from your device to a server and back. This number seems simple, but in reality, it reveals a fascinating story about how far and how fast information moves across the planet. What the Ping Latency to Distance Estimator does is take that small time measurement and turn it into something tangible: a real, physical distance. It helps you imagine how far your data actually travels through cables, switches, and air before it reaches its destination.
             </p>
             <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
                Every signal that carries data — whether it’s an email, a video call, or a web request — moves at a speed limited by physics: the speed of light. However, it never quite reaches that maximum because it passes through materials like glass or copper that slow it down. The calculator translates this physical principle into an understandable result: when you enter your ping value, it estimates the distance your data likely covered, based on the type of connection and the characteristics of the medium it travels through.
             </p>
             
            <Card className="bg-secondary/30 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary">What is network latency?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground">
                    <p>Network latency is the time delay between the moment you send a request and the moment you receive a response. It’s one of the most important — and least understood — aspects of internet performance. When you click a link or open a video stream, your computer sends data packets through many intermediate devices, including routers, switches, and optical lines. Each of these adds a small amount of delay.</p>
                    <p>Latency is usually measured in milliseconds (ms). A typical local network may show latency below 10 ms, while connections across continents can easily exceed 100 ms. The ping tool measures the round-trip time (RTT), meaning the total time for a signal to go from your computer to the target and back. Half of that time — the one-way delay — represents the actual propagation time of the signal.</p>
                    <p>There are several components of latency: propagation delay (the time the signal physically travels through the medium), processing delay (how long routers and switches take to handle the packet), queueing delay (waiting time in congested networks), and transmission delay (how long it takes to push bits onto the wire). The Ping Latency to Distance Estimator focuses primarily on the propagation delay, the part of latency that directly reflects physical distance.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>From milliseconds to kilometers</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground">
                    <p>A single millisecond might not seem like much, but in networking terms, it can represent hundreds of kilometers. Light travels approximately 300,000 kilometers per second in a vacuum, which means one millisecond equals about 300 kilometers. However, in optical fiber — the medium used in most of the internet’s backbone — light slows down to about 67% of its speed in a vacuum. That brings the distance to around 200 kilometers per millisecond.</p>
                    <p>For example, imagine your ping to a server is 40 ms (round-trip). That means each direction takes roughly 20 ms. In optical fiber, that translates to 20 ms × 200,000 km/s ≈ about 4,000 kilometers of fiber path. This doesn’t mean the server is exactly that distance away in a straight line, but it gives a good estimate of the physical scale of your connection. The calculator shows this relationship dynamically — you can adjust parameters like latency, signal medium, and route detours to see how they affect the estimated distance.</p>
                    <h4 className="font-semibold">Why latency is not just about distance</h4>
                    <p>It’s tempting to think that the farther away a server is, the higher the ping will be. While that’s often true, there are many other factors that influence latency. Network congestion can cause packets to queue up at routers, adding delays even if the physical distance is small. Poor routing can send data through indirect or inefficient paths. Wireless links may experience retransmissions due to interference, and encryption or tunneling through VPNs can also add milliseconds.</p>
                    <p>For instance, a connection from London to Frankfurt might have an expected latency of 10 ms, but due to routing through intermediate ISPs, it could end up being 20 ms. On the other hand, a well-optimized connection between New York and Los Angeles — much farther in distance — might only be 40 ms. That’s why understanding latency isn’t just about how far signals travel, but how networks are built and managed.</p>
                </CardContent>
            </Card>

             <Card className="bg-secondary/30 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary">The physics behind it</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground">
                   <p>Electromagnetic signals carry all digital data — whether through light in fiber, electrical pulses in copper, or radio waves in air. The ultimate limit of their speed is the speed of light (299,792,458 meters per second), but materials slow them down by a predictable factor known as the velocity factor (VF).</p>
                    <p>In air or free space, the VF is very close to 1.0, meaning signals travel almost at light speed. In glass fiber, the VF is about 0.67, and in copper it’s around 0.77. Submarine cables, due to thicker insulation and longer amplifiers, are slightly slower at around 0.66. By multiplying the speed of light by the velocity factor and by the signal’s travel time, you can calculate how far the data moved.</p>
                    <p>The estimator uses this formula, and then corrects the result for “path inflation” — a factor that accounts for the real-world routes data takes. Fiber cables rarely follow perfectly straight paths; they curve along coastlines, connect through cities, and often loop through multiple routers. A typical path inflation factor of 20–40% reflects this extra distance.</p>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle>Understanding path inflation and jitter</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground">
                    <p>Path inflation describes how much longer the real path of a signal is compared to the ideal straight line. Even if two cities are 3,000 kilometers apart, the network path might be 4,000 or 5,000 kilometers long due to the actual cable routing. The calculator allows you to set this inflation percentage so the results reflect realistic distances.</p>
                    <p>Jitter is another important concept. It represents the variation in latency over time — the difference between the fastest and slowest packets in a series. High jitter means your connection is unstable, and it also affects the accuracy of distance estimation. The calculator uses jitter to display a range (minimum and maximum possible distance) that corresponds to the fluctuation of latency measurements.</p>
                </CardContent>
            </Card>

            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>What you can learn from this tool</AlertTitle>
                <AlertDescription>
                    <p>The Ping Latency to Distance Estimator is both educational and practical. It shows how the invisible world of data transmission connects directly to real geography and physical limits. You can use it to estimate the likely location of a data center, compare different ISPs or routing paths, or simply understand why your connection feels fast or slow. Teachers and students can also use it to explain the relationship between time, distance, and signal speed in an accessible way.</p>
                    <p className="mt-2">Even if you have no technical background, the tool makes abstract network measurements more meaningful. Instead of thinking “my ping is 60 ms,” you can think “my data traveled roughly 6,000 kilometers round-trip.” It gives you a real-world sense of scale and shows just how impressive modern internet infrastructure is.</p>
                </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
                <h3 className="text-2xl font-bold">Real-world examples</h3>
                <p className="text-muted-foreground">Let’s look at some typical examples. A 10 ms round-trip ping through fiber roughly corresponds to about 1,000 kilometers — similar to Paris to Berlin. A 30 ms ping might indicate 3,000 kilometers (New York to Dallas). An 80 ms ping could represent around 8,000 kilometers (London to Mumbai), and a 150 ms ping can correspond to over 13,000 kilometers — about the distance from Los Angeles to Tokyo.</p>
                <p className="text-muted-foreground">These examples assume average fiber velocity and moderate path inflation. Real values vary, but they give a good sense of how time translates into distance in the digital world.</p>
            </div>
            
            <div className="text-center py-8">
                <h3 className="text-2xl font-bold">Why this matters</h3>
                <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">Understanding latency helps people appreciate the physical nature of the internet. Every click, message, or video stream depends on electromagnetic waves racing across continents and under oceans. Even though we think of the internet as instant, it’s still bound by the same speed limits that govern the universe. The speed of light is the ultimate barrier — no technology can overcome it.</p>
                <p className="mt-2 max-w-3xl mx-auto text-muted-foreground">Recognizing this helps explain why some delays can’t simply be fixed by faster hardware or better software. The only way to reduce latency over long distances is to shorten the distance itself — for example, by placing servers closer to users or using content delivery networks (CDNs) that replicate data in multiple locations.</p>
                <p className="mt-4 max-w-3xl mx-auto font-semibold">The Ping Latency to Distance Estimator makes a complex physical concept accessible to everyone. It connects the world of physics and networking, showing that every millisecond of delay represents a measurable journey through the planet’s digital arteries.</p>
                <p className="mt-2 max-w-3xl mx-auto text-muted-foreground">Whether you’re a curious student, a gamer wondering about server performance, or simply someone fascinated by how fast light can carry your data, this calculator helps you visualize the incredible speed — and limits — of modern communication. It reminds us that the internet isn’t just a cloud in the sky but a vast, physical web of glass fibers and electrical signals connecting billions of people in near real time.</p>
            </div>
        </div>
    );
}
