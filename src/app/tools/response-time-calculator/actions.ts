
'use server';

import { z } from 'zod';
import http from 'http';
import https from 'https';
import dns from 'dns';

const formSchema = z.object({
  url: z.string().min(1, 'Please enter a URL.'),
});

export type FormState = {
  success: boolean;
  message: string;
  url?: string;
  status?: number;
  timings?: {
    dnsLookup: number;
    tcpConnection: number;
    tlsHandshake: number;
    ttfb: number;
    total: number;
  };
} | null;

export async function checkResponseTime(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = formSchema.safeParse({
    url: formData.get('url'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0].message,
    };
  }

  let urlString = parsed.data.url;
  if (!/^https?:\/\//i.test(urlString)) {
    urlString = 'https://' + urlString;
  }

  let url;
  try {
      url = new URL(urlString);
  } catch(e) {
      return { success: false, message: 'Invalid URL format. Please enter a valid domain or URL.' };
  }
  
  const protocol = url.protocol === 'https:' ? https : http;

  const timings = {
    start: performance.now(),
    dnsLookup: 0,
    tcpConnection: 0,
    tlsHandshake: 0,
    ttfb: 0,
    total: 0,
  };

  return new Promise((resolve) => {
    const req = protocol.request(
      url,
      { method: 'GET' },
      (res) => {
        res.once('data', () => {
          timings.ttfb = performance.now() - timings.start;
        });

        res.on('end', () => {
          timings.total = performance.now() - timings.start;
          resolve({
            success: true,
            message: 'Response received.',
            url: parsed.data.url,
            status: res.statusCode,
            timings: {
                dnsLookup: timings.dnsLookup,
                tcpConnection: timings.tcpConnection,
                tlsHandshake: timings.tlsHandshake,
                ttfb: timings.ttfb - timings.tlsHandshake - timings.tcpConnection - timings.dnsLookup, // TTFB is the server processing time
                total: timings.total,
            }
          });
        });
        
        res.on('error', (err) => {
             resolve({ success: false, message: `Response error: ${err.message}` });
        })
      }
    );

    req.on('socket', (socket) => {
      socket.on('lookup', () => {
        timings.dnsLookup = performance.now() - timings.start;
      });
      socket.on('connect', () => {
        timings.tcpConnection = performance.now() - timings.start - timings.dnsLookup;
      });
      socket.on('secureConnect', () => {
        timings.tlsHandshake = performance.now() - timings.start - timings.tcpConnection - timings.dnsLookup;
      });
    });

    req.on('error', (err) => {
        let message = `Failed to connect to ${url.hostname}.`;
        if ('code' in err) {
            const code = (err as NodeJS.ErrnoException).code;
            if (code === 'ENOTFOUND') {
                message = `Domain not found: ${url.hostname}. Please check the domain name.`;
            } else if (code === 'ECONNREFUSED') {
                message = `Connection refused by ${url.hostname}. Is the port correct and the server running?`;
            }
        }
        resolve({ success: false, message });
    });
    
    req.setTimeout(10000, () => {
        req.destroy();
        resolve({ success: false, message: 'Request timed out after 10 seconds.' });
    });

    req.end();
  });
}
