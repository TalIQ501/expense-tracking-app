import Fastify from "fastify";
import dbPlugin from "./plugins/dbPlugin";
import envPlugin from "./plugins/envPlugin";
import { apiPlugin } from "./plugins/apiPlugin";
import corsPlugin from "./plugins/corsPlugin";
import errorHandlerPlugin from "./plugins/errorHandlerPlugin";

export const buildApp = async () => {
  const app = Fastify({
    logger: true,
  });

  await app.register(envPlugin);
  await app.register(dbPlugin);
  await app.register(corsPlugin);

  await app.register(errorHandlerPlugin);
  await app.register(apiPlugin, { prefix: "/api" });

  return app;
};
