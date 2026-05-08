import { useEffect } from "react";
import { AppRouter } from "./router/AppRouter";
import { useExpenseStore } from "./store/useExpenseStore";
import { useFilters } from "./hooks/useFilters";

function App() {
  const { filters } = useFilters();

  const fetchAll = useExpenseStore((store) => store.fetchExpenses);

  useEffect(() => {
    fetchAll(filters);
  }, [filters]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
