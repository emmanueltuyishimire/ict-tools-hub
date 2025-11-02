
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Check, Lock, Unlock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Web Crypto API Functions for AES-GCM ---

// Derives a key from a password using PBKDF2
async function getKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );
    return window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
}

// Encrypts text
async function encrypt(plaintext: string, password: string): Promise<string> {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await getKey(password, salt);
    const enc = new TextEncoder();

    const ciphertext = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        enc.encode(plaintext)
    );
    
    // Combine salt, iv, and ciphertext for storage/transmission
    const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

    // Return as a Base64 string for easy transport
    return btoa(String.fromCharCode.apply(null, Array.from(combined)));
}

// Decrypts text
async function decrypt(base64Ciphertext: string, password: string): Promise<string> {
    const combined = new Uint8Array(atob(base64Ciphertext).split('').map(c => c.charCodeAt(0)));
    
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const ciphertext = combined.slice(28);

    const key = await getKey(password, salt);
    const dec = new TextDecoder();
    
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        ciphertext
    );
    
    return dec.decode(decrypted);
}


export function EncryptionDecryptionTool() {
    const { toast } = useToast();
    const [plaintext, setPlaintext] = useState('This is a secret message.');
    const [ciphertext, setCiphertext] = useState('');
    const [secretKey, setSecretKey] = useState('MySecretPassword');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEncrypt = async () => {
        if (!plaintext || !secretKey) {
            setError('Plaintext and a secret key are required for encryption.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const encrypted = await encrypt(plaintext, secretKey);
            setCiphertext(encrypted);
        } catch (e: any) {
            setError(`Encryption failed: ${e.message}`);
        }
        setIsLoading(false);
    };
    
    const handleDecrypt = async () => {
        if (!ciphertext || !secretKey) {
            setError('Ciphertext and a secret key are required for decryption.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const decrypted = await decrypt(ciphertext, secretKey);
            setPlaintext(decrypted);
        } catch (e: any) {
             setError('Decryption failed. This is likely due to an incorrect secret key or corrupted ciphertext.');
        }
        setIsLoading(false);
    };
    
    const handleCopy = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied to clipboard!' });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>AES Encryption & Decryption</CardTitle>
                 <CardDescription>
                    All operations are performed securely in your browser. Your data is never sent to a server.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="plaintext">Plaintext</Label>
                    <div className="relative">
                        <Textarea id="plaintext" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} className="h-32 font-mono pr-10" />
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(plaintext)}><Copy className="h-4 w-4" /></Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="secret-key">Secret Key / Password</Label>
                    <Input id="secret-key" type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                </div>
                
                 <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleEncrypt} disabled={isLoading} className="w-full sm:w-auto">
                        <Lock className="mr-2 h-4 w-4" /> {isLoading ? 'Encrypting...' : 'Encrypt'}
                    </Button>
                    <Button onClick={handleDecrypt} disabled={isLoading} variant="outline" className="w-full sm:w-auto">
                        <Unlock className="mr-2 h-4 w-4" /> {isLoading ? 'Decrypting...' : 'Decrypt'}
                    </Button>
                </div>
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Operation Failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                 <div className="space-y-2">
                    <Label htmlFor="ciphertext">Ciphertext (Base64)</Label>
                    <div className="relative">
                        <Textarea id="ciphertext" value={ciphertext} onChange={(e) => setCiphertext(e.target.value)} className="h-32 font-mono bg-muted/50 pr-10" />
                         <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(ciphertext)}><Copy className="h-4 w-4" /></Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
