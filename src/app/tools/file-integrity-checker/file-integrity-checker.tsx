
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Check, File as FileIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';


// Helper function to format bytes
const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Hasher function using Web Crypto API
async function digestMessage(
    arrayBuffer: ArrayBuffer,
    algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512'
): Promise<string> {
    const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const HashOutput = ({ name, value }: { name: string, value: string | null }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (value) {
            navigator.clipboard.writeText(value);
            setCopied(true);
            toast({ title: `${name} hash copied!` });
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={`${name}-output`}>{name}</Label>
            <div className="relative">
                <Input
                    id={`${name}-output`}
                    readOnly
                    value={value || '...'}
                    className="font-mono bg-muted/50 pr-10"
                    aria-label={`${name} Hash Output`}
                />
                 <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCopy} disabled={!value}>
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
};

export function FileIntegrityChecker() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hashes, setHashes] = useState({
        sha1: '', sha256: '', sha512: ''
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false
    });
    
    useEffect(() => {
        if (!file) return;

        const calculateHashes = async () => {
            setIsLoading(true);
            setHashes({ sha1: '', sha256: '', sha512: '' }); // Reset hashes
            const reader = new FileReader();
            
            reader.onload = async (event) => {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                if (arrayBuffer) {
                    try {
                        const [sha1, sha256, sha512] = await Promise.all([
                            digestMessage(arrayBuffer, 'SHA-1'),
                            digestMessage(arrayBuffer, 'SHA-256'),
                            digestMessage(arrayBuffer, 'SHA-512'),
                        ]);
                        setHashes({ sha1, sha256, sha512 });
                    } catch (e) {
                         console.error("Hashing failed:", e);
                    } finally {
                        setIsLoading(false);
                    }
                }
            };
            
            reader.onerror = () => {
                setIsLoading(false);
                console.error("File reading failed.");
            };

            reader.readAsArrayBuffer(file);
        };

        calculateHashes();

    }, [file]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>File Checksum Generator</CardTitle>
                <CardDescription>
                    Drop a file or click to select one. All processing is done securely in your browser.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 hover:border-primary'}`}>
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <FileIcon className="h-8 w-8" />
                        {
                            isDragActive ?
                                <p>Drop the file here...</p> :
                                <p>Drag & drop a file here, or click to select</p>
                        }
                    </div>
                </div>

                {file && (
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">File Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="font-semibold">{file.name}</p>
                             <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
                        </CardContent>
                    </Card>
                )}
                
                {(isLoading || hashes.sha256) && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Generated Hashes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Calculating hashes... This may take a moment for large files.</span>
                                </div>
                            ) : (
                                <>
                                    <Alert>
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Notice</AlertTitle>
                                        <AlertDescription>
                                            MD5 is no longer considered cryptographically secure and is omitted. Please use SHA-256 for integrity checks.
                                        </AlertDescription>
                                    </Alert>
                                    <HashOutput name="SHA-1" value={hashes.sha1} />
                                    <HashOutput name="SHA-256" value={hashes.sha256} />
                                    <HashOutput name="SHA-512" value={hashes.sha512} />
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}
