import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { summaryRepository } from "./summary.repository";
import { summaryService } from "./summary.service";

export const summaryRoutes: FastifyPluginAsync = async (
  app: FastifyInstance
) => {
  if (!app.db) {
    throw new Error("Database not initialised");
  }

  const repo = summaryRepository(app.db);

  const service = summaryService(repo);

  app.get("/", async () => {
    return service.getSum();
  });
};
