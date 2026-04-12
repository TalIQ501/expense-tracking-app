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
  softDeleteExpenseQuery,
  expensesColumnsString,
  expensesFromString,
  typeNameQuery,
  undoDeleteExpenseQuery,
} from "../queries/expenseQueries";
import type { ExpenseTypes } from "../../../shared/types/expense";
import {
  allFilterConditionMap,
  getDetailsQueryMap,
  queryParamsMap,
} from "../config/expenseConditionBuilder";
import { logger } from "../plugins/loggerPlugin";
import { isError } from "../utils/isError";
import type {
  IExpenseRequestBody,
  ExpenseRequestTypes,
  IRequestBodyExtra,
} from "../../../shared/types/request";
import { parseExpenseMap } from "../config/parseExpenseData";

interface TypeIdRes {
  type_id: number;
}

export const expenseRepository = (db: Database) => {
  const getTypeById = (id: number) => {
    const typeIdRaw = db
      .prepare(
        `
          SELECT type_id FROM expenses WHERE id = @id
          `,
      )
      .get({ id }) as TypeIdRes;

    const typeId = Number(typeIdRaw.type_id);

    const type = selectType(typeId);

    return type;
  };

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

  const selectType = (type_id: number): ExpenseRequestTypes => {
    const query = typeNameQuery;

    const result = db.prepare(query).get({ type_id }) as {
      name: ExpenseRequestTypes;
    };

    return result.name;
  };

  const buildCreateQuery = (
    type: ExpenseRequestTypes,
    data: IRequestBodyExtra,
  ) => {
    const columns: string[] = [];
    const params: string[] = [];

    const map = queryParamsMap[type];

    Object.entries(data ?? {}).forEach(([key, value]) => {
      const obj = (map as Record<string, { column: string; param: string }>)[
        key
      ];

      if (!obj) return;

      columns.push(obj.column);
      params.push(obj.param);
    });

    const query = `
    INSERT INTO ${type}_expenses
    (expense_id ${columns ? ", " + columns.join(", ") : ""})
    VALUES
    (@expense_id ${params ? ", " + params.join(", ") : ""})
    `;

    return query;
  };

  const buildUpdateQuery = (
    type: ExpenseTypes,
    expenseData: IExpenseRequestBody,
    extraData?: IRequestBodyExtra,
  ) => {
    const expenseMap = queryParamsMap["expenses"];
    const extraMap = queryParamsMap[type];

    const generateStatements = (
      data: IExpenseRequestBody | IRequestBodyExtra,
      currentMap: Record<string, { column: string; param: string }>,
    ) => {
      const statements: string[] = [];

      Object.entries(data ?? {}).forEach(([key, value]) => {
        if (value === null || value === undefined || Number.isNaN(value))
          return;

        const obj = currentMap[key];

        if (!obj) return;

        const statement = `${obj.column} = ${obj.param}`;

        statements.push(statement);
      });

      return statements;
    };

    const expenseStatements = generateStatements(expenseData, expenseMap);

    const detailsStatements = extraData
      ? generateStatements(extraData, extraMap)
      : undefined;

    const updateExpenseQuery = `
    UPDATE expenses
    SET last_updated_at = CURRENT_TIMESTAMP
    ${expenseStatements[0] ? ", " : ""}
    ${expenseStatements.join(", ")}
    WHERE id = @expense_id
    `;

    const updateDetailsQuery = detailsStatements
      ? `
    UPDATE ${type}_expenses
    SET
    ${detailsStatements.join(", ")}
    WHERE expense_id = @expense_id
    `
      : undefined;

    const isDetailsQuery =
      detailsStatements && detailsStatements[0] ? true : false;

    return {
      updateExpenseQuery,
      updateDetailsQuery,
      isDetailsQuery,
    };
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
    try {
      const type = getTypeById(id);

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
        throw new Error("Could not find record");
      }

      return expense;
    } catch (ex) {
      if (isError(ex)) {
        logger.error(ex.message);
      }

      logger.error("Server Error");
    }
  };

  const create = (
    expense: IExpenseRequestBody,
    extraData: IRequestBodyExtra,
  ) => {
    const typeId = Number(expense.type_id);

    const type: ExpenseRequestTypes = selectType(typeId);

    const getCreateQuery = () => buildCreateQuery(type, extraData);

    const createTransaction = db.transaction(() => {
      const expenseEntry = db.prepare(createExpenseQuery).run({ expense });

      const createQuery = getCreateQuery();

      const parseFn = parseExpenseMap[type];
      const parsedData = parseFn(extraData);

      db.prepare(createQuery).run({
        expense_id: expenseEntry.lastInsertRowid,
        ...parsedData,
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
  ) => {
    const type = getTypeById(expense_id);

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
  }

  return { getAll, getById, create, softDelete, update, hardDelete, undoDelete };
};
