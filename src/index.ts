import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import itemRoutes from './routes/itemRoutes';
import partnerRoutes from './routes/partnerRoutes';
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';
import importRoutes from './routes/importRoutes';
import { connectDatabase } from './db';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/item', itemRoutes);
app.route('/api/partner', partnerRoutes);
app.route('/api/user', userRoutes);
app.route('/api/transaction', transactionRoutes);
app.route('/api/import', importRoutes);

// Connect to database before starting server
connectDatabase()
  .then(() => {
    serve(
      {
        fetch: app.fetch,
        port: 3000,
      },
      (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
      },
    );
  })
  .catch((error) => {
    console.error('[Server] Failed to start:', error);
    process.exit(1);
  });
