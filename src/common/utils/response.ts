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
   * Send a success response with data list and meta information (pagination, etc.)
   *
   * @function successWithMeta
   */
  successWithMeta<T>(
    c: Context,
    message: string,
    data: T[],
    meta: Record<string, any>,
    status: ContentfulStatusCode = 200
  ) {
    return c.json(
      {
        success: true,
        message,
        data,
        meta,
      },
      status
    );
  },

  /**
   * Send an error response.
   *
   * @function error
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
