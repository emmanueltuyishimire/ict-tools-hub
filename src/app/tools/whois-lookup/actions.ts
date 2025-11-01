
'use server';

import { z } from 'zod';
import net from 'net';

const formSchema = z.object({
  domain: z.string().min(1, 'Please enter a domain name.'),
});

export type FormState = {
  success: boolean;
  message: string;
  domain?: string;
  data?: string;
} | null;

// Basic WHOIS client
function getWhoisData(domain: string, server: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        let data = '';
        client.connect(43, server, () => {
            // For .com domains, Verisign requires a specific format
            if (server.endsWith('verisign-grs.com')) {
                 client.write(`=${domain}\r\n`);
            } else {
                 client.write(domain + '\r\n');
            }
        });
        client.on('data', (chunk) => {
            data += chunk.toString();
        });
        client.on('end', () => {
            resolve(data);
        });
        client.on('error', (err) => {
            reject(err);
        });
        client.setTimeout(5000, () => {
            client.destroy();
            reject(new Error('WHOIS connection timed out.'));
        });
    });
}

const getTldServer = async (tld: string): Promise<string> => {
    // A more robust implementation would query IANA's TLD database
    // For this app, we'll use a hardcoded list and fall back to a generic server
    const tldServers: Record<string, string> = {
        com: 'whois.verisign-grs.com',
        net: 'whois.verisign-grs.com',
        org: 'whois.pir.org',
        dev: 'whois.nic.google',
        app: 'whois.nic.google',
        io: 'whois.nic.io',
        uk: 'whois.nic.uk',
        ca: 'whois.cira.ca',
        de: 'whois.denic.de',
        au: 'whois.auda.org.au',
    };
    return tldServers[tld] || 'whois.iana.org';
}

export async function getWhoisInfo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = formSchema.safeParse({
    domain: formData.get('domain'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0].message,
    };
  }

  const domain = parsed.data.domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
  const tld = domain.split('.').pop();
  
  if (!tld) {
    return { success: false, message: 'Invalid domain name.' };
  }
  
  try {
    const initialServer = await getTldServer(tld);
    const initialData = await getWhoisData(domain, initialServer);
    
    // Check for referral server in the initial response
    const referralMatch = initialData.match(/(whois|Registrar WHOIS Server):\s*([a-z0-9\-\.]+\.[a-z]{2,})/i);
    let finalData = initialData;

    if (referralMatch && referralMatch[2] && referralMatch[2] !== initialServer) {
        const referralServer = referralMatch[2];
        try {
            finalData = await getWhoisData(domain, referralServer);
        } catch (referralError) {
            // If the referral server fails, we still have the initial data to show
        }
    }

    if (finalData.toLowerCase().includes('no match for') || finalData.toLowerCase().includes('not found')) {
      return { success: false, message: `Domain not found: ${domain} is likely not registered.` };
    }
    
    return {
      success: true,
      message: 'Whois data retrieved successfully.',
      domain: domain,
      data: finalData,
    };

  } catch (error: any) {
    return { success: false, message: `Failed to fetch Whois data: ${error.message}` };
  }
}

    