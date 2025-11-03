import { z } from 'zod';
import dns from 'dns/promises';

const formSchema = z.object({
  domain: z.string().min(1, 'Please enter a domain name.'),
  recordType: z.enum(['A', 'AAAA', 'MX', 'CNAME', 'NS', 'TXT', 'SOA']),
});

export type FormState = {
  success: boolean;
  message: string;
  domain?: string;
  recordType?: string;
  records?: any[];
} | null;

export async function lookupDns(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = formSchema.safeParse({
    domain: formData.get('domain'),
    recordType: formData.get('recordType'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0].message,
    };
  }

  const { domain, recordType } = parsed.data;

  try {
    const records = await dns.resolve(domain, recordType);
    
    // The dns.resolve returns different structures for different types.
    // We normalize them for consistent display.
    let normalizedRecords: any[] = [];
    if (typeof records[0] === 'string') {
      normalizedRecords = (records as string[]).map(r => ({ value: r }));
    } else if (recordType === 'MX') {
      normalizedRecords = (records as dns.MxRecord[]).sort((a, b) => a.priority - b.priority);
    } else if (recordType === 'SOA') {
        const soa = records as dns.SoaRecord;
        normalizedRecords.push({ ...soa });
    } else {
        // Fallback for any other complex objects
        normalizedRecords = records;
    }


    return {
      success: true,
      message: 'DNS records fetched successfully.',
      domain,
      recordType,
      records: normalizedRecords,
    };
  } catch (error: any) {
    let message = `Failed to resolve DNS for ${domain}.`;
    if (error.code === 'ENOTFOUND') {
      message = `Domain not found: The domain '${domain}' does not exist or could not be found.`;
    } else if (error.code === 'ENODATA') {
      message = `No ${recordType} records found for '${domain}'. The domain exists, but does not have any records of this type.`;
    } else if (error.code === 'ESERVFAIL') {
        message = `Server failure: The authoritative DNS server for '${domain}' returned an error.`
    }
    return { success: false, message, domain, recordType };
  }
}
