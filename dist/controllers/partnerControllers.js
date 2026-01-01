import { getBody, getParams, getQuery } from '../utils/requestUtils.js';
import { createFactory } from 'hono/factory';
const factory = createFactory();
// POST 1 Partner
export const createPartner = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  return c.json(
    {
      createType: 'partner',
      message: `Body received: ${JSON.stringify(body)}`,
    },
    200,
  );
});
// POST Partners
export const createPartners = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  return c.json(
    {
      createType: 'partners',
      message: `Body received: ${JSON.stringify(body)}`,
    },
    200,
  );
});
// GET by ID
export const getPartnerById = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  return c.json({
    createType: 'partner',
    message: `Queries received: ${JSON.stringify(queries)}`,
  });
});
// GET Partners by Queries
export const getPartners = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  return c.json(
    {
      createType: 'partners',
      message: `Queries received: ${JSON.stringify(queries)}`,
    },
    200,
  );
});
// PUT (Update)
export const updatePartner = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  return c.json(
    {
      message: `Body received: ${JSON.stringify(body)} Params received: ${JSON.stringify(params)}`,
    },
    200,
  );
});
// DELETE
export const deletePartner = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  return c.json({ message: `Successfully deleted` }, 200);
});
