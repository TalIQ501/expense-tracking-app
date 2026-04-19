import { type Database } from "better-sqlite3";
import { expenseRepository } from "./expenses.repository";
import {
  ExpenseRequestTypes,
  IRequestBody,
  type IExpenseRequestBody,
} from "shared/types/request";
import { IAllFilters } from "shared/types/queryFilters";
import { typeNameQuery } from "./queries/expense.sql";
import { buildFilters } from "./expenses.builder";
import { parseExpenseMap } from "./expenses.parser";
import { ValidationError } from "../../utils/errors";
import { logger } from "../../plugins/loggerPlugin";

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
      sort_type: sort_type,
      sort_desc: parsedSortDesc,
    };

    const generatedFilters = buildFilters(
      filters,
      { page, pageSize },
      parseDeleted,
      sortFilters,
    );

    return repo.getAll(generatedFilters, { page, pageSize });
  };

  const getById = (idString: string) => {
    const id = Number(idString);

    const type = getTypeById(id);

    return repo.getById(id, type);
  };

  const create = (body: IRequestBody) => {
    const { expense_date, amount, type_id, rating, ...extraData } = body;

    logger.info(expense_date);

    if (!type_id) throw new ValidationError("type_id is required");
    if (!amount) throw new ValidationError("amount is required");
    if (!expense_date) throw new ValidationError("expense_date is required");

    const typeId = Number(type_id);

    const expense = parseExpenseMap["expense"]({
      expense_date,
      amount,
      type_id,
      rating,
    });

    const type = selectType(typeId);

    const parsedData = parseExpenseMap[type](extraData);

    return repo.create(expense, type, parsedData);
  };

  const softDelete = (id: number) => {
    return repo.softDelete(id);
  };

  const update = (expense_id: string, body: IRequestBody) => {
    const { expense_date, amount, type_id, rating, ...extraData } = body;

    const expenseId = Number(expense_id);

    const type = getTypeById(expenseId);

    const expense: IExpenseRequestBody = parseExpenseMap["expense"]({
      expense_date,
      amount,
      type_id,
      rating,
    });

    return repo.update(expenseId, expense, extraData, type);
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
