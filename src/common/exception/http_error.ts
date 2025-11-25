import { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * Represents an HTTP error.
 *
 * @class HttpError
 * @extends Error
 */
export class HttpError extends Error {
  /**
   * The HTTP status code of the error.
   *
   * @type {ContentfulStatusCode}
   */
  status: ContentfulStatusCode;

  /**
   * Creates an instance of HttpError.
   *
   * @constructor
   * @param {string} name - The name of the error.
   * @param {string} [message="Terjadi kesalahan tidak diketahui"] - The error message.
   * @param {ContentfulStatusCode} [status=500] - The HTTP status code.
   */
  constructor(
    name: string,
    message = "Terjadi kesalahan tidak diketahui",
    status: ContentfulStatusCode = 500
  ) {
    super(message);
    this.status = status;
    this.name = name;
  }
}
