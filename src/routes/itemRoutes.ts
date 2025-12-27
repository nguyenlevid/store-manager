import { createItem } from '@/controllers/itemControllers';
import { Hono } from 'hono';

const itemRoutes = new Hono();

itemRoutes.post('/create-item', ...createItem); // POST /api/item/create-item

export default itemRoutes;
