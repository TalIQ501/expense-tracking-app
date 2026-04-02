import { create } from "zustand";
import type { ExpenseType } from "../types/expenseTypes";
import { api, type QueryParams } from "../api/client";
import type { AnyExpenseType } from "../types/expense";
import { isError } from "../utils/isError";
import type { FormState } from "../types/formStateType";
import type { IAllConditionFilters } from "../../../shared/types/queryFilters";

interface ExpenseStateType {
  expenses: AnyExpenseType[];
  loading: boolean;
  error: string | null;
  fetchExpenses: (filters?: IAllConditionFilters) => Promise<void>;
  addExpense: <T extends ExpenseType>(data: FormState<T>) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStateType>((set, get) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async (filters?: IAllConditionFilters) => {
    if (get().loading) return;

    set({ loading: true, error: null });

    try {
      const data = (await api("/expenses", {
        params: filters as QueryParams,
      })) as AnyExpenseType[];
      set({ expenses: data, loading: false });
      console.log(get().expenses);
    } catch (err) {
      if (isError(err)) {
        set({
          error: err.message ?? "Failed to load expenses",
          loading: false,
        });
        return;
      }
      console.error("Unknown error", err);
      return;
    }
  },

  addExpense: async (data) => {
    try {
      await api("/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await get().fetchExpenses();
    } catch (err) {
      console.error("Failed to add expense", err);
      set({ error: "Failed to add expense" });
    }
  },

  deleteExpense: async (id) => {
    try {
      await api(`/expenses/${id}`, {
        method: "DELETE",
      });

      await get().fetchExpenses();
    } catch (err) {
      console.error("Failed to delete expense", err);
      set({ error: "Failed to delete expense" });
    }
  },
}));
