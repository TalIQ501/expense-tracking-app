import { create } from "zustand";

type SummaryStateType = {
  summary: number;
  loading: boolean;
  error: string | null;
  fetchSummary: () => Promise<void>;
};

export const useSummaryStore = create<SummaryStateType>((set, get) => ({
  summary: 0,
  loading: false,
  error: null,

  fetchSummary: async () => {
    if (get().loading) return;

    set({ loading: true, error: null });

    try {
      const summary = 
    } catch (err) {

    }
  },
}));
