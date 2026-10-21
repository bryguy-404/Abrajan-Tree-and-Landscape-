const json = (body, status = 200, headers = {}) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
const text = (value) => (typeof value === 'string' ? value : '');
const https = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : '';
  } catch {
    return '';
  }
};

export function normalizeReviews(data) {
  const reviews = (Array.isArray(data?.reviews) ? data.reviews : [])
    .filter((review) => review?.rating === 5)
    .map((review) => ({
      rating: 5,
      text: text(review.originalText?.text) || text(review.text?.text),
      language:
        text(review.originalText?.languageCode) ||
        text(review.text?.languageCode),
      author: text(review.authorAttribution?.displayName),
      authorUrl: https(review.authorAttribution?.uri),
      photoUrl: https(review.authorAttribution?.photoUri),
      reviewUrl: https(review.googleMapsUri),
      publishedAt: Number.isFinite(Date.parse(review.publishTime))
        ? new Date(review.publishTime).toISOString()
        : '',
      relativeDate: text(review.relativePublishTimeDescription),
    }))
    .filter((review) => review.text.trim() && review.author && review.reviewUrl)
    .sort(
      (a, b) =>
        (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0),
    );
  const attributions = (
    Array.isArray(data?.attributions) ? data.attributions : []
  )
    .map((item) => ({
      name: text(item?.provider),
      url: https(item?.providerUri),
    }))
    .filter((item) => item.name);
  return {
    reviews,
    attributions,
    rating:
      typeof data?.rating === 'number' && data.rating >= 0 && data.rating <= 5
        ? data.rating
        : null,
    count:
      Number.isInteger(data?.userRatingCount) && data.userRatingCount >= 0
        ? data.userRatingCount
        : null,
  };
}

export async function handleGoogleReviews(request, env, send = fetch) {
  if (request.method !== 'GET')
    return json({ error: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'GET' });
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (
    url.search ||
    (origin && origin !== url.origin) ||
    request.headers.get('sec-fetch-site') === 'cross-site'
  ) {
    return json({ error: 'INVALID_REQUEST' }, 403);
  }
  if (
    !env.GOOGLE_PLACES_API_KEY ||
    !/^[A-Za-z0-9_-]+$/.test(env.GOOGLE_PLACE_ID || '')
  ) {
    return json({ error: 'REVIEWS_NOT_CONFIGURED' }, 503);
  }
  // Fail closed if the deployed rate-limit binding is absent. This is an abuse
  // control per Cloudflare location, not a global spending cap; set Google quotas too.
  if (!env.GOOGLE_REVIEWS_LIMITER)
    return json({ error: 'REVIEWS_NOT_CONFIGURED' }, 503);
  try {
    const { success } = await env.GOOGLE_REVIEWS_LIMITER.limit({
      key: 'abrajan-reviews',
    });
    if (!success)
      return json({ error: 'REVIEWS_BUSY' }, 429, { 'Retry-After': '60' });
    const response = await send(
      `https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}?languageCode=en`,
      {
        headers: {
          'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'reviews,attributions,rating,userRatingCount',
        },
        // Workers supports manual/follow. Reject non-2xx responses below so a
        // redirect can never forward the private key to a different host.
        redirect: 'manual',
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) {
      const code =
        {
          400: 'GOOGLE_INVALID_REQUEST',
          403: 'GOOGLE_ACCESS_DENIED',
          404: 'GOOGLE_PLACE_NOT_FOUND',
          429: 'GOOGLE_QUOTA_REACHED',
        }[response.status] || 'GOOGLE_UNAVAILABLE';
      return json({ error: code }, 503);
    }
    const data = await response.json();
    if (!data || typeof data !== 'object' || Array.isArray(data))
      return json({ error: 'GOOGLE_UNAVAILABLE' }, 503);
    return json(normalizeReviews(data));
  } catch {
    return json({ error: 'GOOGLE_UNAVAILABLE' }, 503);
  }
}
