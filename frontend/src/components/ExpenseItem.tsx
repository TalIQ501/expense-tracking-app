import { useExpenseStore } from "../store/useExpenseStore";
import type { AnyExpenseType } from "../types/expense";
import { expenseDisplayConfig } from "../types/expenseDisplay";

interface ExpenseItemProps {
  expense: AnyExpenseType;
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const deleteExpense = useExpenseStore((store) => store.deleteExpense);

  const config = expenseDisplayConfig[expense.type];

  return (
    <div className="grid grid-cols-6 gap-2">
      <div>{config.expense_date(expense)}</div>
      <div>{config.type(expense)}</div>
      <div className="col-span-2">{config.title(expense)}</div>
      <button>Rs. {config.amount(expense)}</button>
      <button
        className="border-2 hover:bg-gray-100"
        onClick={() => deleteExpense(config.type(expense), config.id(expense))}
      >
        Del
      </button>
    </div>
  );
};
