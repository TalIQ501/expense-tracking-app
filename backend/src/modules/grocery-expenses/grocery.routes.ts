import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { groceryRepository } from "./grocery.repository";
import { groceryService } from "./grocery.service";
import { isError } from "../../utils/isError";
import type { GroceryType } from "./grocery";

export const groceryRoutes: FastifyPluginAsync = async (
  app: FastifyInstance
) => {
  if (!app.db) {
    throw new Error("Database not initialised");
  }

  const repo = groceryRepository(app.db);

  const service = groceryService(repo);

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
    Body: GroceryType;
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
    Body: GroceryType;
  }>("/grocery/:id", async (req, reply) => {
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
