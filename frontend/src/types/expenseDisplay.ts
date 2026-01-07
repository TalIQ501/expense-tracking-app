import type { AnyExpenseType } from "./expense";
import type { ExpenseType } from "./expenseTypes";

export type ExpenseDisplay = {
  id: (expense: AnyExpenseType) => number;
  expense_date: (expense: AnyExpenseType) => string;
  type: (expense: AnyExpenseType) => ExpenseType;
  title: (expense: AnyExpenseType) => string;
  amount: (expense: AnyExpenseType) => number;
};

const baseExpenseDisplay = {
  id: (e: AnyExpenseType) => e.id,
  type: (e: AnyExpenseType) => e.type,
  expense_date: (e: AnyExpenseType) => `${e.expense_date}`,
  amount: (e: AnyExpenseType) => e.amount,
};

export const expenseDisplayConfig: Record<ExpenseType, ExpenseDisplay> = {
  general: {
    ...baseExpenseDisplay,
    title: (e) => `${e.purpose} | to ${e.given_to}`,
  },
  transport: {
    ...baseExpenseDisplay,
    title: (e) => `${e.mode} | ${e.origin} -> ${e.destination}`,
  },
  food: {
    ...baseExpenseDisplay,
    title: (e) =>
      `${e.quantity} - ${e.item} | from ${e.outlet} | at ${e.address}`,
  },
  grocery: {
    ...baseExpenseDisplay,
    title: (e) => `${e.quantity} ${e.item}`,
  },
  stationary: { 
    ...baseExpenseDisplay,
    title: (e) => `${e.quantity} ${e.item}`,
  },
  clothes: {
    ...baseExpenseDisplay,
    title: (e) => `${e.quantity} ${e.item}`,
  },
};
