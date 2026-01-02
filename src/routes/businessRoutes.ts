import {
  createBusiness,
  createBusinesses,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from '@/controllers/businessControllers';

import { Hono } from 'hono';

const businessRoutes = new Hono();

businessRoutes
  .post('/', ...createBusiness) // POST /api/business
  .post('/businesses', ...createBusinesses) // POST /api/business/businesses
  .get('/:id', ...getBusinessById) // GET /api/business/:id
  .get('/', ...getBusinesses) // GET /api/business
  .put('/:id', ...updateBusiness) // PUT /api/business/:id
  .delete('/:id', ...deleteBusiness); // DELETE /api/business/:id

export default businessRoutes;
