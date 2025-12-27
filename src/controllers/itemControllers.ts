import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST
export const createItem = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  return c.json({ message: `Body received: ${JSON.stringify(body)}` }, 200);
});

// GET by ID
export const getItemById = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  const params = await getParams(c);

  return c.json(
    {
      message: `Queries received: ${JSON.stringify(queries)}, Params received: ${JSON.stringify(params)}`,
    },
    200,
  );
});
