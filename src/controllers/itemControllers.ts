import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST
export const createItem = factory.createHandlers(async (c) => {
  return c.json({ message: 'Item created successfully' }, 200);
});
