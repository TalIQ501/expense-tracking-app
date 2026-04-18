import type { FastifyPluginAsync } from "fastify";
import { expenseRouter } from "../modules/expenses/expenses.routes";

export const apiPlugin: FastifyPluginAsync = async (app) => {
  await app.register(expenseRouter, { prefix: "/expenses" });
};
