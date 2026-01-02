import { businessRepository } from '@/repositories/businessRepository';
import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import {
  failureResponse,
  ResponseCode,
  successResponse,
} from '@/utils/responseUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST - Create Business
export const createBusiness = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const business = await businessRepository.createBusiness(body);
    return successResponse(c, ResponseCode.CREATED, business);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// POST - Create Multiple Businesses
export const createBusinesses = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const businesses = await businessRepository.createMany(body);
    return successResponse(c, ResponseCode.CREATED, businesses);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET - Get Business by ID
export const getBusinessById = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const business = await businessRepository.findById(id);

    if (!business) {
      return failureResponse(c, ResponseCode.BUSINESS_NOT_FOUND);
    }

    return successResponse(c, ResponseCode.OK, business);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET - Get All Businesses with optional search
export const getBusinesses = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  const { search, page, limit } = queries;

  try {
    let businesses;

    if (search) {
      // Search by name
      businesses = await businessRepository.searchByName(search);
    } else if (page && limit) {
      // Paginated results
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      businesses = await businessRepository.findWithPagination(
        {},
        pageNum,
        limitNum,
      );
    } else {
      // Get all
      businesses = await businessRepository.findAll();
    }

    return successResponse(c, ResponseCode.OK, businesses);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// PUT - Update Business
export const updateBusiness = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  const { id } = params;

  try {
    const updatedBusiness = await businessRepository.updateById(id, body);

    if (!updatedBusiness) {
      return failureResponse(c, ResponseCode.BUSINESS_NOT_FOUND);
    }

    return successResponse(c, ResponseCode.OK, updatedBusiness);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// DELETE - Delete Business
export const deleteBusiness = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const deletedBusiness = await businessRepository.deleteById(id);

    if (!deletedBusiness) {
      return failureResponse(c, ResponseCode.BUSINESS_NOT_FOUND);
    }

    return successResponse(c, ResponseCode.OK, {
      message: 'Business deleted successfully',
      deletedBusiness,
    });
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});
