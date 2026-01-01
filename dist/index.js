import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';
import itemRoutes from './routes/itemRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import { connectDatabase } from './db/index.js';
const app = new Hono();
app.get('/', (c) => {
  return c.text('Hello Hono!');
});
app.route('/api/item', itemRoutes);
app.route('/api/partner', partnerRoutes);
// Connect to database before starting server
connectDatabase()
  .then(() => {
    serve(
      {
        fetch: app.fetch,
        port: env.PORT,
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
