import { type Database } from "better-sqlite3";
import {
  getClothesExpensesQuery,
  getClothesExpensesByIdQuery,
  createClothesExpensesQuery,
  updateClothesExpensesQuery,
  deleteClothesExpensesQuery,
  getDeletedClothesExpensesQuery,
  permaDeleteClothesExpensesQuery,
  getDeletedClothesExpenseByIdQuery,
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

  const findDelAll = () => {
    return db.prepare(getDeletedClothesExpensesQuery).all();
  };

  const findDelById = (id: number) => {
    return db.prepare(getDeletedClothesExpenseByIdQuery).get(id);
  };

  const permaDelete = (id: number) => {
    const deleted = db.prepare(getDeletedClothesExpenseByIdQuery).get(id);

    if (!deleted)
      throw new Error("Record not deleted before or does not exist");

    return db.prepare(permaDeleteClothesExpensesQuery).run(id);
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

export type clothesRepository = ReturnType<typeof clothesRepository>;
