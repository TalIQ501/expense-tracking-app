import { useEffect, useState } from "react";
import type { AnyExpenseType } from "../types/expense";
import { fetchAllExpenses } from "../logic/fetchExpenses";

export const useExpensesApi = () => {
  const [data, setData] = useState<AnyExpenseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchAllExpenses()
      .then((expenses) => {
        if (!cancelled) {
          setData(expenses);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
