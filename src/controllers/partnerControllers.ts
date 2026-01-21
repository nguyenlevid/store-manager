import { itemRepository } from '@/repositories';
import { partnerRepository } from '@/repositories/PartnerRepository';
import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import {
  failureResponse,
  ResponseCode,
  successResponse,
} from '@/utils/responseUtils';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// POST 1 Partner
export const createPartner = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const partner = await partnerRepository.createPartner(body);
    return successResponse(c, ResponseCode.OK, partner);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// POST Partners
export const createPartners = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const inputPartners = body['partners'];

  try {
    const partners = await partnerRepository.createPartners(inputPartners);
    return successResponse(c, ResponseCode.OK, partners);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET by ID
export const getPartnerById = factory.createHandlers(async (c) => {
  const params = await getQuery(c);
  const { id } = params;

  try {
    const partner = await partnerRepository.findById(id);

    return successResponse(c, ResponseCode.OK, partner);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET Partners by Queries
export const getPartners = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);

  try {
    const partners = await partnerRepository.findPartners(queries);

    return successResponse(c, ResponseCode.OK, partners);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// PUT (Update)
export const updatePartner = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  const { id } = params;

  try {
    const partner = await partnerRepository.updateById(id, body);
    return successResponse(c, ResponseCode.OK, partner);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// DELETE BY ID
export const deletePartner = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const partner = await partnerRepository.deleteById(id);
    return successResponse(c, ResponseCode.OK, partner);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});
