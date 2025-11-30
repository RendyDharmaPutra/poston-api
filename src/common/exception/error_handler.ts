import { Context } from "hono";
import { response } from "../utils/response";
import { HttpError } from "./http_error";
import { ValidationError } from "./validation_error";

/**
 * Handles errors that occur during the processing of a request.
 *
 * @param {Error} err - The error that occurred.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves with the updated Hono context object.
 */
export const errorHandler = async (err: Error, c: Context) => {
  // Validation error
  if (err instanceof ValidationError) {
    return response.validationError(c, err.name, err.details, err.message);
  }

  // Normal error
  if (err instanceof HttpError) {
    return response.error(c, err.name, err.message, err.status);
  }

  // Unknown error
  return response.error(
    c,
    "An error occurred while processing the request",
    "Unknown error",
    500
  );
};
