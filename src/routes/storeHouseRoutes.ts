import {
  createStoreHouse,
  createStoreHouses,
  getStoreHouses,
  getStoreHouseById,
  updateStoreHouse,
  deleteStoreHouse,
} from '@/controllers/storeHouseControllers';

import { Hono } from 'hono';

const storeHouseRoutes = new Hono();

storeHouseRoutes
  .post('/', ...createStoreHouse) // POST /api/storehouse
  .post('/storehouses', ...createStoreHouses) // POST /api/storehouse/storehouses
  .get('/:id', ...getStoreHouseById) // GET /api/storehouse/:id
  .get('/', ...getStoreHouses) // GET /api/storehouse
  .put('/:id', ...updateStoreHouse) // PUT /api/storehouse/:id
  .delete('/:id', ...deleteStoreHouse); // DELETE /api/storehouse/:id

export default storeHouseRoutes;
