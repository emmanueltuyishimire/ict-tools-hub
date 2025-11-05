
'use server';
import { z } from 'zod';

const formSchema = z.object({
  ip: z.string().ip({ version: 'v4', message: 'Please enter a valid IPv4 address.' }),
});

export type FormState = {
  success: boolean;
  message: string;
  data?: any;
} | null;

export async function ipLookup(
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
    // We use a different API that provides more details for the lookup tool
    const response = await fetch(`https://ipwho.is/${ip}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || `API error: ${response.statusText}` };
    }
    
    const data = await response.json();

    if (!data.success) {
        return { success: false, message: data.message || 'The IP address could not be looked up. It may be reserved or invalid.' };
    }

    return {
      success: true,
      message: 'IP information fetched successfully.',
      data: data,
    };
  } catch (error: any) {
    let message = `Failed to fetch IP details for ${ip}.`;
     if (error.name === 'AbortError') {
        message = 'The request timed out.';
    }
    return { success: false, message };
  }
}
