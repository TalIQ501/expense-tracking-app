import { useExpensesApi } from "../hook/useExpensesApi";
import { ExpenseItem } from "./ExpenseItem";
import { Loading } from "./Loading";

export const ExpenseList = () => {
  const { data, error, loading } = useExpensesApi();

  if (loading) return <Loading />;
  if (error) return <p>Error loading expenses...</p>;

  return (
    <ul>
      {data.map((expense) => (
        <li key={`${expense.type}-${expense.id}`}>
          <ExpenseItem
            expense={expense}
          />
        </li>
      ))}
    </ul>
  );
};
