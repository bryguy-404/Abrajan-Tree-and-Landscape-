import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/[[path]].js';
import apiWorker from '../workers/api.js';

test('Pages forwards the original request through its private service binding', async () => {
  const request = new Request('https://example.pages.dev/api/google-reviews', {
    headers: { origin: 'https://example.pages.dev' },
  });
  const response = await onRequest({
    request,
    env: {
      SITE_API: {
        fetch: (forwarded) => {
          assert.equal(forwarded, request);
          return apiWorker.fetch(forwarded, {});
        },
      },
    },
  });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: 'REVIEWS_NOT_CONFIGURED' });
});

test('Pages fails safely without its binding and the API service never serves assets', async () => {
  const request = new Request('https://example.pages.dev/api/google-reviews');
  const response = await onRequest({ request, env: {} });
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { error: 'SERVICE_NOT_CONFIGURED' });
  const unknown = await apiWorker.fetch(
    new Request('https://example.com/'),
    {},
  );
  assert.equal(unknown.status, 404);
});
