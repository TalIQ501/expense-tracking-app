import { type Database } from "better-sqlite3";
import {
  getGeneralExpensesQuery,
  getGeneralExpensesByIdQuery,
  createGeneralExpensesQuery,
  deleteGeneralExpensesQuery,
  updateGeneralExpensesQuery,
} from "../../queries/generalExpenseQueries";
import type { GeneralExpenseType } from "./general";
import { logger } from "../../plugins/loggerPlugin";

export const generalExpenseRepository = (db: Database) => {
  const findAll = () => {
    return db.prepare(getGeneralExpensesQuery).all();
  };

  const findById = (id: number) => {
    return db.prepare(getGeneralExpensesByIdQuery).get(id);
  };

  const create = (data: GeneralExpenseType) => {
    const stmt = db.prepare(createGeneralExpensesQuery);

    logger.info("Type");
    logger.info(typeof data);

    const info = stmt.run({
      expense_date: data.expense_date,
      purpose: data.purpose,
      amount: data.amount,
      description: data.description,
      given_to: data.given_to,
      address: data.address,
      rating: data.rating,
    });

    logger.info("Info");
    logger.info(info);

    return info.lastInsertRowid;
  };

  const remove = (id: number) => {
    return db.prepare(deleteGeneralExpensesQuery).run(id);
  };

  const update = (data: GeneralExpenseType, id: number) => {
    const stmt = db.prepare(updateGeneralExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      purpose: data.purpose,
      amount: data.amount,
      description: data.description,
      given_to: data.given_to,
      address: data.address,
      rating: data.rating,
      id,
    });

    return info.changes;
  };

  return { findAll, findById, create, remove, update };
};

export type generalExpenseRepository = ReturnType<
  typeof generalExpenseRepository
>;
