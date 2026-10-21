import siteWorker from './index.js';

// Private service for Pages. No public workers.dev URL or static assets.
export default {
  fetch(request, env) {
    if (!new URL(request.url).pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 });
    }
    return siteWorker.fetch(request, env);
  },
};
