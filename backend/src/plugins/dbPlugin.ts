import fp from "fastify-plugin";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { type FastifyPluginAsync } from "fastify";
import { initTablesQuery } from "../queries/initTablesQueries";

export const dbPlugin: FastifyPluginAsync = async (app) => {
  const dbPath = path.resolve("./data/data.sqlite");
  const dir = path.dirname(dbPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database("./data/data.sqlite", { verbose: console.log });

  app.decorate("db", db);
  app.decorate("dbReady", true);

  db.exec(initTablesQuery);

  app.addHook("onClose", async () => {
    db.close();
  });
};

export default fp(dbPlugin);
