import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * This module provides utility functions for creating HTTP responses.
 *
 * @module response
 */

export const response = {
  /**
   * Send a success response with an optional data payload.
   *
   * @function success
   * @param {Context} c - The Hono context object.
   * @param {string} message - The success message.
   * @param {T} [data] - Optional data payload.
   * @param {ContentfulStatusCode} [status=200] - The HTTP status code.
   * @returns {Promise<void>} A promise that resolves with the updated Hono context object.
   */
  success<T>(
    c: Context,
    message: string,
    data?: T,
    status: ContentfulStatusCode = 200
  ) {
    // Without data
    if (data === undefined) {
      return c.json({ success: true, message }, status);
    }

    // With data
    return c.json(
      {
        success: true,
        message,
        data,
      },
      status
    );
  },

  /**
   * Send an error response.
   *
   * @function error
   * @param {Context} c - The Hono context object.
   * @param {string} message - The error message.
   * @param {string} [error="Terjadi kesalahan tidak diketahui"] - The error description.
   * @param {ContentfulStatusCode} [status=500] - The HTTP status code.
   * @returns {Promise<void>} A promise that resolves with the updated Hono context object.
   */
  error(
    c: Context,
    message: string,
    error = "Terjadi kesalahan tidak diketahui",
    status: ContentfulStatusCode = 500
  ) {
    return c.json(
      {
        success: false,
        message,
        error,
      },
      status
    );
  },

  /**
   * Send a validation error response.
   *
   * @function validationError
   * @param {Context} c - The Hono context object.
   * @param {string} message - The validation error message.
   * @param {T} details - The validation error details.
   * @param {string} [error="Terjadi kesalahan pada validasi data"] - The validation error description.
   * @returns {Promise<void>} A promise that resolves with the updated Hono context object.
   */
  validationError<T>(
    c: Context,
    message: string,
    details: T,
    error = "Terjadi kesalahan pada validasi data"
  ) {
    return c.json(
      {
        success: false,
        message,
        error,
        details,
      },
      422
    );
  },
};
