import { env } from '../config/env.js';
var ClientResponseCode;
(function (ClientResponseCode) {
  ClientResponseCode[(ClientResponseCode['OK'] = 200)] = 'OK';
  ClientResponseCode[(ClientResponseCode['CREATED'] = 201)] = 'CREATED';
  ClientResponseCode[(ClientResponseCode['BAD_REQUEST'] = 400)] = 'BAD_REQUEST';
  ClientResponseCode[(ClientResponseCode['UNAUTHORIZED'] = 401)] =
    'UNAUTHORIZED';
  ClientResponseCode[(ClientResponseCode['FORBIDDEN'] = 403)] = 'FORBIDDEN';
  ClientResponseCode[(ClientResponseCode['NOT_FOUND'] = 404)] = 'NOT_FOUND';
  ClientResponseCode[(ClientResponseCode['CONFLICT'] = 409)] = 'CONFLICT';
  ClientResponseCode[(ClientResponseCode['PRECONDITION_FAILED'] = 412)] =
    'PRECONDITION_FAILED';
  ClientResponseCode[(ClientResponseCode['UNPROCESSABLE_ENTITY'] = 422)] =
    'UNPROCESSABLE_ENTITY';
  ClientResponseCode[(ClientResponseCode['TOO_MANY_REQUESTS'] = 429)] =
    'TOO_MANY_REQUESTS';
  ClientResponseCode[(ClientResponseCode['SERVER_ERROR'] = 500)] =
    'SERVER_ERROR';
})(ClientResponseCode || (ClientResponseCode = {}));
const ErrorGroupMap = {
  // group by client response codes
  // 200: OK
  [2000 /* ResponseCode.OK */]: ClientResponseCode.OK,
  [2001 /* ResponseCode.CREATED */]: ClientResponseCode.CREATED,
  [2002 /* ResponseCode.OK_BUT_EMPTY */]: ClientResponseCode.OK,
  // 400: BAD_REQUEST
  [4000 /* ResponseCode.INVALID_REQUEST_INPUT */]:
    ClientResponseCode.BAD_REQUEST,
  [4001 /* ResponseCode.INVALID_QUERY_INPUT */]: ClientResponseCode.BAD_REQUEST,
  [4002 /* ResponseCode.INVALID_ACCOUNT_OR_PASSWORD */]:
    ClientResponseCode.BAD_REQUEST,
  [4009 /* ResponseCode.INVALID_PASSWORD */]: ClientResponseCode.BAD_REQUEST,
  [4004 /* ResponseCode.EMAIL_ALREADY_EXISTS */]:
    ClientResponseCode.BAD_REQUEST,
  [4003 /* ResponseCode.LOGIN_CREDENTIALS_REQUIRED */]:
    ClientResponseCode.BAD_REQUEST,
  [4005 /* ResponseCode.INVALID_RESET_PASSWORD_TOKEN */]:
    ClientResponseCode.BAD_REQUEST,
  [4006 /* ResponseCode.NO_RESET_PASSWORD_TOKEN_GENERATED */]:
    ClientResponseCode.BAD_REQUEST,
  [4007 /* ResponseCode.RESET_PASSWORD_TOKEN_EXPIRED */]:
    ClientResponseCode.BAD_REQUEST,
  // 401: UNAUTHORIZED
  [4101 /* ResponseCode.INVALID_ACCESS_TOKEN */]:
    ClientResponseCode.UNAUTHORIZED,
  [4104 /* ResponseCode.INVALID_REFRESH_TOKEN */]:
    ClientResponseCode.UNAUTHORIZED,
  // 403: FORBIDDEN
  [4303 /* ResponseCode.UNAUTHORIZED_CSRF */]: ClientResponseCode.FORBIDDEN,
  [4304 /* ResponseCode.NOT_PRIVILEGED_ENOUGH */]: ClientResponseCode.FORBIDDEN,
  // 404: NOT_FOUND
  [4400 /* ResponseCode.USER_NOT_FOUND */]: ClientResponseCode.NOT_FOUND,
  // 409: CONFLICT
  // 422: UNPROCESSABLE_ENTITY
  [4410 /* ResponseCode.NO_ACTIVE_MEMBERSHIP_FOUND */]:
    ClientResponseCode.NOT_FOUND,
  // 409: CONFLICT
  // 412: PRECONDITION_FAILED
  // 422: UNPROCESSABLE_ENTITY
  // 429: TOO_MANY_REQUESTS
  // 500: SERVER_ERROR
  [5000 /* ResponseCode.SERVER_ERROR */]: ClientResponseCode.SERVER_ERROR,
  [6000 /* ResponseCode.EMAIL_SERVICE_ERROR */]:
    ClientResponseCode.SERVER_ERROR,
  [7000 /* ResponseCode.DATABASE_ERROR */]: ClientResponseCode.SERVER_ERROR,
  [7001 /* ResponseCode.DATABASE_BAD_REQUEST */]:
    ClientResponseCode.SERVER_ERROR,
  [7002 /* ResponseCode.DATABASE_UNAVAILABLE */]:
    ClientResponseCode.SERVER_ERROR,
  [7003 /* ResponseCode.DATABASE_VALIDATION_ERROR */]:
    ClientResponseCode.SERVER_ERROR,
  [7004 /* ResponseCode.DATABASE_CREATION_CONFLICT */]:
    ClientResponseCode.SERVER_ERROR,
  // 503: SERVICE_UNAVAILABLE
  // custom
  [-9999 /* ResponseCode.UNKNOWN_ERROR */]: ClientResponseCode.SERVER_ERROR,
};
const mapClientResponseCode = (code) => {
  return ErrorGroupMap[code] || ClientResponseCode.SERVER_ERROR;
};
const errMsgMapperImpl = (code) => {
  switch (code) {
    case 2000 /* ResponseCode.OK */:
      return 'OK';
    case 2001 /* ResponseCode.CREATED */:
      return 'Created';
    case 2002 /* ResponseCode.OK_BUT_EMPTY */:
      return 'OK but empty';
    case 4001 /* ResponseCode.INVALID_QUERY_INPUT */:
      return 'Invalid query input';
    case 4304 /* ResponseCode.NOT_PRIVILEGED_ENOUGH */:
      return 'Not privileged enough';
    case 4002 /* ResponseCode.INVALID_ACCOUNT_OR_PASSWORD */:
      return 'Invalid account or password';
    case 4009 /* ResponseCode.INVALID_PASSWORD */:
      return 'Invalid password';
    case 4400 /* ResponseCode.USER_NOT_FOUND */:
      return 'User not found';
    case 4004 /* ResponseCode.EMAIL_ALREADY_EXISTS */:
      return 'Email already exists';
    case 6000 /* ResponseCode.EMAIL_SERVICE_ERROR */:
      return 'Email service error';
    case 7000 /* ResponseCode.DATABASE_ERROR */:
      return 'Database error';
    case 7001 /* ResponseCode.DATABASE_BAD_REQUEST */:
      return 'Database bad request';
    case 7002 /* ResponseCode.DATABASE_UNAVAILABLE */:
      return 'Database unavailable';
    case 7003 /* ResponseCode.DATABASE_VALIDATION_ERROR */:
      return 'Database validation error';
    case 7004 /* ResponseCode.DATABASE_CREATION_CONFLICT */:
      return 'Database creation conflict';
    case 4003 /* ResponseCode.LOGIN_CREDENTIALS_REQUIRED */:
      return 'Email/username and password are required';
    case 4000 /* ResponseCode.INVALID_REQUEST_INPUT */:
      return 'Invalid request input';
    case 4005 /* ResponseCode.INVALID_RESET_PASSWORD_TOKEN */:
      return 'Invalid reset password token';
    case 4006 /* ResponseCode.NO_RESET_PASSWORD_TOKEN_GENERATED */:
      return 'No reset password token generated';
    case 4007 /* ResponseCode.RESET_PASSWORD_TOKEN_EXPIRED */:
      return 'Reset password token expired';
      return 'Invalid clock in and clock out data';
    case 5000 /* ResponseCode.SERVER_ERROR */:
      return 'Internal server error';
    case 4410 /* ResponseCode.NO_ACTIVE_MEMBERSHIP_FOUND */:
      return 'No active membership found';
    case -9999 /* ResponseCode.UNKNOWN_ERROR */:
      return 'Unknown error';
    default:
      return 'Unknown error';
  }
};
/**
 * Extract meaningful error information from various error types
 */
