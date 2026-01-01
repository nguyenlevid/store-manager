import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST 1 Item
export const createItem = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  return c.json(
    { createType: 'item', message: `Body received: ${JSON.stringify(body)}` },
    200,
  );
});

// POST Items
export const createItems = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  return c.json(
    { createType: 'items', message: `Body received: ${JSON.stringify(body)}` },
    200,
  );
});

// PUT (Update)
export const updateItem = factory.createHandlers(async (c) => {
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
export const deleteItem = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  return c.json({ message: 'Deleted item with id: ' + id }, 200);
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

// GET Items by Queries
export const getItems = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);

  return c.json(
    {
      message: `Queries received: ${JSON.stringify(queries)}`,
    },
    200,
  );
});
