import type { EXPENSE_FIELDS } from "../field-links/expenseFields";
import type { ExpenseType } from "./expenseTypes";

export type FormState<T extends ExpenseType> = {
  [K in (typeof EXPENSE_FIELDS)[T][number]["name"]]: string | number;
};