function extractErrorDetails(error) {
  // Handle null/undefined
  if (!error) {
    return { message: 'Unknown error occurred' };
  }
  // Handle Error objects
  if (error instanceof Error) {
    const result = {
      message: error.message,
      name: error.name,
    };
    // Include stack trace in development
    if (env.isDevelopment && error.stack) {
      result.stack = error.stack;
    }
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError' && 'errors' in error) {
      const validationError = error;
      result.details = Object.keys(validationError.errors).reduce(
        (acc, key) => {
          acc[key] = validationError.errors[key].message;
          return acc;
        },
        {},
      );
    }
    // Handle Mongoose CastError (invalid ObjectId, etc.)
    if (error.name === 'CastError' && 'path' in error && 'value' in error) {
      const castError = error;
      result.details = {
        field: castError.path,
        value: castError.value,
        expectedType: castError.kind,
      };
    }
    // Handle MongoDB duplicate key errors
    if ('code' in error && error.code === 11000) {
      const mongoError = error;
      result.message = 'Duplicate entry found';
      result.details = mongoError.keyValue;
    }
    return result;
  }
  // Handle plain objects with message property
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: String(error.message),
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
export function successResponse(c, rcode, data) {
  const response = {
    isOk: true,
    data,
  };
  const statusCode = mapClientResponseCode(rcode);
  return c.json(response, statusCode);
}
export function failureResponse(c, errCode, error) {
  const statusCode = mapClientResponseCode(errCode);
  const defaultMessage = errMsgMapperImpl(errCode);
  // Extract error details
  const errorInfo = error ? extractErrorDetails(error) : null;
  const message = errorInfo?.message || defaultMessage;
  // Build response - NO MESSAGE to client for security
  const response = {
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
  return c.json(response, statusCode);
}
