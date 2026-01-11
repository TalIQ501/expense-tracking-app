import { create } from "zustand";
import type { ExpenseType } from "../types/expenseTypes";
import { fetchAllExpenses } from "../logic/fetchExpenses";
import { api } from "../api/client";
import type { AnyExpenseType } from "../types/expense";
import { isError } from "../utils/isError";
import type { FormState } from "../types/formStateType";

interface ExpenseStateType {
  expenses: AnyExpenseType[];
  loading: boolean;
  error: string | null;
  fetchExpenses: () => Promise<void>;
  addExpense: <T extends ExpenseType>(
    type: ExpenseType,
    data: FormState<T>
  ) => Promise<void>;
  deleteExpense: (type: ExpenseType, id: number) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStateType>((set, get) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async () => {
    if (get().loading || get().expenses.length > 0) return;

    set({ loading: true, error: null });

    try {
      const expenses = await fetchAllExpenses();
      set({ expenses, loading: false });
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

  addExpense: async (type, data) => {
    try {
      const created = await api<AnyExpenseType>(`/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      set((state) => ({
        expenses: [...state.expenses, { ...created, type }],
      }));
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  },

  deleteExpense: async (type, id) => {
    try {
      console.log(`ID is ${id}`);

      await api<AnyExpenseType>(`/${type}/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id === id),
      }));
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  },
}));
