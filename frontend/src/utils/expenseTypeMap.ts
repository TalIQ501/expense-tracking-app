import type { ExpenseType } from "../types/expenseTypes";

const expenseTypeMap = {
  general: 1,
  food: 2,
  transport: 3,
  grocery: 4,
  stationary: 5,
  clothes: 6,
};

export const getExpenseTypeId = (type: ExpenseType) => {
  return expenseTypeMap[type];
};
