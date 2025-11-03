
'use server';
import tls from 'tls';
import { z } from 'zod';

const formSchema = z.object({
  domain: z.string().min(1, 'Please enter a domain name.'),
});

export type FormState = {
  success: boolean;
  message: string;
  domain?: string;
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  commonName?: string;
  sans?: string[];
  serialNumber?: string;
  valid?: boolean;
} | null;

export async function checkSsl(
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

  // Remove protocol if present for parsing host and port
  let domain = parsed.data.domain.replace(/^https?:\/\//, '');

  const hostAndPort = domain.split(':');
  const host = hostAndPort[0];
  const port = hostAndPort.length > 1 ? parseInt(hostAndPort[1], 10) : 443;
  
  if (isNaN(port)) {
    return {
        success: false,
        message: 'Invalid port number.',
    }
  }

  return new Promise((resolve) => {
    const options = {
      host: host,
      port: port,
      servername: host, // SNI support
      rejectUnauthorized: false // We accept self-signed certs to analyze them
    };

    try {
      const socket = tls.connect(options, () => {
        if (!socket.authorized) {
            // This is for self-signed or invalid CA, but we can still get cert info
        }

        const cert = socket.getPeerCertificate();

        if (!cert || Object.keys(cert).length === 0) {
          socket.destroy();
          resolve({
            success: false,
            message: `Could not retrieve SSL certificate for ${host}. The domain might not have SSL/TLS installed or the port is incorrect.`
          });
          return;
        }

        const validToDate = new Date(cert.valid_to);
        const now = new Date();
        const daysRemaining = Math.ceil((validToDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        socket.destroy();
        resolve({
          success: true,
          message: 'Certificate fetched successfully.',
          domain: host,
          issuer: cert.issuer.O,
          validFrom: new Date(cert.valid_from).toUTCString(),
          validTo: validToDate.toUTCString(),
          daysRemaining: daysRemaining,
          commonName: cert.subject.CN,
          sans: cert.subjectaltname?.replace(/DNS:/g, '').split(', '),
          serialNumber: cert.serialNumber,
          valid: daysRemaining > 0,
        });
      });

      socket.on('error', (err) => {
        socket.destroy();
        let message = `Failed to connect to ${host}:${port}.`;
        if (err.message.includes('ENOTFOUND')) {
            message = `Domain not found: ${host}. Please check the domain name.`
        } else if (err.message.includes('ECONNREFUSED')) {
            message = `Connection refused by ${host}:${port}. Is the port correct and the server running?`
        }
        resolve({ success: false, message });
      });

      socket.setTimeout(5000, () => {
        socket.destroy();
        resolve({ success: false, message: 'Connection timed out. The server is not responding.' });
      });

    } catch (error: any) {
        resolve({ success: false, message: `An unexpected error occurred: ${error.message}` });
    }
  });
}
