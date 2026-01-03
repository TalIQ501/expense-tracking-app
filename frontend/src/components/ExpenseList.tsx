import { useExpensesApi } from "../hook/useExpensesApi";
import { Loading } from "./Loading";

export const ExpenseList = () => {
  const { data, error, loading } = useExpensesApi();

  if (loading) return <Loading />;
  if (error) return <p>Error loading expenses...</p>;

  return (
    <ul>
      {data.map((e) => (
        <li key={`${e.type}-${e.id}`}>
          [{e.type}] Rs. {e.amount}
        </li>
      ))}
    </ul>
  );
};
