import { type Database } from "better-sqlite3";
import {
  getFoodExpensesByIdQuery,
  getFoodExpensesQuery,
  createFoodExpensesQuery,
  deleteFoodExpensesQuery,
  updateFoodExpensesQuery,
  getDeletedFoodExpensesQuery,
  permaDeleteFoodExpensesQuery,
  getDeletedFoodExpenseByIdQuery,
} from "../../queries/foodExpenseQueries";
import type { FoodType } from "./food";

export const foodRepository = (db: Database) => {
  const findAll = () => {
    return db.prepare(getFoodExpensesQuery).all();
  };

  const findById = (id: number) => {
    return db.prepare(getFoodExpensesByIdQuery).get(id);
  };

  const create = (data: FoodType) => {
    const stmt = db.prepare(createFoodExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      item: data.item,
      amount: data.amount,
      quantity: data.quantity,
      outlet: data.outlet,
      area: data.area,
      address: data.address,
      rating: data.rating,
    });

    return info.lastInsertRowid;
  };

  const remove = (id: number) => {
    return db.prepare(deleteFoodExpensesQuery).run(id);
  };

  const update = (data: FoodType, id: number) => {
    const stmt = db.prepare(updateFoodExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      item: data.item,
      amount: data.amount,
      outlet: data.outlet,
      area: data.area,
      address: data.address,
      category: data.category,
      rating: data.rating,
      id,
    });

    return info.changes;
  };

  const findDelAll = () => {
    return db.prepare(getDeletedFoodExpensesQuery).all();
  };

  const findDelById = (id: number) => {
    return db.prepare(getDeletedFoodExpenseByIdQuery).get(id);
  };

  const permaDelete = (id: number) => {
    const deleted = db.prepare(getDeletedFoodExpenseByIdQuery).get(id);

    if (!deleted)
      throw new Error("Record not deleted before or does not exist");

    return db.prepare(permaDeleteFoodExpensesQuery).run(id);
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

export type foodRepository = ReturnType<typeof foodRepository>;
