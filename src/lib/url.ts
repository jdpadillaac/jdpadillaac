import { site } from '../data/site';

export function absolute(pathname: string): string {
  return new URL(pathname, site.url).href;
}
