import type { ExpenseType } from "./expenseTypes";

export interface BaseExpenseType {
  id: number;
  expense_date: string;
  amount: number;
  type: ExpenseType;
}

export type AnyExpenseType = BaseExpenseType & Record<string, string | number>;
