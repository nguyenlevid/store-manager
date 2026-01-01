export async function getBody(c) {
  return await c.req.json();
}
export function getParams(c) {
  return c.req.param();
}
export function getQuery(c) {
  return c.req.query();
}
