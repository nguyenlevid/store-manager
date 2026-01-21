import { itemRepository } from '@/repositories';
import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import {
  failureResponse,
  ResponseCode,
  successResponse,
} from '@/utils/responseUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST
export const createItem = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const item = await itemRepository.createItem(body);

    return successResponse(c, ResponseCode.OK, item);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// POST Items
export const createItems = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const inputItems = body['items'];
  try {
    const items = await itemRepository.createItems(inputItems);

    return successResponse(c, ResponseCode.OK, items);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// PUT (Update)
export const updateItem = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  const { id } = params;

  try {
    const item = await itemRepository.updateById(id, body);

    return successResponse(c, ResponseCode.OK, item);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// DELETE BY ID
export const deleteItem = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const item = await itemRepository.deleteById(id);
    return successResponse(c, ResponseCode.OK, item);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET by ID
export const getItemById = factory.createHandlers(async (c) => {
  const params = await getParams(c);

  const { id } = params;

  try {
    const item = await itemRepository.findById(id);

    return successResponse(c, ResponseCode.OK, item);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET Items by Queries
export const getItems = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);

  try {
    const items = await itemRepository.findItems(queries);

    return successResponse(c, ResponseCode.OK, items);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});
