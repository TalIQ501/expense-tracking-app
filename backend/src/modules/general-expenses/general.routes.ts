import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { generalExpenseRepository } from "./general.repository";
import { generalExpenseService } from "./general.service";
import { isError } from "../../utils/isError";
import type { GeneralExpenseType } from "./general";

export const generalRoutes: FastifyPluginAsync = async (
  app: FastifyInstance
) => {
  if (!app.db) {
    throw new Error("Database not initialised");
  }

  const repo = generalExpenseRepository(app.db);

  const service = generalExpenseService(repo);

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
    Body: GeneralExpenseType;
  }>("/", async (req, reply) => {
    app.log.info("Start API");
    try {
      const id = service.create(req.body);
      return { id };
    } catch (err: unknown) {
      if (isError(err)) {
        reply.code(400).send({ message: err.message });
        return;
      }
      reply.code(500).send({ message: 'Unknown error' });
      return;
    }
  });

  app.put<{
    Body: GeneralExpenseType;
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
