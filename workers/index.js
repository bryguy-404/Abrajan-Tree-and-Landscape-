import { handleGoogleReviews } from './google-reviews.js';
// Static Astro output with private review and contact endpoints.
const SERVICES = new Set([
  'Tree care & removal',
  'Landscaping & mulch',
  'Lawn & property care',
  'Seasonal cleanup',
  'Snow & ice management',
  'Something else',
]);
const MAX_BODY_BYTES = 12000;
const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

export async function handleEstimate(request, env, send = fetch) {
  if (request.method !== 'POST')
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return json({ error: 'Please send your request from our website.' }, 403);
  if (
    !request.headers
      .get('content-type')
      ?.toLowerCase()
      .startsWith('application/json')
  )
    return json({ error: 'Please use the estimate form.' }, 415);
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES)
    return json({ error: 'Your message is too long.' }, 413);
  let data;
  try {
    // Read with a cap even when Content-Length is absent or inaccurate.
    if (!request.body) return json({ error: 'Please complete the form.' }, 400);
    const reader = request.body.getReader();
    const chunks = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: 'Your message is too long.' }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return json({ error: 'Please complete the form and try again.' }, 400);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data))
    return json({ error: 'Please complete the form.' }, 400);
  if (typeof data.website === 'string' && data.website.trim())
    return json({ ok: true });
  const clean = (key) =>
    typeof data[key] === 'string' ? data[key].trim() : '';
  const name = clean('name');
  const email = clean('email');
  const phone = clean('phone');
  const service = clean('service');
  const message = clean('message');
  if (
    !name ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    phone.length > 30 ||
    phone.replace(/\D/g, '').length < 7 ||
    !SERVICES.has(service) ||
    !message ||
    message.length > 3000
  )
    return json(
      {
        error:
          'Please check your name, email, phone number, service, and project details.',
      },
      400,
    );
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL)
    return json(
      {
        error:
          'Online requests are not available yet. Please call 574-292-2913 for your free estimate.',
      },
      503,
    );
  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Website estimate request: ${service}`,
        text: `New estimate request from the Abrajan website\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nProject details:\n${message}`,
      }),
    });
    if (!response.ok)
      return json(
        {
          error:
            'We couldn’t send your request. Please try again or call 574-292-2913.',
        },
        502,
      );
    return json({ ok: true });
  } catch {
    return json(
      {
        error:
          'We couldn’t send your request. Please try again or call 574-292-2913.',
      },
      502,
    );
  }
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api/google-reviews') return handleGoogleReviews(request, env);
    if (path === '/api/estimate') return handleEstimate(request, env);
    if (path.startsWith('/api/')) return json({ error: 'Not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};
