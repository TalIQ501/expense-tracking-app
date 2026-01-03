import { useEffect } from "react";
import { AppRouter } from "./router/AppRouter";
import { useExpenseStore } from "./store/expenses.store";

function App() {
  const fetchAll = useExpenseStore((store) => store.fetchExpenses);

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
