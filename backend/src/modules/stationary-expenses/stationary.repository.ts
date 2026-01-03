import { type Database } from "better-sqlite3";
import {
  getStationaryExpensesQuery,
  getStationaryExpensesByIdQuery,
  createStationaryExpensesQuery,
  deleteStationaryExpensesQuery,
  updateStationaryExpensesQuery,
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

  return { findAll, findById, create, remove, update };
};

export type stationaryRepository = ReturnType<typeof stationaryRepository>;
