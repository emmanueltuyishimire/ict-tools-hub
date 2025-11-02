
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, ShieldCheck, LogIn, Server, User, KeyRound } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

// Sample in-memory "database"
const usersTable = [
    { id: 1, username: 'admin', password: 'password123', role: 'administrator' },
    { id: 2, name: 'bob', password: 'bobspassword', role: 'user' },
];

export function SqlInjectionTester() {
    const [username, setUsername] = useState("admin'--");
    const [password, setPassword] = useState('');
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<{ status: 'success' | 'failure'; message: string; data?: any } | null>(null);

    const handleLogin = () => {
        // --- THIS IS THE VULNERABLE PART ---
        // In a real application, this would be a database query.
        // We are simulating the insecure string concatenation here.
        const constructedQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        setQuery(constructedQuery);

        // --- SIMULATED EXECUTION ---
        // This is a simplified check to demonstrate the bypass. A real DB would parse the query.
        if (username.includes("'--") || username.toLowerCase().includes("' or 1=1--")) {
            setResult({
                status: 'success',
                message: 'Authentication Bypassed! The query returned a user without a valid password.',
                data: usersTable[0] // Return the admin user
            });
        } else {
            const user = usersTable.find(u => u.username === username && u.password === password);
            if (user) {
                setResult({
                    status: 'success',
                    message: 'Login successful.',
                    data: user
                });
            } else {
                setResult({
                    status: 'failure',
                    message: 'Login failed. Invalid username or password.'
                });
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side: The Tool */}
            <Card>
                <CardHeader>
                    <CardTitle>Vulnerable Login Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username"><User className="inline-block h-4 w-4 mr-1" /> Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="font-code"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password"><KeyRound className="inline-block h-4 w-4 mr-1" /> Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="font-code"
                             autoComplete="new-password"
                        />
                    </div>
                    <Button onClick={handleLogin} className="w-full">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                    </Button>
                </CardContent>
            </Card>

            {/* Right side: The Explanation */}
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle>Simulation Details</CardTitle>
                    <CardDescription>See what happens on the "server".</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2">Vulnerable Server-Side Code:</h4>
                        <CodeBlock
                            language="javascript"
                            code={`// THIS IS INSECURE!
const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
// The database executes this query string.`}
                        />
                    </div>
                    {query && (
                        <div>
                             <h4 className="font-semibold mb-2">Executed Query:</h4>
                             <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="font-code break-all">{query}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                    {result && (
                         <div>
                            <h4 className="font-semibold mb-2">Result:</h4>
                            {result.status === 'success' ? (
                                <Alert className="border-green-500/50">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-700">Success!</AlertTitle>
                                    <AlertDescription>
                                        {result.message} <br/>
                                        <span className="font-code text-xs">Logged in as: {JSON.stringify(result.data)}</span>
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <Alert>
                                    <ShieldAlert className="h-4 w-4"/>
                                    <AlertTitle>Failure</AlertTitle>
                                    <AlertDescription>{result.message}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
