import type { FastifyPluginAsync } from "fastify";
import { expenseRouter } from "../router/expenses.routes";

export const apiPlugin: FastifyPluginAsync = async (app) => {
  await app.register(expenseRouter, { prefix: "/expenses" });
};
