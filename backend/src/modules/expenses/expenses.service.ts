import { type Database } from "better-sqlite3";
import { expenseRepository } from "./expenses.repository";
import {
  ExpenseRequestTypes,
  IRequestBody,
  type IExpenseRequestBody,
  type IRequestBodyExtra,
} from "shared/types/request";
import { IAllFilters } from "shared/types/queryFilters";
import { getDetailsQueryMap } from "./expenses.mapper";
import {
  expensesColumnsString,
  expensesFromString,
  typeNameQuery,
} from "./queries/expense.sql";
import {
  buildCreateQuery,
  buildFilters,
  buildUpdateQuery,
} from "./expenses.builder";
import { parseExpenseMap } from "./expenses.parser";

interface TypeIdRes {
  type_id: number;
}

export const expenseService = (db: Database) => {
  const repo = expenseRepository(db);

  const selectType = (type_id: number): ExpenseRequestTypes => {
    const query = typeNameQuery;

    return repo.selectType(type_id, query);
  };

  const getTypeById = (id: number) => {
    const typeIdRaw = repo.getTypeById(id);

    const typeId = Number(typeIdRaw.type_id);

    const type = selectType(typeId);

    return type;
  };

  const getAll = (body: IAllFilters) => {
    const { page, pageSize, deleted, sort_desc, sort_type, ...filters } = body;

    const parseDeleted = deleted === "true" ? true : false;

    const parsedSortDesc = sort_desc === "false" ? false : true;

    const sortFilters = {
      sort_desc: parsedSortDesc,
      sort_type: sort_type,
    };

    const { conditions, params, offset, sort, sortDesc } = buildFilters(
      filters,
      { page, pageSize },
      parseDeleted,
      sortFilters,
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

    return repo.getAll(getAllQuery, params, pageSize, offset);
  };

  const getById = (idString: string) => {
    const id = Number(idString);

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

    const expense = repo.getById(id, query);

    return expense;
  };

  const create = (
    expense: IExpenseRequestBody,
    extraData: IRequestBodyExtra,
  ) => {
    const typeId = Number(expense.type_id);

    const type: ExpenseRequestTypes = selectType(typeId);

    const createQuery = buildCreateQuery(type, extraData);

    const parsedData = parseExpenseMap[type](extraData);

    repo.create(expense, createQuery, parsedData);
  };

  const softDelete = (id: number) => {
    return repo.softDelete(id);
  };

  const update = (expense_id: string, body: IRequestBody) => {
    const { expense_date, amount, type_id, rating, ...extraData } = body;

    const expenseId = Number(expense_id);

    const type = getTypeById(expenseId);

    const parseFn = parseExpenseMap["expense"];

    const expense: IExpenseRequestBody = parseFn({
      expense_date,
      amount,
      type_id,
      rating,
    });

    const { updateDetailsQuery, updateExpenseQuery, isDetailsQuery } =
      buildUpdateQuery(type, expense, extraData);

    const updated = repo.update(
      expenseId,
      expense,
      extraData,
      updateExpenseQuery,
      isDetailsQuery,
      updateDetailsQuery,
    );

    return updated;
  };

  const hardDelete = (id: number) => {
    return repo.hardDelete(id);
  };

  const undoDelete = (id: number) => {
    return repo.undoDelete(id);
  };

  return {
    getAll,
    getById,
    create,
    softDelete,
    update,
    hardDelete,
    undoDelete,
  };
};
