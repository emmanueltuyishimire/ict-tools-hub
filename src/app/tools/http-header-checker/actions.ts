
'use server';

import { z } from 'zod';

const urlSchema = z.string().url('Please enter a valid URL.');

type FormState = {
  success: boolean;
  message?: string;
  headers?: Record<string, string>;
  url?: string;
  status?: number;
  statusText?: string;
};

export async function checkHeaders(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const url = formData.get('url');

  const validationResult = urlSchema.safeParse(url);

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0].message,
    };
  }

  const targetUrl = validationResult.data;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'manual', // We want to see the initial redirect headers
      headers: {
        'User-Agent': 'ICT-Toolbench-Header-Checker/1.0',
      },
    });

    const headersObject: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headersObject[key] = value;
    });

    return {
      success: true,
      headers: headersObject,
      url: response.url || targetUrl,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    let errorMessage = 'An unknown error occurred.';
    if (error.cause && 'code' in error.cause) {
      errorMessage = `Failed to fetch headers. Reason: ${error.cause.code}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
