import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { stationaryRepository } from "./stationary.repository";
import { stationaryService } from "./stationary.service";
import { isError } from "../../utils/isError";
import type { StationaryType } from "./stationary";

export const stationaryRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  if (!app.db) {
    throw new Error("Database not initialised");
  }

  const repo = stationaryRepository(app.db);

  const service = stationaryService(repo);

  app.get("/", async () => {
    return service.getAll();
  });

  app.get("/:id", async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      return service.getById(Number(id));
    } catch (err: unknown) {
      if (isError(err)) {
        reply.code(404).send({ message: err.message });
      }

      console.error(err);
      return;
    }
  });

  app.post<{
    Body: StationaryType;
  }>("/", async (req, reply) => {
    try {
      const id = service.create(req.body);
      return { id };
    } catch (err: unknown) {
      if (isError(err)) {
        reply.code(400).send({ message: err.message });
      }

      return;
    }
  });

  app.put<{
    Body: StationaryType;
  }>("/:id", async (req, reply) => {
    try {
      const id = service.create(req.body);
      service.update(Number(id), req.body);
      return { success: true };
    } catch (err) {
      if (isError(err)) {
        reply.code(404).send({ message: err.message });
      }

      return;
    }
  });

  app.delete("/:id", async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      service.remove(Number(id));
      return { success: true };
    } catch (err) {
      if (isError(err)) {
        reply.code(404).send({ message: err.message });
      }

      return;
    }
  });
};
