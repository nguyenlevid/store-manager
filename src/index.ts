import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import itemRoutes from './routes/itemRoutes';
import partnerRoutes from './routes/partnerRoutes';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/item', itemRoutes);
app.route('/api/partner', partnerRoutes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
