import { storeHouseRepository } from '@/repositories/StoreHouseRepository';
import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import {
  failureResponse,
  ResponseCode,
  successResponse,
} from '@/utils/responseUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST - Create StoreHouse
export const createStoreHouse = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const storeHouse = await storeHouseRepository.createStoreHouse(body);
    return successResponse(c, ResponseCode.CREATED, storeHouse);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// POST - Create Multiple StoreHouses
export const createStoreHouses = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const storeHouses = await storeHouseRepository.createMany(body);
    return successResponse(c, ResponseCode.CREATED, storeHouses);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET - Get StoreHouse by ID
export const getStoreHouseById = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const storeHouse = await storeHouseRepository.findById(id);

    if (!storeHouse) {
      return failureResponse(c, ResponseCode.STOREHOUSE_NOT_FOUND);
    }

    return successResponse(c, ResponseCode.OK, storeHouse);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET - Get All StoreHouses with optional filters
export const getStoreHouses = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  const { search, businessId, page, limit } = queries;

  try {
    let storeHouses;

    if (search) {
      // Search by name
      storeHouses = await storeHouseRepository.searchByName(search);
    } else if (businessId) {
      // Filter by business
      storeHouses = await storeHouseRepository.findStoreHouses({
        business: businessId,
      });
    } else if (page && limit) {
      // Paginated results
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const filter = businessId ? { business: businessId } : {};
      storeHouses = await storeHouseRepository.findWithPagination(
        filter,
        pageNum,
        limitNum,
      );
    } else {
      // Get all
      storeHouses = await storeHouseRepository.findAll();
    }

    return successResponse(c, ResponseCode.OK, storeHouses);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// PUT - Update StoreHouse
export const updateStoreHouse = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  const { id } = params;

  try {
    const updatedStoreHouse = await storeHouseRepository.updateById(id, body);

    if (!updatedStoreHouse) {
      return failureResponse(c, ResponseCode.STOREHOUSE_NOT_FOUND);
    }

    return successResponse(c, ResponseCode.OK, updatedStoreHouse);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// DELETE - Delete StoreHouse
export const deleteStoreHouse = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const deletedStoreHouse = await storeHouseRepository.deleteById(id);

    if (!deletedStoreHouse) {
      return failureResponse(c, ResponseCode.STOREHOUSE_NOT_FOUND);
    }

    return successResponse(c, ResponseCode.OK, {
      message: 'StoreHouse deleted successfully',
      deletedStoreHouse,
    });
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});
