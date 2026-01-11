import { useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { ExpenseItem } from "./ExpenseItem";
import { Loading } from "./Loading";

export const ExpenseList = () => {
  const { expenses, loading, error, fetchExpenses } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, [expenses]);

  if (loading) return <Loading />;
  if (error) return <p>Error loading expenses...</p>;

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={`${expense.type}-${expense.id}`}>
          <ExpenseItem expense={expense} />
        </li>
      ))}
    </ul>
  );
};
