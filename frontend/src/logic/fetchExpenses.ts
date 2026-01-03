import { api } from "../api/client";
import { EXPENSE_TYPES, type ExpenseType } from "../types/expenseTypes";
import type { AnyExpenseType } from "../types/expense";

export const fetchAllExpenses = async () => {
  const entries = Object.entries(EXPENSE_TYPES) as [
    ExpenseType,
    { endpoint: string }
  ][];

  const result = await Promise.all(
    entries.map(async ([type, { endpoint }]) => {
      const data = await api<AnyExpenseType[]>(endpoint);

      return data.map((expense: AnyExpenseType[]) => ({
        ...expense,
        type,
      }));
    })
  );

  return result.flat();
};
