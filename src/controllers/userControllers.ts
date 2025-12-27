import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST 1 User
export const createUser = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  return c.json(
    { createType: 'user', message: `Body received: ${JSON.stringify(body)}` },
    200,
  );
});

// PUT (Update)
export const updateUser = factory.createHandlers(async (c) => {
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
export const deleteUser = factory.createHandlers(async (c) => {
  const params = await getParams(c);

  return c.json({ message: `Successfully deleted` }, 200);
});

// GET by ID
export const getUserById = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  const params = await getParams(c);

  return c.json(
    {
      getType: 'user',
      message: `Queries received: ${JSON.stringify(queries)}, Params received: ${JSON.stringify(params)}`,
    },
    200,
  );
});

// GET Users by Queries
export const getUsers = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);

  return c.json(
    {
      getType: 'users',
      message: `Queries received: ${JSON.stringify(queries)}`,
    },
    200,
  );
});
