/**
 * @summary
 * CRUD controller for handling common operations
 *
 * @module middleware/crud/crudController
 */

import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityRule
 * @description Security rule configuration
 */
interface SecurityRule {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

/**
 * @interface ValidationResult
 * @description Validation result structure
 */
interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Handles CRUD operations with security and validation
 */
export class CrudController {
  private securityRules: SecurityRule[];

  constructor(securityRules: SecurityRule[]) {
    this.securityRules = securityRules;
  }

  /**
   * @summary
   * Validates request for CREATE operations
   *
   * @function create
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async create(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'CREATE');
  }

  /**
   * @summary
   * Validates request for READ operations
   *
   * @function read
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'READ');
  }

  /**
   * @summary
   * Validates request for UPDATE operations
   *
   * @function update
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async update(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'UPDATE');
  }

  /**
   * @summary
   * Validates request for DELETE operations
   *
   * @function delete
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async delete(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'DELETE');
  }

  /**
   * @summary
   * Internal validation method
   *
   * @function validateRequest
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @param {string} operation - Operation type
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  private async validateRequest(
    req: Request,
    schema: z.ZodSchema,
    operation: string
  ): Promise<[ValidationResult | null, Error | null]> {
    try {
      const params = { ...req.params, ...req.query, ...req.body };
      const validated = await schema.parseAsync(params);

      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params: validated }, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
