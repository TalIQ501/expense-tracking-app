import { type Database } from "better-sqlite3";
import {
  getGroceryExpensesQuery,
  getGroceryExpensesByIdQuery,
  createGroceryExpensesQuery,
  deleteGroceryExpensesQuery,
  updateGroceryExpensesQuery,
} from "../../queries/groceryExpenseQueries";
import type { GroceryType } from "./grocery";

export const groceryRepository = (db: Database) => {
  const findAll = () => {
    return db.prepare(getGroceryExpensesQuery).all();
  };

  const findById = (id: number) => {
    return db.prepare(getGroceryExpensesByIdQuery).get(id);
  };

  const create = (data: GroceryType) => {
    const stmt = db.prepare(createGroceryExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      item: data.item,
      amount: data.amount,
      quantity: data.quantity,
      category: data.category,
      brand: data.brand,
      store: data.store,
      address: data.address,
      rating: data.rating,
    });

    return info.lastInsertRowid;
  };

  const remove = (id: number) => {
    return db.prepare(deleteGroceryExpensesQuery).run(id);
  };

  const update = (data: GroceryType, id: number) => {
    const stmt = db.prepare(updateGroceryExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      item: data.item,
      amount: data.amount,
      quantity: data.quantity,
      category: data.category,
      brand: data.brand,
      store: data.store,
      address: data.address,
      rating: data.rating,
      id,
    });

    return info.changes;
  };

  return { findAll, findById, create, remove, update };
};

export type groceryRepository = ReturnType<typeof groceryRepository>;
