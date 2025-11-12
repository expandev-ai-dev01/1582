/**
 * @summary
 * Zod validation helper functions
 *
 * @module utils/zodValidation/zodHelpers
 */

import { z } from 'zod';

/**
 * @summary BIT field validation (0 or 1)
 */
export const zBit = z.coerce.number().int().min(0).max(1);

/**
 * @summary Date string validation
 */
export const zDateString = z.string().datetime();

/**
 * @summary Foreign key validation (positive integer)
 */
export const zFK = z.coerce.number().int().positive();

/**
 * @summary Name field validation (1-100 characters)
 */
export const zName = z.string().min(1).max(100);

/**
 * @summary Nullable description field (max 500 characters)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Nullable foreign key
 */
export const zNullableFK = z.coerce.number().int().positive().nullable();

/**
 * @summary Nullable string with optional max length
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary String with optional max length
 */
export const zString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema;
};
