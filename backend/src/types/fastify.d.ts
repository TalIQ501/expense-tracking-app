import "fastify";
import type { Database } from "better-sqlite3";
import type { EnvConfig } from "../plugins/envPlugin";

declare module "fastify" {
  interface FastifyInstance {
    db: Database | null;
    dbReady: boolean;
    config: EnvConfig;
  }
}
