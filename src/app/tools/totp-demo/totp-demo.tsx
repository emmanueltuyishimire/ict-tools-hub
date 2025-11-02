
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Check, RefreshCw, KeyRound, QrCode, ShieldCheck, ShieldAlert, Smartphone } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Base32 encoding for secret key
const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const dec2hex = (s: number) => (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
const hex2dec = (s: string) => parseInt(s, 16);

const base32tohex = (base32: string) => {
    let bits = '';
    let hex = '';
    for (let i = 0; i < base32.length; i++) {
        const val = base32Chars.indexOf(base32.charAt(i).toUpperCase());
        bits += val.toString(2).padStart(5, '0');
    }
    for (let i = 0; i + 4 <= bits.length; i += 4) {
        const chunk = bits.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16);
    }
    return hex;
};

const generateSecret = (length = 20) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(byte => base32Chars[byte % 32]).join('');
};

async function generateTOTP(secret: string): Promise<string> {
    if (!secret) return '';
    const key = base32tohex(secret);
    const epoch = Math.round(new Date().getTime() / 1000.0);
    const time = Math.floor(epoch / 30).toString(16).padStart(16, '0');

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw', 
        new Uint8Array(key.match(/[\da-f]{2}/gi)!.map(h => parseInt(h, 16))),
        { name: 'HMAC', hash: 'SHA-1' },
        false,
        ['sign']
    );

    const mac = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        new Uint8Array(time.match(/[\da-f]{2}/gi)!.map(h => parseInt(h, 16)))
    );

    const hash = Array.from(new Uint8Array(mac));
    const offset = hash[hash.length - 1] & 0xf;
    const truncatedHash = (hash[offset] & 0x7f) << 24 |
                          (hash[offset + 1] & 0xff) << 16 |
                          (hash[offset + 2] & 0xff) << 8 |
                          (hash[offset + 3] & 0xff);

    return (truncatedHash % 1000000).toString().padStart(6, '0');
}

export function TotpDemo() {
    const [secret, setSecret] = useState('');
    const [totp, setTotp] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'failure'>('idle');
    const { toast } = useToast();

    // Generate secret on client-side mount
    useEffect(() => {
        setSecret(generateSecret());
    }, []);

    const otpAuthUrl = useMemo(() => `otpauth://totp/ICT%20Toolbench%20Demo:user@example.com?secret=${secret}&issuer=ICT%20Toolbench%20Demo`, [secret]);
    const qrCodeUrl = useMemo(() => secret ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpAuthUrl)}` : '', [otpAuthUrl, secret]);

    useEffect(() => {
        if (!secret) return;

        const updateTotp = async () => {
            try {
                const newTotp = await generateTOTP(secret);
                setTotp(newTotp);
            } catch (error) {
                console.error("Failed to generate TOTP:", error);
            }
        };

        const interval = setInterval(() => {
            const epoch = Math.round(new Date().getTime() / 1000.0);
            const newTimeLeft = 30 - (epoch % 30);
            setTimeLeft(newTimeLeft);
            if (newTimeLeft === 30) {
                updateTotp();
            }
        }, 1000);

        updateTotp();
        return () => clearInterval(interval);
    }, [secret]);

    const handleRegenerate = () => {
        setSecret(generateSecret());
        setVerificationCode('');
        setVerificationStatus('idle');
    };

    const handleVerify = () => {
        if(verificationCode === totp) {
            setVerificationStatus('success');
        } else {
            setVerificationStatus('failure');
        }
        setTimeout(() => setVerificationStatus('idle'), 3000);
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied to clipboard!' });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>TOTP Demo</CardTitle>
                <CardDescription>
                    Scan the QR code with your authenticator app to see the magic of synchronized one-time passwords.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="secret-key">Shared Secret Key</Label>
                            <div className="relative">
                                <Input id="secret-key" readOnly value={secret} className="font-mono pr-10" />
                                <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8" onClick={() => copyToClipboard(secret)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Button onClick={handleRegenerate}><RefreshCw className="mr-2 h-4 w-4" />Regenerate Secret</Button>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-white">
                         <QrCode className="h-8 w-8 text-primary mb-2" />
                         {qrCodeUrl && <img src={qrCodeUrl} alt="TOTP QR Code" width={200} height={200} />}
                         <p className="text-xs text-muted-foreground mt-2 text-center">Scan with Google Authenticator, Authy, or other 2FA app.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Server Simulation</Label>
                    <Card className="p-6 bg-muted/50 text-center">
                        <CardTitle className="mb-2">Server's Current Code</CardTitle>
                        <p className="text-5xl font-bold tracking-widest text-primary font-mono">{totp || '------'}</p>
                        <Progress value={(timeLeft / 30) * 100} className="mt-4 h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Refreshes in {timeLeft} seconds</p>
                    </Card>
                </div>
                
                 <div className="space-y-4">
                    <Label htmlFor="verify-code">Verify Code</Label>
                    <div className="flex gap-2">
                        <Input 
                          id="verify-code" 
                          placeholder="Enter code from your app" 
                          className="font-mono text-lg tracking-widest text-center"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                          maxLength={6}
                        />
                        <Button onClick={handleVerify} variant="secondary">Verify</Button>
                    </div>
                     {verificationStatus === 'success' && <Alert className="border-green-500/50"><ShieldCheck className="h-4 w-4 text-green-600" /><AlertTitle className="text-green-700">Success!</AlertTitle><AlertDescription>The code is valid.</AlertDescription></Alert>}
                     {verificationStatus === 'failure' && <Alert variant="destructive"><ShieldAlert className="h-4 w-4" /><AlertTitle>Failure</AlertTitle><AlertDescription>The code is incorrect. Please try again.</AlertDescription></Alert>}
                </div>
            </CardContent>
        </Card>
    );
}
