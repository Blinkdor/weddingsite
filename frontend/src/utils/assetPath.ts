/**
 * Resolves an asset path against the configured Vite base so the app can run
 * under nested routes such as /wedding.
 */
export function assetPath(path: string) {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
