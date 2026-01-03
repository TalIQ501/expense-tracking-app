import fp from "fastify-plugin";
import cors from "@fastify/cors";
import type { FastifyPluginAsync } from "fastify";

export const corsPlugin: FastifyPluginAsync = async (app) => {
  await app.register(cors, {
    origin: app.config.CLIENT_URL,
  });
};

export default fp(corsPlugin);
