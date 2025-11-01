
'use server';

import { z } from 'zod';

const formSchema = z.object({
  url: z.string().min(1, 'Please enter a URL.'),
});

export type FormState = {
  success: boolean;
  message: string;
  url?: string;
  headers?: Record<string, string>;
  status?: number;
  statusText?: string;
} | null;

export async function checkHeaders(
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

  let url = parsed.data.url;
  // Ensure the URL has a protocol
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'manual', // Do not follow redirects
    });
    
    clearTimeout(timeoutId);

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    return {
      success: true,
      message: 'Headers fetched successfully.',
      url: response.url,
      headers,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
        return { success: false, message: 'The request timed out. The server took too long to respond.' };
    }
    // Attempt to parse the URL to give a better error for invalid hostnames
    try {
        new URL(url);
    } catch (urlError) {
        return { success: false, message: 'Invalid URL. Please enter a correct domain or URL.' };
    }
    return {
      success: false,
      message: 'Failed to fetch headers. This could be due to a network error, an invalid domain, or CORS policies if the server is improperly configured. Please ensure the URL is correct and the server is accessible.'
    };
  }
}
