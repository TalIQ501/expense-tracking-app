import type { AnyExpenseType } from "./expense";
import type { ExpenseType } from "./expenseTypes";

export type ExpenseDisplay = {
  expense_date: (expense: AnyExpenseType) => string;
  type: (expense: AnyExpenseType) => string;
  title: (expense: AnyExpenseType) => string;
  amount: (expense: AnyExpenseType) => number;
};

export const expenseDisplayConfig: Record<ExpenseType, ExpenseDisplay> = {
  general: {
    type: (e) => `${e.type}`,
    expense_date: (e) => `${e.expense_date}`,
    title: (e) => `${e.purpose} | to ${e.given_to}`,
    amount: (e) => e.amount,
  },
  transport: {
    type: (e) => `${e.type}`,
    expense_date: (e) => `${e.expense_date}`,
    title: (e) => `${e.mode} | ${e.origin} -> ${e.destination}`,
    amount: (e) => e.amount,
  },
  food: {
    type: (e) => `${e.type}`,
    expense_date: (e) => `${e.expense_date}`,
    title: (e) =>
      `${e.quantity} - ${e.item} | from ${e.outlet} | at ${e.address}`,
    amount: (e) => e.amount,
  },
  grocery: {
    type: (e) => `${e.type}`,
    expense_date: (e) => `${e.expense_date}`,
    title: (e) => `${e.quantity} ${e.item}`,
    amount: (e) => e.amount,
  },
  stationary: {
    type: (e) => `${e.type}`,
    expense_date: (e) => `${e.expense_date}`,
    title: (e) => `${e.quantity} ${e.item}`,
    amount: (e) => e.amount,
  },
  clothes: {
    type: (e) => `${e.type}`,
    expense_date: (e) => `${e.expense_date}`,
    title: (e) => `${e.quantity} ${e.item}`,
    amount: (e) => e.amount,
  },
};
