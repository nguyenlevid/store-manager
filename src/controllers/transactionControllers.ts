import { transactionRepository } from '@/repositories/TransactionRepository';
import { getBody, getParams, getQuery } from '@/utils/requestUtils';
import { createFactory } from 'hono/factory';
import {
  failureResponse,
  ResponseCode,
  successResponse,
} from '@/utils/responseUtils';

const factory = createFactory();

// POST 1 Transaction
export const createTransaction = factory.createHandlers(async (c) => {
  const body = await getBody(c);

  try {
    const transaction = await transactionRepository.createTransaction(body);

    return successResponse(c, ResponseCode.OK, transaction);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET Transaction by Id
export const getTransactionById = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const transaction = await transactionRepository.findById(id);

    return successResponse(c, ResponseCode.OK, transaction);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// GET Transactions by Queries
export const getTransactions = factory.createHandlers(async (c) => {
  const queries = await getQuery(c);

  try {
    const transactions = await transactionRepository.findTransactions(queries);

    return successResponse(c, ResponseCode.OK, transactions);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// PUT (Update)
export const updateTransaction = factory.createHandlers(async (c) => {
  const body = await getBody(c);
  const params = await getParams(c);
  const { id } = params;

  try {
    const transaction = await transactionRepository.updateById(id, body);

    return successResponse(c, ResponseCode.OK, transaction);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});

// DELETE BY ID
export const deleteTransaction = factory.createHandlers(async (c) => {
  const params = await getParams(c);
  const { id } = params;

  try {
    const transaction = await transactionRepository.deleteById(id);
    return successResponse(c, ResponseCode.OK, transaction);
  } catch (error) {
    return failureResponse(c, ResponseCode.DATABASE_ERROR, error);
  }
});
