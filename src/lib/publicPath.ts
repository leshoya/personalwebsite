/** Resolve a public/ asset path for GitHub Pages subpaths and local dev. */
export function publicPath(path: string): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}
