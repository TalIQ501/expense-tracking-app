import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import type { IAllFilters } from "../../../../shared/types/queryFilters";
import type { IRequestBody } from "../../../../shared/types/request";
import { expenseService } from "./expenses.service";
import { DatabaseError, ValidationError } from "../../utils/errors";

export const expenseRouter: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  if (!app.db) {
    throw new DatabaseError("Database not initialised");
  }

  const service = expenseService(app.db);

  app.get("/", async (req, reply) => {
    const body = req.query as IAllFilters;
    return service.getAll(body);
  });

  app.get("/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    return service.getById(id);
  });

  app.post("/", async (req, reply) => {
    const body = req.body as IRequestBody;
    const id = service.create(body);
    return { id };
  });

  app.delete("/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    return service.softDelete(Number(id));
  });

  app.patch("/:id", async (req, reply) => {
    const { id: patchId } = req.params as { id: string };

    const body = req.body as IRequestBody;

    const id = service.update(patchId, body);

    return { id };
  });

  app.patch("/undo/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    return service.undoDelete(Number(id));
  });
};
