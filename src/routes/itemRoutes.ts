import { createItem, getItemById } from '@/controllers/itemControllers';
import { Hono } from 'hono';

const itemRoutes = new Hono();

itemRoutes
  .post('/', ...createItem) // POST /api/item
  .get('/:id', ...getItemById); // GET /api/item/:id

export default itemRoutes;
