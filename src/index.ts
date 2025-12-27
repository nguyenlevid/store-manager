import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import itemRoutes from './routes/itemRoutes';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/item', itemRoutes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
