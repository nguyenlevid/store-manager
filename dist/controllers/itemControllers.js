import { getBody, getParams, getQuery } from '../utils/requestUtils.js';
import { createFactory } from 'hono/factory';
import { itemRepository } from '../db/index.js';
const factory = createFactory();
// POST
// body
export const createItem = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  try {
    // Using repository - validates and creates
    const newItem = await itemRepository.create(body);
    return c.json(
      {
        message: 'Item created successfully',
        item: newItem,
      },
      201,
    );
  } catch (error) {
    console.error('[createItem] Error:', error);
    return c.json(
      { error: 'Failed to create item', details: error.message },
      400,
    );
  }
});
// POST Items
export const createItems = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  try {
    // Using repository - bulk create
    const newItems = await itemRepository.createMany(body);
    return c.json(
      {
        message: 'Items created successfully',
        items: newItems,
        count: newItems.length,
      },
      201,
    );
  } catch (error) {
    console.error('[createItems] Error:', error);
    return c.json(
      { error: 'Failed to create items', details: error.message },
      400,
    );
  }
});
// PUT (Update)
export const updateItem = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  const { id } = params;
  if (!id) {
    return c.json({ error: 'Item ID is required' }, 400);
  }
  try {
    // Using repository - returns updated lean object
    const updatedItem = await itemRepository.updateById(id, body);
    if (!updatedItem) {
      return c.json({ error: 'Item not found' }, 404);
    }
    return c.json(
      {
        message: 'Item updated successfully',
        item: updatedItem,
      },
      200,
    );
  } catch (error) {
    console.error('[updateItem] Error:', error);
    return c.json(
      { error: 'Failed to update item', details: error.message },
      500,
    );
  }
});
// DELETE
export const deleteItem = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;
  if (!id) {
    return c.json({ error: 'Item ID is required' }, 400);
  }
  try {
    const deletedItem = await itemRepository.deleteById(id);
    if (!deletedItem) {
      return c.json({ error: 'Item not found' }, 404);
    }
    return c.json(
      {
        message: 'Item deleted successfully',
        item: deletedItem,
      },
      200,
    );
  } catch (error) {
    console.error('[deleteItem] Error:', error);
    return c.json(
      { error: 'Failed to delete item', details: error.message },
      500,
    );
  }
});
// GET by ID
export const getItemById = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;
  if (!id) {
    return c.json({ error: 'Item ID is required' }, 400);
  }
  try {
    // Using repository - returns lean object (fast, optimized)
    const item = await itemRepository.findById(id);
    if (!item) {
      return c.json({ error: 'Item not found' }, 404);
    }
    return c.json({ item }, 200);
  } catch (error) {
    console.error('[getItemById] Error:', error);
    return c.json(
      { error: 'Failed to fetch item', details: error.message },
      500,
    );
  }
});
// GET Items by Queries
export const getItems = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  try {
    // Using repository with filters
    const { search, minPrice, maxPrice, tags, lowStock, page, limit } = queries;
    // Search by name
    if (search) {
      const items = await itemRepository.searchByName(search);
      return c.json({ items, count: items.length }, 200);
    }
    // Find by price range
    if (minPrice || maxPrice) {
      const items = await itemRepository.findByPriceRange(
        parseFloat(minPrice) || 0,
        parseFloat(maxPrice) || Number.MAX_VALUE,
      );
      return c.json({ items, count: items.length }, 200);
    }
    // Find by tags
    if (tags) {
      const tagArray = tags.split(',');
      const items = await itemRepository.findByTags(tagArray);
      return c.json({ items, count: items.length }, 200);
    }
    // Find low stock items
    if (lowStock === 'true') {
      const threshold = parseInt(queries.threshold) || 10;
      const items = await itemRepository.findLowStock(threshold);
      return c.json({ items, count: items.length }, 200);
    }
    // Pagination
    if (page || limit) {
      const result = await itemRepository.findWithPagination(
        {},
        parseInt(page) || 1,
        parseInt(limit) || 20,
      );
      return c.json(result, 200);
    }
    // Default: get all items (lean, optimized)
    const items = await itemRepository.findAll();
    return c.json({ items, count: items.length }, 200);
  } catch (error) {
    console.error('[getItems] Error:', error);
    return c.json(
      { error: 'Failed to fetch items', details: error.message },
      500,
    );
  }
});
