import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '@/controllers/userControllers';

import { Hono } from 'hono';

const userRoutes = new Hono();

userRoutes
  .post('/', ...createUser) // POST /api/user
  .get('/:id', ...getUserById) // GET /api/user/:id
  .get('/', ...getUsers) // GET /api/user
  .put('/:id', ...updateUser) // PUT /api/user/:id
  .delete('/:id', ...deleteUser); // DELETE /api/user/:id

export default userRoutes;
