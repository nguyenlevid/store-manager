import { userRepository } from '@/repositories/UserRepository';
import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import { createFactory } from 'hono/factory';
import {
  failureResponse,
  ResponseCode,
  successResponse,
} from '@/utils/responseUtils';

const factory = createFactory();

// POST 1 User
export const createUser = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const user = await userRepository.createUser(body);
    return successResponse(c, ResponseCode.OK, user);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// PUT (Update)
export const updateUser = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  const { id } = params;
  try {
    const user = await userRepository.updateById(id, body);
    return successResponse(c, ResponseCode.OK, user);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// DELETE BY ID
export const deleteUser = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    await userRepository.deleteById(id);
    return successResponse(c, ResponseCode.OK, null);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});
// GET by ID
export const getUserById = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const user = await userRepository.findById(id);
    if (!user) {
      return failureResponse(c, ResponseCode.USER_NOT_FOUND);
    }
    return successResponse(c, ResponseCode.OK, user);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET Users by Queries
export const getUsers = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);
  try {
    const users = await userRepository.findUsers(queries);

    return successResponse(c, ResponseCode.OK, users);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});
