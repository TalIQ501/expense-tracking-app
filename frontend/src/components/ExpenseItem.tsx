import type { AnyExpenseType } from "../types/expense";
import { expenseDisplayConfig } from "../types/expenseDisplay";

interface ExpenseItemProps {
  expense: AnyExpenseType;
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const config = expenseDisplayConfig[expense.type];

  return (
    <div className="grid grid-cols-6 gap-2">
      <div>{config.expense_date(expense)}</div>
      <div>{config.type(expense)}</div>
      <div className="col-span-2">{config.title(expense)}</div>
      <div>Rs. {config.amount(expense)}</div>
      <div>Del</div>
    </div>
  );
};
