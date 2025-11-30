/**
 * Represents a validation error.
 *
 * @class ValidationError
 * @extends Error
 * @template T - The type of the validation error details.
 */
export class ValidationError<T> extends Error {
  /**
   * The details of the validation error.
   * @type {T}
   */
  details: T;

  /**
   * Creates an instance of ValidationError.
   * @param {string} name - The name of the validation error.
   * @param {T} details - The details of the validation error.
   * @param {string} [message="Terjadi kesalahan pada validasi data"] - The validation error message.
   */
  constructor(
    name: string,
    details: T,
    message = "Terjadi kesalahan pada validasi data"
  ) {
    super(message);
    this.name = name;
    this.details = details;
  }
}
