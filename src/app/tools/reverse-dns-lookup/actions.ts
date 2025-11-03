import { z } from 'zod';
import dns from 'dns/promises';

const formSchema = z.object({
  ip: z.string().ip({ version: 'v4', message: 'Please enter a valid IPv4 address.' }),
});

export type FormState = {
  success: boolean;
  message: string;
  ip?: string;
  hostnames?: string[];
} | null;

export async function reverseDnsLookup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = formSchema.safeParse({
    ip: formData.get('ip'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0].message,
    };
  }

  const { ip } = parsed.data;

  try {
    const hostnames = await dns.reverse(ip);
    
    return {
      success: true,
      message: 'Reverse DNS lookup successful.',
      ip,
      hostnames,
    };
  } catch (error: any) {
    let message = `Failed to resolve hostnames for ${ip}.`;
    if (error.code === 'ENOTFOUND') {
      message = `No PTR record found for IP address ${ip}. The IP may not have a reverse DNS entry.`;
    } else if (error.code === 'EINVAL') {
      message = `Invalid IP address provided: ${ip}.`;
    }
    return { success: false, message, ip };
  }
}
    
