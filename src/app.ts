/**
 * This module is the entry point of the application. It creates a Hono application
 * instance and sets up the error handling middleware. It also defines a route for
 * the root path ("/") that returns a success response with the message "Hello Hono!".
 *
 * @module app
 */

import { Hono } from "hono";
import { errorHandler } from "./common/exception/error_handler";
import { response } from "./common/utils/response";
import { postModule } from "./modules/post/post.route";

/**
 * The Hono application instance.
 *
 * @constant
 * @type {Hono}
 */
export const app = new Hono().basePath("/api");

/**
 * Sets up the error handling middleware for the application.
 */
app.onError(errorHandler);

/**
 * Defines a route for the root path ("/") that returns a success response with the
 * message "Hello Hono!".
 *
 * @name GET /
 * @function
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves with the updated Hono context object.
 */
app.get("/", (c) => {
  return response.success(c, "Hello Hono!");
});

/**
 * Defines a route for the "/posts" path. This route is a group of routes related to
 * managing posts.
 *
 * @name /posts
 * @function
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves with the updated Hono context object.
 */
app.route("/posts", postModule);
