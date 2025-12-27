import {
  createItem,
  createItems,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
} from '@/controllers/itemControllers';
import { Hono } from 'hono';

const itemRoutes = new Hono();

itemRoutes
  .post('/', ...createItem) // POST /api/item
  .get('/', ...getItems) // GET /api/item/
  .get('/:id', ...getItemById) // GET /api/item/:id
  .post('/items', ...createItems) // POST /api/item/items
  .put('/:id', ...updateItem) // PUT /api/item/:id
  .delete('/:id', ...deleteItem); // DELETE /api/item/:id

export default itemRoutes;
