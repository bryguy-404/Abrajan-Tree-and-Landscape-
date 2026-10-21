import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { handleEstimate } from '../workers/index.js';
const valid = {
  name: 'Test Customer',
  phone: '574-555-0100',
  email: 'test@example.com',
  service: 'Tree care & removal',
  message: 'Please provide an estimate for tree trimming.',
  website: '',
};
const env = {
  RESEND_API_KEY: 'test-key',
  CONTACT_FROM_EMAIL: 'Website <website@example.com>',
  CONTACT_TO_EMAIL: 'owner@example.com',
};
const request = (body = valid, overrides = {}) =>
  new Request('https://abrajan.example/api/estimate', {
    method: 'POST',
    headers: {
      origin: 'https://abrajan.example',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
    ...overrides,
  });
const neverSend = () => {
  throw new Error('Email must not be sent');
};
test('unconfigured preview never sends an email', async () => {
  const response = await handleEstimate(request(), {}, neverSend);
  assert.equal(response.status, 503);
});
test('cross-origin requests are rejected', async () => {
  assert.equal(
    (
      await handleEstimate(
        request(valid, {
          headers: {
            origin: 'https://elsewhere.example',
            'content-type': 'application/json',
          },
        }),
        env,
        neverSend,
      )
    ).status,
    403,
  );
});
test('invalid input and unknown services are rejected', async () => {
  for (const change of [
    { email: 'not-an-email' },
    { phone: '12' },
    { service: 'unrecognized' },
    { message: '' },
    { name: 'line\nbreak' },
    { message: 'a'.repeat(3001) },
  ])
    assert.equal(
      (await handleEstimate(request({ ...valid, ...change }), env, neverSend))
        .status,
      400,
    );
});
test('honeypot submissions do not send', async () => {
  assert.equal(
    (
      await handleEstimate(
        request({ ...valid, website: 'spam.example' }),
        env,
        neverSend,
      )
    ).status,
    200,
  );
});
test('oversized bodies are capped without content-length', async () => {
  assert.equal(
    (
      await handleEstimate(
        request({ ...valid, message: 'a'.repeat(13000) }),
        env,
        neverSend,
      )
    ).status,
    413,
  );
});
test('malformed JSON is rejected', async () => {
  assert.equal(
    (await handleEstimate(request({}, { body: '{invalid' }), env, neverSend))
      .status,
    400,
  );
});
test('successful provider response sends only to configured recipient', async () => {
  let payload;
  const response = await handleEstimate(
    request(),
    env,
    async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      payload = JSON.parse(options.body);
      assert.equal(options.headers.Authorization, 'Bearer test-key');
      return Response.json({ id: 'test-email' });
    },
  );
  assert.equal(response.status, 200);
  assert.deepEqual(payload.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(payload.reply_to, valid.email);
  assert.ok(payload.text.includes(valid.message));
});
test('provider failures never return false success', async () => {
  assert.equal(
    (
      await handleEstimate(
        request(),
        env,
        async () => new Response('Rejected', { status: 429 }),
      )
    ).status,
    502,
  );
  assert.equal(
    (
      await handleEstimate(request(), env, async () => {
        throw new Error('Offline');
      })
    ).status,
    502,
  );
});
test('static assets pass through and unknown APIs return 404', async () => {
  const assets = { ASSETS: { fetch: async () => new Response('Homepage') } };
  assert.equal(
    await (
      await worker.fetch(new Request('https://abrajan.example/'), assets)
    ).text(),
    'Homepage',
  );
  assert.equal(
    (
      await worker.fetch(
        new Request('https://abrajan.example/api/missing'),
        assets,
      )
    ).status,
    404,
  );
});
