/**
 * @summary
 * Database request utility for executing stored procedures
 *
 * @module utils/database/dbRequest
 */

import sql from 'mssql';
import { getPool } from '@/instances/database';

/**
 * @enum ExpectedReturn
 * @description Expected return type from stored procedure
 */
export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

/**
 * @interface IRecordSet
 * @description Generic record set interface
 */
export interface IRecordSet<T = any> extends Array<T> {}

/**
 * @summary
 * Executes a stored procedure with parameters
 *
 * @function dbRequest
 * @module utils/database
 *
 * @param {string} routine - Stored procedure name
 * @param {object} parameters - Procedure parameters
 * @param {ExpectedReturn} expectedReturn - Expected return type
 * @param {sql.Transaction} [transaction] - Optional transaction
 * @param {string[]} [resultSetNames] - Optional result set names
 *
 * @returns {Promise<any>} Procedure result
 *
 * @throws {Error} When procedure execution fails
 */
export async function dbRequest(
  routine: string,
  parameters: { [key: string]: any },
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  const pool = await getPool();
  const request = transaction ? new sql.Request(transaction) : pool.request();

  /**
   * @remarks Add parameters to request
   */
  for (const [key, value] of Object.entries(parameters)) {
    request.input(key, value);
  }

  /**
   * @remarks Execute stored procedure
   */
  const result = await request.execute(routine);

  /**
   * @remarks Process result based on expected return type
   */
  if (expectedReturn === ExpectedReturn.None) {
    return null;
  }

  if (expectedReturn === ExpectedReturn.Single) {
    return result.recordset;
  }

  if (expectedReturn === ExpectedReturn.Multi) {
    if (resultSetNames && resultSetNames.length > 0) {
      const namedResults: { [key: string]: IRecordSet } = {};
      resultSetNames.forEach((name, index) => {
        namedResults[name] = result.recordsets[index];
      });
      return namedResults;
    }
    return result.recordsets;
  }

  return result.recordset;
}
