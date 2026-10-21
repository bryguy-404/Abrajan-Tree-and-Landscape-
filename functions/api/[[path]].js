export function onRequest({ request, env }) {
  if (!env.SITE_API) {
    return Response.json(
      { error: 'SERVICE_NOT_CONFIGURED' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  return env.SITE_API.fetch(request);
}
