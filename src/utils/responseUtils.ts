import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { env } from '@/config/env';
// *** CONTROLLERS -> FRONTEND RESPONSE UTILS ***

export const enum ResponseCode {
  OK = 2000,
  CREATED = 2001,
  OK_BUT_EMPTY = 2002,
  INVALID_REQUEST_INPUT = 4000,
  INVALID_QUERY_INPUT = 4001,
  INVALID_ACCOUNT_OR_PASSWORD = 4002,
  LOGIN_CREDENTIALS_REQUIRED = 4003,
  INVALID_PASSWORD = 4009,
  EMAIL_ALREADY_EXISTS = 4004,
  INVALID_RESET_PASSWORD_TOKEN = 4005,
  NO_RESET_PASSWORD_TOKEN_GENERATED = 4006,
  RESET_PASSWORD_TOKEN_EXPIRED = 4007,
  INVALID_ACCESS_TOKEN = 4101,
  INVALID_REFRESH_TOKEN = 4104,
  UNAUTHORIZED_CSRF = 4303,
  NOT_PRIVILEGED_ENOUGH = 4304,
  USER_NOT_FOUND = 4400,
  NO_ACTIVE_MEMBERSHIP_FOUND = 4410,
  SERVER_ERROR = 5000,
  EMAIL_SERVICE_ERROR = 6000,
  DATABASE_ERROR = 7000,
  DATABASE_BAD_REQUEST = 7001,
  DATABASE_UNAVAILABLE = 7002,
  DATABASE_VALIDATION_ERROR = 7003,
  DATABASE_CREATION_CONFLICT = 7004,
  UNKNOWN_ERROR = -9999,
}

enum ClientResponseCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  PRECONDITION_FAILED = 412,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  SERVER_ERROR = 500,
}

const ErrorGroupMap: Record<ResponseCode, ClientResponseCode> = {
  // group by client response codes
  // 200: OK
  [ResponseCode.OK]: ClientResponseCode.OK,
  [ResponseCode.CREATED]: ClientResponseCode.CREATED,
  [ResponseCode.OK_BUT_EMPTY]: ClientResponseCode.OK,
  // 400: BAD_REQUEST
  [ResponseCode.INVALID_REQUEST_INPUT]: ClientResponseCode.BAD_REQUEST,
  [ResponseCode.INVALID_QUERY_INPUT]: ClientResponseCode.BAD_REQUEST,
  [ResponseCode.INVALID_ACCOUNT_OR_PASSWORD]: ClientResponseCode.BAD_REQUEST,
  [ResponseCode.INVALID_PASSWORD]: ClientResponseCode.BAD_REQUEST,
  [ResponseCode.EMAIL_ALREADY_EXISTS]: ClientResponseCode.BAD_REQUEST,
  [ResponseCode.LOGIN_CREDENTIALS_REQUIRED]: ClientResponseCode.BAD_REQUEST,
  [ResponseCode.INVALID_RESET_PASSWORD_TOKEN]: ClientResponseCode.BAD_REQUEST,
  [ResponseCode.NO_RESET_PASSWORD_TOKEN_GENERATED]:
    ClientResponseCode.BAD_REQUEST,
  [ResponseCode.RESET_PASSWORD_TOKEN_EXPIRED]: ClientResponseCode.BAD_REQUEST,
  // 401: UNAUTHORIZED
  [ResponseCode.INVALID_ACCESS_TOKEN]: ClientResponseCode.UNAUTHORIZED,
  [ResponseCode.INVALID_REFRESH_TOKEN]: ClientResponseCode.UNAUTHORIZED,
  // 403: FORBIDDEN
  [ResponseCode.UNAUTHORIZED_CSRF]: ClientResponseCode.FORBIDDEN,
  [ResponseCode.NOT_PRIVILEGED_ENOUGH]: ClientResponseCode.FORBIDDEN,
  // 404: NOT_FOUND
  [ResponseCode.USER_NOT_FOUND]: ClientResponseCode.NOT_FOUND,
  // 409: CONFLICT
  // 422: UNPROCESSABLE_ENTITY
  [ResponseCode.NO_ACTIVE_MEMBERSHIP_FOUND]: ClientResponseCode.NOT_FOUND,
  // 409: CONFLICT
  // 412: PRECONDITION_FAILED
  // 422: UNPROCESSABLE_ENTITY
  // 429: TOO_MANY_REQUESTS
  // 500: SERVER_ERROR
  [ResponseCode.SERVER_ERROR]: ClientResponseCode.SERVER_ERROR,
  [ResponseCode.EMAIL_SERVICE_ERROR]: ClientResponseCode.SERVER_ERROR,
  [ResponseCode.DATABASE_ERROR]: ClientResponseCode.SERVER_ERROR,
  [ResponseCode.DATABASE_BAD_REQUEST]: ClientResponseCode.SERVER_ERROR,
  [ResponseCode.DATABASE_UNAVAILABLE]: ClientResponseCode.SERVER_ERROR,
  [ResponseCode.DATABASE_VALIDATION_ERROR]: ClientResponseCode.SERVER_ERROR,
  [ResponseCode.DATABASE_CREATION_CONFLICT]: ClientResponseCode.SERVER_ERROR,
  // 503: SERVICE_UNAVAILABLE
  // custom
  [ResponseCode.UNKNOWN_ERROR]: ClientResponseCode.SERVER_ERROR,
};

