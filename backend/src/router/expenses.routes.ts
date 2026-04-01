import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { expenseRepository } from "../repo/expenses.repository";
import { isError } from "../utils/isError";
import { logger } from "../plugins/loggerPlugin";
import type {
  IExpenseFilters,
  IPageFilters,
} from "../../../shared/types/queryFilters";
import type { IExpenseRequestBody } from "../../../shared/types/request";

export const expenseRouter: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  if (!app.db) {
    throw new Error("Database not initialised");
  }

  const repo = expenseRepository(app.db);

  app.get("/", async (req, reply) => {
    try {
      const { page, pageSize, deleted, ...filters } =
        req.query as IExpenseFilters & IPageFilters;

      return repo.getAll(filters, { page, pageSize });
    } catch (ex: unknown) {
      if (isError(ex)) {
        logger.info("Error Message Router");
        logger.error({ error: ex.message });
        return reply.code(400).send({ message: ex.message });
      }

      console.error({ message: "Error in fetching" });
      return reply.code(500).send({ message: "Error in fetching" });
    }
  });

  app.get("/:id", async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      return repo.getById(Number(id));
    } catch (ex) {
      if (isError(ex)) {
        logger.error(ex.message);
        return reply.code(404).send({ message: ex.message });
      }
      logger.error(ex);
      return reply.code(500).send({ message: "Server Error" });
    }
  });

  app.post("/", async (req, reply) => {
    try {
      const { expense_date, amount, type_id, rating, ...extraData } =
        req.body as IExpenseRequestBody;

      const expenseData: IExpenseRequestBody = {
        expense_date,
        amount: Number(amount),
        type_id: Number(type_id),
        ...(rating !== undefined && { rating: Number(rating) }),
      };

      const id = repo.create(expenseData, extraData);

      return { id };
    } catch (ex) {
      if (isError(ex)) {
        logger.error(ex.message);
        return reply.code(400).send({ message: ex.message });
      }
      logger.error("Server Error");
      logger.error(ex);
      return reply.code(500).send({ message: "Server Error" });
    }
  });

  app.delete("/:id", async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      return repo.softDelete(Number(id));
    } catch (ex) {
      if (isError(ex)) {
        logger.error(ex.message);
        return reply.code(404).send({ message: ex.message });
      }
      logger.error(ex);
      return reply.code(500).send({ message: "Server Error" });
    }
  })
};
