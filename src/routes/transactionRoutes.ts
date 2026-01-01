import {
  createTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '@/controllers/transactionControllers';
import { Hono } from 'hono';
const transactionRoutes = new Hono();

transactionRoutes
  .post('/', ...createTransaction) // POST /api/transaction
  .get('/:id', ...getTransactionById) // GET /api/transaction/:id
  .get('/', ...getTransactions) // GET /api/transaction/
  .put('/:id', ...updateTransaction) // PUT /api/transaction/:id
  .delete('/:id', ...deleteTransaction); // DELETE /api/transaction/:id

export default transactionRoutes;