const mapClientResponseCode = (code: ResponseCode): ClientResponseCode => {
  return ErrorGroupMap[code] || ClientResponseCode.SERVER_ERROR;
};

const errMsgMapperImpl = (code: ResponseCode): string => {
  switch (code) {
    case ResponseCode.OK:
      return 'OK';
    case ResponseCode.CREATED:
      return 'Created';
    case ResponseCode.OK_BUT_EMPTY:
      return 'OK but empty';
    case ResponseCode.INVALID_QUERY_INPUT:
      return 'Invalid query input';
    case ResponseCode.NOT_PRIVILEGED_ENOUGH:
      return 'Not privileged enough';

    case ResponseCode.INVALID_ACCOUNT_OR_PASSWORD:
      return 'Invalid account or password';
    case ResponseCode.INVALID_PASSWORD:
      return 'Invalid password';
    case ResponseCode.USER_NOT_FOUND:
      return 'User not found';
    case ResponseCode.EMAIL_ALREADY_EXISTS:
      return 'Email already exists';
    case ResponseCode.EMAIL_SERVICE_ERROR:
      return 'Email service error';
    case ResponseCode.DATABASE_ERROR:
      return 'Database error';
    case ResponseCode.DATABASE_BAD_REQUEST:
      return 'Database bad request';
    case ResponseCode.DATABASE_UNAVAILABLE:
      return 'Database unavailable';
    case ResponseCode.DATABASE_VALIDATION_ERROR:
      return 'Database validation error';
    case ResponseCode.DATABASE_CREATION_CONFLICT:
      return 'Database creation conflict';
    case ResponseCode.LOGIN_CREDENTIALS_REQUIRED:
      return 'Email/username and password are required';
    case ResponseCode.INVALID_REQUEST_INPUT:
      return 'Invalid request input';
    case ResponseCode.INVALID_RESET_PASSWORD_TOKEN:
      return 'Invalid reset password token';
    case ResponseCode.NO_RESET_PASSWORD_TOKEN_GENERATED:
      return 'No reset password token generated';
    case ResponseCode.RESET_PASSWORD_TOKEN_EXPIRED:
      return 'Reset password token expired';
      return 'Invalid clock in and clock out data';
    case ResponseCode.SERVER_ERROR:
      return 'Internal server error';
    case ResponseCode.NO_ACTIVE_MEMBERSHIP_FOUND:
      return 'No active membership found';
    case ResponseCode.UNKNOWN_ERROR:
      return 'Unknown error';
    default:
      return 'Unknown error';
  }
};

/**
 * Extract meaningful error information from various error types
 */
function extractErrorDetails(error: unknown): {
  message: string;
  name?: string;
  details?: any;
  stack?: string;
} {
  // Handle null/undefined
  if (!error) {
    return { message: 'Unknown error occurred' };
  }

  // Handle Error objects
  if (error instanceof Error) {
    const result: any = {
      message: error.message,
      name: error.name,
    };

    // Include stack trace in development
    if (env.isDevelopment && error.stack) {
      result.stack = error.stack;
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError' && 'errors' in error) {
      const validationError = error as any;
      result.details = Object.keys(validationError.errors).reduce(
        (acc: any, key: string) => {
          acc[key] = validationError.errors[key].message;
          return acc;
        },
        {},
      );
    }

    // Handle Mongoose CastError (invalid ObjectId, etc.)
    if (error.name === 'CastError' && 'path' in error && 'value' in error) {
      const castError = error as any;
      result.details = {
        field: castError.path,
        value: castError.value,
        expectedType: castError.kind,
      };
    }

    // Handle MongoDB duplicate key errors
    if ('code' in error && (error as any).code === 11000) {
      const mongoError = error as any;
      result.message = 'Duplicate entry found';
      result.details = mongoError.keyValue;
    }

    return result;
  }

  // Handle plain objects with message property
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: String((error as any).message),
      details: error,
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return { message: error };
  }

  // Handle other types
  return {
    message: 'An error occurred',
    details: error,
  };
}

export function successResponse<T>(
  c: Context,
  rcode: ResponseCode,
  data: T,
): any {
  const response = {
    isOk: true,
    data,
  };

  const statusCode = mapClientResponseCode(rcode);
  return c.json(response, statusCode as ContentfulStatusCode);
}

export function failureResponse(
  c: Context,
  errCode: ResponseCode,
  error?: string | Error | unknown,
): Response {
  const statusCode = mapClientResponseCode(errCode);
  const defaultMessage = errMsgMapperImpl(errCode);

  // Extract error details
  const errorInfo = error ? extractErrorDetails(error) : null;
  const message = errorInfo?.message || defaultMessage;

  // Build response - NO MESSAGE to client for security
  const response: any = {
    isOk: false,
    data: {
      rcode: errCode,
    },
  };

  // Only add debug info in development mode
  if (env.isDevelopment && errorInfo) {
    response.data.debug = {
      message,
    };

    if (errorInfo.details) {
      response.data.debug.details = errorInfo.details;
    }
    if (errorInfo.name) {
      response.data.debug.errorType = errorInfo.name;
    }
    if (errorInfo.stack) {
      response.data.debug.stack = errorInfo.stack;
    }
  }

  // Always log internally for debugging (not sent to client)
  if (env.isDevelopment) {
    console.error('[ResponseUtils] Failure Response:', {
      code: errCode,
      httpStatus: statusCode,
      message,
      error: errorInfo,
    });
  }

  return c.json(response, statusCode as ContentfulStatusCode);
}
