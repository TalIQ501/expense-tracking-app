import { type Database } from "better-sqlite3";
import {
  getGeneralExpensesQuery,
  getGeneralExpensesByIdQuery,
  createGeneralExpensesQuery,
  deleteGeneralExpensesQuery,
  updateGeneralExpensesQuery,
  getDeletedGeneralExpensesQuery,
  permaDeleteGeneralExpensesQuery,
  getDeletedGeneralExpenseByIdQuery,
} from "../../queries/generalExpenseQueries";
import type { GeneralExpenseType } from "./general";

export const generalExpenseRepository = (db: Database) => {
  const findAll = () => {
    return db.prepare(getGeneralExpensesQuery).all();
  };

  const findById = (id: number) => {
    return db.prepare(getGeneralExpensesByIdQuery).get(id);
  };

  const create = (data: GeneralExpenseType) => {
    const stmt = db.prepare(createGeneralExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      purpose: data.purpose,
      amount: data.amount,
      description: data.description,
      given_to: data.given_to,
      address: data.address,
      rating: data.rating,
    });

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

  const findDelAll = () => {
    return db.prepare(getDeletedGeneralExpensesQuery).all();
  };

  const findDelById = (id: number) => {
    return db.prepare(getDeletedGeneralExpenseByIdQuery).get(id);
  };

  const permaDelete = (id: number) => {
    const deleted = db.prepare(getDeletedGeneralExpenseByIdQuery).get(id);

    if (!deleted)
      throw new Error("Record not deleted before or does not exist");

    return db.prepare(permaDeleteGeneralExpensesQuery).run(id);
  };

  return {
    findAll,
    findById,
    create,
    remove,
    update,
    findDelAll,
    findDelById,
    permaDelete,
  };
};

export type generalExpenseRepository = ReturnType<
  typeof generalExpenseRepository
>;
