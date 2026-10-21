import test from 'node:test';
import assert from 'node:assert/strict';
import {
  handleGoogleReviews,
  normalizeReviews,
} from '../workers/google-reviews.js';
import worker from '../workers/index.js';
const env = {
  GOOGLE_PLACES_API_KEY: 'test-secret',
  GOOGLE_PLACE_ID: 'test-place',
  GOOGLE_REVIEWS_LIMITER: { limit: async () => ({ success: true }) },
};
const request = (path = '/api/google-reviews', options = {}) =>
  new Request(`https://example.com${path}`, options);
const review = (overrides = {}) => ({
  rating: 5,
  originalText: { text: 'Synthetic test review', languageCode: 'en' },
  authorAttribution: {
    displayName: 'Test reviewer',
    uri: 'https://example.com/author',
    photoUri: 'https://example.com/photo',
  },
  googleMapsUri: 'https://example.com/review',
  publishTime: '2026-10-21T12:00:00Z',
  ...overrides,
});
test('keeps only written five-star reviews with source attribution, newest first', () => {
  const result = normalizeReviews({
    rating: 4.6,
    userRatingCount: 22,
    reviews: [
      review({
        publishTime: 'invalid',
        authorAttribution: { displayName: 'No date' },
      }),
      review({ publishTime: '2024-01-01T00:00:00Z' }),
      review({ rating: 4 }),
      review({ originalText: { text: '  ' } }),
      review({ googleMapsUri: 'javascript:alert(1)' }),
      review(),
      null,
    ],
  });
  assert.equal(result.reviews.length, 3);
  assert.deepEqual(
    result.reviews.map((item) => item.publishedAt),
    ['2026-10-21T12:00:00.000Z', '2024-01-01T00:00:00.000Z', ''],
  );
  assert.equal(result.rating, 4.6);
  assert.equal(result.count, 22);
});
test('preserves original text and normalizes malformed or unsafe attribution', () => {
  const result = normalizeReviews({
    reviews: [
      review({
        originalText: { text: '<img onerror="alert(1)"> Original' },
        text: { text: 'Translated' },
        authorAttribution: {
          displayName: 'Author',
          uri: 'http://example.com',
          photoUri: 'data:text/html,unsafe',
        },
      }),
    ],
    attributions: [
      null,
      { provider: 'Provider', providerUri: 'https://example.com' },
      { provider: 'Other', providerUri: 'javascript:alert(1)' },
    ],
  });
  assert.equal(result.reviews[0].text, '<img onerror="alert(1)"> Original');
  assert.equal(result.reviews[0].authorUrl, '');
  assert.equal(result.reviews[0].photoUrl, '');
  assert.deepEqual(result.attributions, [
    { name: 'Provider', url: 'https://example.com/' },
    { name: 'Other', url: '' },
  ]);
  assert.deepEqual(normalizeReviews(null), {
    reviews: [],
    attributions: [],
    rating: null,
    count: null,
  });
});
test('does not fetch on missing config, disallowed method, cross-site, or arbitrary query', async () => {
  const send = () => {
    throw new Error('Must not fetch');
  };
  for (const [req, config, status] of [
    [request(), {}, 503],
    [request(), { ...env, GOOGLE_REVIEWS_LIMITER: undefined }, 503],
    [request('', { method: 'POST' }), env, 405],
    [request('', { headers: { origin: 'https://other.com' } }), env, 403],
    [request('', { headers: { 'sec-fetch-site': 'cross-site' } }), env, 403],
    [request('/api/google-reviews?placeId=other'), env, 403],
  ])
    assert.equal((await handleGoogleReviews(req, config, send)).status, status);
});
test('fixed upstream, bounded timeout, redirects blocked, response not cached', async () => {
  const response = await handleGoogleReviews(
    request(),
    env,
    async (url, options) => {
      assert.equal(
        url,
        'https://places.googleapis.com/v1/places/test-place?languageCode=en',
      );
      assert.equal(options.headers['X-Goog-Api-Key'], 'test-secret');
      assert.equal(
        options.headers['X-Goog-FieldMask'],
        'reviews,attributions,rating,userRatingCount',
      );
      assert.equal(options.redirect, 'manual');
      assert.ok(options.signal instanceof AbortSignal);
      return Response.json({ reviews: [review()] });
    },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal((await response.json()).reviews.length, 1);
});
test('rate limiting fails closed before the billable request', async () => {
  const config = {
    ...env,
    GOOGLE_REVIEWS_LIMITER: { limit: async () => ({ success: false }) },
  };
  const response = await handleGoogleReviews(request(), config, () =>
    assert.fail('No upstream call'),
  );
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
});
test('upstream failure never exposes provider messages, keys, or cached reviews', async () => {
  for (const status of [301, 302, 307, 308, 400, 403, 404, 429, 500]) {
    const response = await handleGoogleReviews(
      request(),
      env,
      async () => new Response('test-secret private detail', { status }),
    );
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.doesNotMatch(await response.text(), /test-secret|private detail/);
  }
  const failed = await handleGoogleReviews(request(), env, async () => {
    throw new Error('test-secret');
  });
  assert.deepEqual(await failed.json(), { error: 'GOOGLE_UNAVAILABLE' });
});
test('empty results and malformed JSON are handled without invented reviews', async () => {
  const empty = await handleGoogleReviews(request(), env, async () =>
    Response.json({ reviews: [] }),
  );
  assert.deepEqual((await empty.json()).reviews, []);
  const malformed = await handleGoogleReviews(
    request(),
    env,
    async () => new Response('not JSON'),
  );
  assert.equal(malformed.status, 503);
});
test('Worker routes reviews to JSON without falling through to static assets', async () => {
  const response = await worker.fetch(request(), {
    ASSETS: { fetch: () => assert.fail('No assets') },
  });
  assert.equal(response.status, 503);
  assert.match(response.headers.get('content-type'), /application\/json/);
});
