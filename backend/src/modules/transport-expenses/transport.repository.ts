import { type Database } from "better-sqlite3";
import {
  getTransportExpensesQuery,
  getTransportExpensesByIdQuery,
  createTransportExpensesQuery,
  deleteTransportExpensesQuery,
  updateTransportExpensesQuery,
} from "../../queries/transportExpenseQueries";
import type { TransportType } from "./transport";

export const transportRepository = (db: Database) => {
  const findAll = () => {
    return db.prepare(getTransportExpensesQuery).all();
  };

  const findById = (id: number) => {
    return db.prepare(getTransportExpensesByIdQuery).get(id);
  };

  const create = (data: TransportType) => {
    const stmt = db.prepare(createTransportExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      mode: data.mode,
      amount: data.amount,
      origin: data.origin,
      origin_region: data.origin_region,
      destination: data.destination,
      destination_region: data.destination_region,
      service_name: data.service_name,
      rating: data.rating,
    });

    return info.lastInsertRowid;
  };

  const remove = (id: number) => {
    return db.prepare(deleteTransportExpensesQuery).run(id);
  };

  const update = (data: TransportType, id: number) => {
    const stmt = db.prepare(updateTransportExpensesQuery);

    const info = stmt.run({
      expense_date: data.expense_date,
      mode: data.mode,
      amount: data.amount,
      origin: data.origin,
      origin_region: data.origin_region,
      destination: data.destination,
      destination_region: data.destination_region,
      service_name: data.service_name,
      rating: data.rating,
      id,
    });

    return info.changes;
  };

  return { findAll, findById, create, remove, update };
};

export type transportRepository = ReturnType<typeof transportRepository>;
