import { allFilterConditionMap, queryParamsMap } from "./expenses.mapper";
import { ExpenseTypes } from "shared/types/expense";
import {
  IExpenseFilters,
  IPageFilters,
  ISortFilters,
} from "shared/types/queryFilters";
import {
  ExpenseRequestTypes,
  IExpenseRequestBody,
  IRequestBody,
  IRequestBodyExtra,
} from "shared/types/request";

export const buildFilters = (
  filters?: IExpenseFilters,
  pageFilters?: IPageFilters,
  deleted?: boolean,
  sortFilters?: ISortFilters,
  conditionMap: typeof allFilterConditionMap = allFilterConditionMap,
) => {
  const orderByMap = {
    sort_date: "e.expense_date",
    sort_type: "expense_type",
  } as const;

  type sortType = (typeof orderByMap)[keyof typeof orderByMap];

  const conditions: string[] = [];
  let sort: sortType = "e.expense_date";
  const params: Record<string, unknown> = {};

  if (!deleted) {
    conditions.push("e.deleted_at IS NULL");
  } else {
    conditions.push("e.deleted_at IS NOT NULL");
  }

  Object.entries(filters ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const condition = conditionMap[key as keyof typeof allFilterConditionMap];
    if (!condition) return;

    conditions.push(condition);
    params[key] = value;
  });

  const offset = ((pageFilters?.page ?? 1) - 1) * (pageFilters?.pageSize ?? 20);

  return {
    conditions,
    params,
    offset,
    sort,
    sortDesc: sortFilters?.sort_desc as boolean,
  };
};

export const buildCreateQuery = (
  type: ExpenseRequestTypes,
  data: IRequestBody,
) => {
  const columns: string[] = [];
  const params: string[] = [];

  const map = queryParamsMap[type];

  Object.entries(data ?? {}).forEach(([key, value]) => {
    const obj = (map as Record<string, { column: string; param: string }>)[key];

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

export const buildUpdateQuery = (
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
      if (value === null || value === undefined || Number.isNaN(value)) return;

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
