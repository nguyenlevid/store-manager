import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST 1 Import
export const createImport = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  return c.json(
    {
      createType: 'import',
      message: `Body received: ${JSON.stringify(body)}`,
    },
    200,
  );
});

// POST Imports
export const createImports = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  return c.json(
    {
      createType: 'imports',
      message: `Body received: ${JSON.stringify(body)}`,
    },
    200,
  );
});

// GET Import by Id
export const getImportById = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  const params = await getParams(c);

  return c.json(
    {
      getType: 'import',
      message: `Queries received: ${JSON.stringify(queries)}, Params received: ${JSON.stringify(params)}`,
    },
    200,
  );
});

// GET Imports by Queries
export const getImports = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);

  return c.json(
    {
      getType: 'imports',
      message: `Queries received: ${JSON.stringify(queries)}`,
    },
    200,
  );
});

// PUT (Update)
export const updateImport = factory.createHandlers(async (c) => {
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
export const deleteImport = factory.createHandlers(async (c) => {
  const params = await getParams(c);

  return c.json({ message: `Successfully deleted` }, 200);
});
