import { type Database } from "better-sqlite3";
import {
  createExpenseQuery,
  hardDeleteExpenseQuery,
  getDeletedExpenseByIdQuery,
  softDeleteExpenseQuery,
  typeNameQuery,
  undoDeleteExpenseQuery,
} from "./queries/expense.sql";
import { logger } from "../../plugins/loggerPlugin";
import { isError } from "../../utils/isError";
import type {
  IExpenseRequestBody,
  ExpenseRequestTypes,
  IRequestBodyExtra,
} from "../../../../shared/types/request";

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

    return typeId;
  };

  const getAll = (
    query: string,
    params: Record<string, unknown>,
    pageSize: number,
    offset: number,
  ) => {
    try {
      const data = db
        .prepare(query)
        .all({ ...params, pageSize: pageSize ?? 20, offset });

      return data;
    } catch (ex: unknown) {
      if (isError(ex)) {
        logger.error(ex.message);
      }

      logger.error("Server Error");
    }

    return;
  };

  const getById = (id: number, query: string) => {
    try {
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
    createQuery: string,
    extraData: IRequestBodyExtra,
  ) => {
    const createTransaction = db.transaction(() => {
      const expenseEntry = db.prepare(createExpenseQuery).run({ expense });

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
    updateExpenseQuery: string,
    isDetailsQuery: boolean,
    updateDetailsQuery?: string,
  ) => {
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
