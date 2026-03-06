import { type Database } from "better-sqlite3";
import {
  getStationaryExpensesQuery,
  getStationaryExpensesByIdQuery,
  createStationaryExpensesQuery,
  deleteStationaryExpensesQuery,
  updateStationaryExpensesQuery,
  getDeletedStationaryExpensesQuery,
  permaDeleteStationaryExpensesQuery,
  getDeletedStationaryExpenseByIdQuery,
} from "../../queries/stationaryExpenseQueries";
import type { StationaryType } from "./stationary";

export const stationaryRepository = (db: Database) => {
  const findAll = () => {
    return db.prepare(getStationaryExpensesQuery).all();
  };

  const findById = (id: number) => {
    return db.prepare(getStationaryExpensesByIdQuery).get(id);
  };

  const create = (data: StationaryType) => {
    const stmt = db.prepare(createStationaryExpensesQuery);

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
    return db.prepare(deleteStationaryExpensesQuery).run(id);
  };

  const update = (data: StationaryType, id: number) => {
    const stmt = db.prepare(updateStationaryExpensesQuery);

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
    return db.prepare(getDeletedStationaryExpensesQuery).all();
  };

  const findDelById = (id: number) => {
    return db.prepare(getDeletedStationaryExpenseByIdQuery).get(id);
  };

  const permaDelete = (id: number) => {
    const deleted = db.prepare(getDeletedStationaryExpenseByIdQuery).get(id);

    if (!deleted)
      throw new Error("Record not deleted before or does not exist");

    return db.prepare(permaDeleteStationaryExpensesQuery).run(id);
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

export type stationaryRepository = ReturnType<typeof stationaryRepository>;
