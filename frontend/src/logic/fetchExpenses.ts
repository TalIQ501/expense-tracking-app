import { api } from "../api/client";
import { EXPENSE_TYPES, type ExpenseType } from "../types/expenseTypes";
import type { AnyExpenseType } from "../types/expense";

type filtersType = {
  type?: ExpenseType;
  params?: Record<string, string | number | boolean>;
};

export const fetchAllExpenses = async (filters?: filtersType) => {
  const entries = filters?.type
    ? ([[filters.type, EXPENSE_TYPES[filters.type]]] as [
        ExpenseType,
        { endpoint: string },
      ][])
    : (Object.entries(EXPENSE_TYPES) as [ExpenseType, { endpoint: string }][]);

  const results = await Promise.allSettled(
    entries.map(async ([type, { endpoint }]) => {
      const data = await api<AnyExpenseType[]>(endpoint, {
        params: filters?.params,
      });

      return data.map((expense: AnyExpenseType[]) => ({
        ...expense,
        type,
      }));
    }),
  );

  const succeeded = results
    .filter((r) => r.status === "fulfilled")
    .map(
      (r) =>
        (
          r as PromiseFulfilledResult<
            (AnyExpenseType & { type: ExpenseType })[]
          >
        ).value,
    );

  return succeeded.flat();
};
