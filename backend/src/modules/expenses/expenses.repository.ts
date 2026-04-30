import { type Database } from "better-sqlite3";
import {
  createExpenseQuery,
  hardDeleteExpenseQuery,
  getDeletedExpenseByIdQuery,
  softDeleteExpenseQuery,
  undoDeleteExpenseQuery,
  expensesColumnsString,
  expensesFromString,
} from "./queries/expense.sql";
import type {
  IExpenseRequestBody,
  ExpenseRequestTypes,
  IRequestBodyExtra,
} from "../../../../shared/types/request";
import { getDetailsQueryMap } from "./expenses.mapper";
import { ExpenseTypes } from "shared/types/expense";
import { buildCreateQuery, buildUpdateQuery } from "./expenses.builder";
import { NotFoundError } from "../../utils/errors";
import { IPageFilters } from "shared/types/queryFilters";

interface TypeIdRes {
  type_id: number;
}

export const expenseRepository = (db: Database) => {
  const selectType = (type_id: number, query: string): ExpenseRequestTypes => {
    const result = db.prepare(query).get({ type_id }) as {
      name: ExpenseRequestTypes;
    };

    return result.name;
  };

  const getTypeById = (id: number) => {
    const typeId = db
      .prepare(
        `
          SELECT type_id FROM expenses WHERE id = @id
        `,
      )
      .get({ id }) as TypeIdRes;

    if (!typeId) throw new NotFoundError("Record not found");

    return typeId;
  };

  const getAll = (
    generatedFilters: {
      conditions: string[];
      params: Record<string, unknown>;
      offset: number;
      sortDesc: boolean;
      sort: string;
    },
    pageFilters: IPageFilters,
  ) => {
    const { conditions, params, offset, sort, sortDesc } = generatedFilters;

    const query = `
      SELECT 
      e.id, e.expense_date, e.amount, e.type_id, e.rating, e.recorded_at, e.last_updated_at, e.deleted_at, 
      c.name as expense_type,
      gen.purpose, gen.description, gen.given_to,
      f.outlet, f.area,
      t.mode, t.origin, t.origin_region, t.destination, t.destination_region, t.service_name,
      COALESCE(gen.address, f.address) as address,
      COALESCE(f.item, gr.item, s.item, clo.item) as item,
      COALESCE(f.quantity, gr.quantity, s.quantity, clo.quantity) as quantity,
      COALESCE(gr.category, s.category, clo.category) as category
      FROM expenses e
      JOIN expense_types c ON e.type_id = c.id
      LEFT JOIN general_expenses gen ON gen.expense_id = e.id
      LEFT JOIN food_expenses f ON f.expense_id = e.id
      LEFT JOIN transport_expenses t ON t.expense_id = e.id
      LEFT JOIN grocery_expenses gr ON gr.expense_id = e.id
      LEFT JOIN stationary_expenses s ON s.expense_id = e.id
      LEFT JOIN clothes_expenses clo ON clo.expense_id = e.id
      WHERE ${conditions.join(" AND ")}
      ORDER BY ${sort} ${sortDesc ? "DESC" : ""}
      LIMIT @pageSize OFFSET @offset
    `;

    const data = db
      .prepare(query)
      .all({ ...params, page_size: pageFilters.page_size ?? 20, offset });

    return data;
  };

  const getById = (id: number, type: ExpenseTypes) => {
    const getDetailsQueries = (type: ExpenseRequestTypes) =>
      getDetailsQueryMap[type];

    const detailsQueries = getDetailsQueries(type);

    const query = `
      SELECT ${expensesColumnsString},
      ${detailsQueries.columns}
      ${expensesFromString}
      ${detailsQueries.join}
      WHERE e.id = @id
    `;

    const expense = db.prepare(query).get({ id });

    if (!expense) {
      throw new NotFoundError("Could not find record");
    }

    return expense;
  };

  const create = (
    expense: IExpenseRequestBody,
    type: ExpenseTypes,
    extraData: IRequestBodyExtra,
  ) => {
    const createQuery = buildCreateQuery(type, extraData);

    const createTransaction = db.transaction(() => {
      const expenseEntry = db.prepare(createExpenseQuery).run(expense);

      db.prepare(createQuery).run({
        expense_id: expenseEntry.lastInsertRowid,
        ...extraData,
      });
    });

    return createTransaction();
  };

  const softDelete = (id: number) => {
    return db.prepare(softDeleteExpenseQuery).run({ id });
  };

  const update = (
    expense_id: number,
    expense: IExpenseRequestBody,
    extraData: IRequestBodyExtra,
    type: ExpenseTypes,
  ) => {
    const { updateDetailsQuery, updateExpenseQuery, isDetailsQuery } =
      buildUpdateQuery(type, expense, extraData);

    const updateTransaction = db.transaction(() => {
      db.prepare(updateExpenseQuery).run({
        expense_id,
        ...expense,
      });

      if (isDetailsQuery && updateDetailsQuery) {
        db.prepare(updateDetailsQuery).run({
          expense_id,
          ...extraData,
        });
      }
    });

    updateTransaction();
  };

  const hardDelete = (id: number) => {
    const deleted = db.prepare(getDeletedExpenseByIdQuery).run({ id });

    if (!deleted)
      throw new Error("Record not deleted before or does not exist");

    return db.prepare(hardDeleteExpenseQuery).run({ id });
  };

  const undoDelete = (id: number) => {
    const deleted = db.prepare(getDeletedExpenseByIdQuery).run({ id });

    if (!deleted)
      throw new Error("Record not deleted before or does not exist");

    return db.prepare(undoDeleteExpenseQuery).run({ id });
  };

  return {
    selectType,
    getTypeById,
    getAll,
    getById,
    create,
    softDelete,
    update,
    hardDelete,
    undoDelete,
  };
};
