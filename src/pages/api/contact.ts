import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  language?: string;
  message?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { firstName, lastName, email, message, service } = body;

  if (!firstName?.trim() || !lastName?.trim()) {
    return new Response(JSON.stringify({ error: 'Please provide your first and last name.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: 'Please describe your situation.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!service) {
    return new Response(JSON.stringify({ error: 'Please select an area of interest.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: wire to email delivery (Resend, SendGrid, etc.)
  // For now, log server-side and return success.
  console.info('[contact-form]', {
    name: `${firstName} ${lastName}`,
    email,
    service,
    language: body.language,
    messageLength: message.length,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
