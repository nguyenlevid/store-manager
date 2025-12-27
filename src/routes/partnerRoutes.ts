import {
  createPartner,
  createPartners,
  getPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} from '@/controllers/partnerControllers';

import { Hono } from 'hono';

const partnerRoutes = new Hono();

partnerRoutes
  .post('/', ...createPartner) // POST /api/partner
  .post('/partners', ...createPartners) // POST /api/partner/partners
  .get('/:id', ...getPartnerById) // GET /api/partner/:id
  .get('/', ...getPartners) // GET /api/partner
  .put('/:id', ...updatePartner) // PUT /api/partner/:id
  .delete('/:id', ...deletePartner); // Delete /api/partner/:id

export default partnerRoutes;
