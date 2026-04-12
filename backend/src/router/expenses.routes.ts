import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { expenseRepository } from "../repo/expenses.repository";
import { isError } from "../utils/isError";
import { logger } from "../plugins/loggerPlugin";
import type {
  IExpenseFilters,
  IPageFilters,
} from "../../../shared/types/queryFilters";
import type {
  IExpenseRequestBody,
  IRequestBody,
  IRequestBodyExtra,
} from "../../../shared/types/request";
import { parseExpenseMap } from "../config/parseExpenseData";

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
        req.body as IRequestBody;

      const parseFn = parseExpenseMap["expense"];

      const expenseData: IExpenseRequestBody = parseFn({
        expense_date,
        amount,
        type_id,
        rating,
      });

      const id = repo.create(expenseData, extraData as IRequestBodyExtra);

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
  });

  app.patch("/:id", async (req, reply) => {
    try {
      const { id: patchId } = req.params as { id: string };

      const {
        expense_date,
        amount,
        type_id,
        rating,
        ...extraData
      } = req.body as IRequestBody;

      const parseFn = parseExpenseMap["expense"];

      const expenseId = Number(patchId);

      const expenseData: IExpenseRequestBody = parseFn({
        expense_date,
        amount,
        type_id,
        rating,
      });

      const id = repo.update(
        expenseId,
        expenseData,
        extraData as IRequestBodyExtra,
      );

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
};
