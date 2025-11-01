
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
  expiryDate?: string;
  registrar?: string;
  updatedDate?: string;
  creationDate?: string;
} | null;

// Basic WHOIS client
function getWhoisData(domain: string, server: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        let data = '';
        client.connect(43, server, () => {
            client.write(domain + '\r\n');
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

function parseWhoisData(data: string): Partial<FormState> {
    const lines = data.split('\n');
    let expiryDate, registrar, updatedDate, creationDate;

    // Common labels for expiration date
    const expiryRegex = /Registrar Registration Expiration Date|Registry Expiry Date|Expiration Date|paid-till|Expiry.*:/i;
    const registrarRegex = /Registrar:|Reseller:/i;
    const updatedRegex = /Updated Date:/i;
    const creationRegex = /Creation Date:/i;
    
    for (const line of lines) {
        if (!expiryDate && expiryRegex.test(line)) {
            expiryDate = line.split(':')[1]?.trim();
        }
        if (!registrar && registrarRegex.test(line)) {
            registrar = line.split(':')[1]?.trim();
        }
         if (!updatedDate && updatedRegex.test(line)) {
            updatedDate = line.split(':')[1]?.trim();
        }
         if (!creationDate && creationRegex.test(line)) {
            creationDate = line.split(':')[1]?.trim();
        }
    }

    return { expiryDate, registrar, updatedDate, creationDate };
}

export async function checkDomainExpiry(
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

  const domain = parsed.data.domain.replace(/^https?:\/\//, '').split('/')[0];
  const tld = domain.split('.').pop();
  
  if (!tld) {
    return { success: false, message: 'Invalid domain name.' };
  }
  
  // Using a generic WHOIS server. A production app would need a more robust TLD-to-server mapping.
  const whoisServer = 'whois.iana.org';

  try {
    const rawData = await getWhoisData(domain, whoisServer);
    
    let parsedData: Partial<FormState>;
    
    // Check for referral server
    const referralMatch = rawData.match(/whois:\s*([a-z0-9\-\.]+\.[a-z]{2,})/i);
    if(referralMatch && referralMatch[1]) {
        const referralServer = referralMatch[1];
        const specificData = await getWhoisData(domain, referralServer);
        parsedData = parseWhoisData(specificData);
    } else {
        parsedData = parseWhoisData(rawData);
    }

    if (!parsedData.expiryDate) {
      return { success: false, message: `Could not find expiration date for ${domain}. The domain may not be registered or WHOIS data is protected.` };
    }
    
    // Attempt to parse the date string more robustly
    let expiryDateObj = new Date(parsedData.expiryDate);
    // If parsing fails, try to fix common incomplete formats like 'YYYY-MM-DDTHH'
    if (isNaN(expiryDateObj.getTime())) {
      const cleanedDateString = parsedData.expiryDate.split('T')[0]; // Get YYYY-MM-DD part
      expiryDateObj = new Date(cleanedDateString);
    }
    
    // Final check
    if (isNaN(expiryDateObj.getTime())) {
        return { success: false, message: `Could not parse the expiration date returned by the WHOIS server: "${parsedData.expiryDate}". The format is unrecognized.` };
    }

    const creationDateObj = parsedData.creationDate ? new Date(parsedData.creationDate) : null;
    const updatedDateObj = parsedData.updatedDate ? new Date(parsedData.updatedDate) : null;

    return {
      success: true,
      message: 'WHOIS data retrieved successfully.',
      domain: domain,
      expiryDate: expiryDateObj.toISOString(),
      registrar: parsedData.registrar,
      updatedDate: updatedDateObj && !isNaN(updatedDateObj.getTime()) ? updatedDateObj.toISOString() : undefined,
      creationDate: creationDateObj && !isNaN(creationDateObj.getTime()) ? creationDateObj.toISOString() : undefined,
    };

  } catch (error: any) {
    return { success: false, message: `Failed to fetch WHOIS data: ${error.message}` };
  }
}
