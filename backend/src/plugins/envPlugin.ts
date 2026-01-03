import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { type FastifyPluginAsync } from "fastify";

export interface EnvConfig {
  PORT: number;
  CLIENT_URL: string;
}

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
    },
    CLIENT_URL: {
      type: "string",
    },
  },
} as const;

export const envPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyEnv, {
    dotenv: true,
    schema,
  });
};

export default fp(envPlugin);

declare module "fastify" {
  interface FastifyInstance {
    config: EnvConfig;
  }
}
