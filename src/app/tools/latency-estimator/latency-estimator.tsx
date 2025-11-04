
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Lightbulb, AlertCircle, Timer, MapPin, Gauge } from 'lucide-react';

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
        </div>
    );
}
