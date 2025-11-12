/**
 * @summary
 * Standard error definitions
 *
 * @module middleware/crud/statusErrors
 */

/**
 * @summary General server error
 */
export const StatusGeneralError = {
  statusCode: 500,
  code: 'INTERNAL_SERVER_ERROR',
  message: 'An unexpected error occurred',
};
