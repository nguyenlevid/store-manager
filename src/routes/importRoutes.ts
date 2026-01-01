import {
  createImport,
  createImports,
  getImports,
  getImportById,
  updateImport,
  deleteImport,
} from '@/controllers/importControllers';

import { Hono } from 'hono';

const importRoutes = new Hono();

importRoutes
  .post('/', ...createImport) // POST /api/import
  .post('/imports', ...createImports) // POST /api/import/imports
  .get('/:id', ...getImportById) // GET /api/import/:id
  .get('/', ...getImports) // GET /api/import
  .put('/:id', ...updateImport) // PUT /api/import/:id
  .delete('/:id', ...deleteImport); // DELETE /api/import/:id

export default importRoutes;
