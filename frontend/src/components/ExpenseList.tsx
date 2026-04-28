import { useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { ExpenseItem } from "./ExpenseItem";
import { Loading } from "./Loading";
import { useFilters } from "../hooks/useFilters";

export const ExpenseList = () => {
  const { expenses, loading, error, fetchExpenses } = useExpenseStore();

  const { filters } = useFilters();

  useEffect(() => {
    fetchExpenses(filters);
  }, [fetchExpenses]);

  if (loading) return <Loading />;
  if (error) return <p>Error loading expenses...</p>;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <ExpenseItem key={`${expense.id}`} expense={expense} />
        ))}
      </tbody>
    </table>
  );
};
