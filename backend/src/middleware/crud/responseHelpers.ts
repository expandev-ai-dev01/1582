/**
 * @summary
 * Response helper functions
 *
 * @module middleware/crud/responseHelpers
 */

/**
 * @interface SuccessResponse
 * @description Standard success response structure
 */
interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    timestamp: string;
  };
}

/**
 * @interface ErrorResponseStructure
 * @description Standard error response structure
 */
interface ErrorResponseStructure {
  success: false;
  error: {
    message: string;
  };
  timestamp: string;
}

/**
 * @summary
 * Creates a success response
 *
 * @function successResponse
 * @param {T} data - Response data
 *
 * @returns {SuccessResponse<T>}
 */
export function successResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary
 * Creates an error response
 *
 * @function errorResponse
 * @param {string} message - Error message
 *
 * @returns {ErrorResponseStructure}
 */
export function errorResponse(message: string): ErrorResponseStructure {
  return {
    success: false,
    error: {
      message,
    },
    timestamp: new Date().toISOString(),
  };
}
