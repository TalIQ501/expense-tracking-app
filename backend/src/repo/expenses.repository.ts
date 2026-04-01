import { type Database } from "better-sqlite3";
import type {
  IAllFilters,
  IExpenseFilters,
  IPageFilters,
} from "../../../shared/types/queryFilters";
import {
  createExpenseQuery,
  hardDeleteExpenseQuery,
  getDeletedExpenseByIdQuery,
  getExpenseByIdQuery,
  softDeleteExpenseQuery,
} from "../queries/expenseQueries";
import type { IExpense } from "../../../shared/types/expense";
import {
  allFilterConditionMap,
  createQueryMap,
} from "../config/expenseConditionBuilder";
import { logger } from "../plugins/loggerPlugin";
import { isError } from "../utils/isError";
import type {
  IExpenseRequestBody,
  ExpenseRequestTypes,
} from "../../../shared/types/request";
import { parseExpenseMap } from "../config/parseExpenseData";

export const expenseRepository = (db: Database) => {
  const buildFilters = (
    filters?: IAllFilters,
    pageFilters?: IPageFilters,
    conditionMap: typeof allFilterConditionMap = allFilterConditionMap,
  ) => {
    const orderByMap = {
      sort_date: "e.expense_date",
      sort_type: "expense_type",
    } as const;

    type sortType = (typeof orderByMap)[keyof typeof orderByMap];
    let sortDesc: boolean = true;

    const conditions: string[] = [];
    let sort: sortType = "e.expense_date";
    const params: Record<string, unknown> = {};

    if (filters?.deleted) {
      conditions.push("e.deleted_at IS NOT NULL");
    } else {
      conditions.push("e.deleted_at IS NULL");
    }

    Object.entries(filters ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === null || key === "deleted") return;

      sortDesc = filters?.sort_desc ? true : false;

      const condition = conditionMap[key as keyof typeof allFilterConditionMap];
      if (!condition) return;

      conditions.push(condition);
      params[key] = value;
    });

    const offset =
      ((pageFilters?.page ?? 1) - 1) * (pageFilters?.pageSize ?? 20);

    return { conditions, params, offset, sort, sortDesc };
  };

  const selectTable = (type_id: number): ExpenseRequestTypes => {
    const query = `
      SELECT name 
      FROM expense_types
      WHERE id = @type_id
    `;

    const result = db.prepare(query).get({ type_id }) as {
      name: ExpenseRequestTypes;
    };

    return result.name;
  };

  const getAll = (filters?: IExpenseFilters, pageFilters?: IPageFilters) => {
    try {
      const { conditions, params, offset, sort, sortDesc } = buildFilters(
        filters,
        pageFilters,
      );

      const getAllQuery = `
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
        .prepare(getAllQuery)
        .all({ ...params, pageSize: pageFilters?.pageSize ?? 20, offset });

      return data;
    } catch (ex: unknown) {
      if (isError(ex)) {
        logger.error(ex.message);
      }

      logger.error("Server Error");
    }

    return;
  };

  const getById = (id: number) => {
    return db.prepare(getExpenseByIdQuery).get({ id });
  };

  const create = (
    expense: IExpenseRequestBody,
    extraData: Record<string, unknown>,
  ) => {
    const typeId = Number(expense.type_id);

    const type = selectTable(typeId);

    const getCreateQuery = (type: ExpenseRequestTypes) => createQueryMap[type];

    const createTransaction = db.transaction(
      (expense: IExpenseRequestBody, extraData: Record<string, unknown>) => {
        const expenseEntry = db.prepare(createExpenseQuery).run(expense);

        const createQuery = getCreateQuery(type);

        const parseFn = parseExpenseMap[type];
        const parsedData = parseFn(extraData);

        db.prepare(createQuery).run({
          expense_id: expenseEntry.lastInsertRowid,
          ...parsedData,
        });
      },
    );

    return createTransaction(expense, extraData);
  };

  const remove = (id: number) => {
    return db.prepare(softDeleteExpenseQuery).run({ id });
  };

  const update = (expense: IExpense) => {};

  const hardDelete = (id: number) => {
    const deleted = db.prepare(getDeletedExpenseByIdQuery).run({ id });

    if (!deleted)
      throw new Error("Record not deleted before or does not exist");

    return db.prepare(hardDeleteExpenseQuery).run({ id });
  };

  return { getAll, getById, create, remove, update, hardDelete };
};
