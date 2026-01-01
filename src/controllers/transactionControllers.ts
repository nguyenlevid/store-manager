import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST 1 Transaction
export const createTransaction = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  return c.json(
    {
      createType: 'transaction',
      message: `Body received: ${JSON.stringify(body)}`,
    },
    200,
  );
});

// GET Transaction by Id
export const getTransactionById = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  const params = await getParams(c);

  return c.json(
    {
      getType: 'transaction',
      message: `Queries received: ${JSON.stringify(queries)}, Params received: ${JSON.stringify(params)}`,
    },
    200,
  );
});

// GET Transactions by Queries
export const getTransactions = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);

  return c.json(
    {
      getType: `transactions`,
      message: `Queries received: ${JSON.stringify(queries)}`,
    },
    200,
  );
});

// PUT (Update)
export const updateTransaction = factory.createHandlers(async (c) => {
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
export const deleteTransaction = factory.createHandlers(async (c) => {
  const params = await getParams(c);

  return c.json({ message: `Successfully deleted` }, 200);
});
