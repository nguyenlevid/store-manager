import { Context } from 'hono';

export async function getBody<T = any>(c: Context): Promise<T> {
  return await c.req.json<T>();
}

export function getParams<T extends Record<string, string> = any>(
  c: Context,
): T {
  return c.req.param() as T;
}

export function getQuery<T extends Record<string, string | undefined> = any>(
  c: Context,
): T {
  return c.req.query() as T;
}
