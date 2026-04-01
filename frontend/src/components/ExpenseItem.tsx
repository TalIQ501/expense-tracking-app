import { useExpenseStore } from "../store/useExpenseStore";
import type { AnyExpenseType } from "../types/expense";
import { expenseDisplayConfig } from "../types/expenseDisplay";

interface ExpenseItemProps {
  expense: AnyExpenseType;
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const deleteExpense = useExpenseStore((store) => store.deleteExpense);

  const config = expenseDisplayConfig[expense.expense_type];

  return (
    <tr className="border-b hover:bg-blue-50">
      <td className="px-4 py-3">{config.expense_date(expense)}</td>
      <td className="px-4 py-3">{config.type(expense)}</td>
      <td className="px-4 py-3">{config.title(expense)}</td>
      <td className="px-4 py-3">Rs. {config.amount(expense)}</td>
      <td className="px-4 py-3">
        <button
          className="border-2 text-red-500 hover:bg-red-50 border-red-200 px-2"
          onClick={() =>
            deleteExpense(config.id(expense))
          }
        >
          Del
        </button>
      </td>
    </tr>
  );
};
