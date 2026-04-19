import fp from "fastify-plugin";
import { type FastifyInstance } from "fastify";
import { NotFoundError, ValidationError } from "../utils/errors";
import { logger } from "./loggerPlugin";
import { isError } from "../utils/isError";

const errorHandlerPlugin = fp((app: FastifyInstance) => {
  app.setErrorHandler((error, req, reply) => {
    if (isError(error)) {
      if (error instanceof NotFoundError) {
        logger.error(error.message);
        return reply.code(404).send({ message: error.message });
      }

      if (error instanceof ValidationError) {
        logger.error(error.message);
        return reply.code(400).send({ message: error.message });
      }

      logger.error(error.message);
      return reply.code(500).send({ message: error.message });
    }
    return reply.code(500).send("Something went wrong.");
  });
});

export default errorHandlerPlugin;
