import { type Database } from "better-sqlite3";
import {
  getClothesExpensesQuery,
  getClothesExpensesByIdQuery,
  createClothesExpensesQuery,
  updateClothesExpensesQuery,
  deleteClothesExpensesQuery,
} from "../../queries/clothesExpenseQueries";
import type { ClothesType } from "./clothes";

export const clothesRepository = (db: Database) => {
  const findAll = () => {
    return db.prepare(getClothesExpensesQuery).all();
  };

  const findById = (id: number) => {
    return db.prepare(getClothesExpensesByIdQuery).get(id);
  };

  const create = (data: ClothesType) => {
    const stmt = db.prepare(createClothesExpensesQuery);

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
    return db.prepare(deleteClothesExpensesQuery).run(id);
  };

  const update = (data: ClothesType, id: number) => {
    const stmt = db.prepare(updateClothesExpensesQuery);

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

export type clothesRepository = ReturnType<typeof clothesRepository>;
