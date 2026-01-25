import { create } from "zustand";

type SummaryStateType = {
  summary: number;
  loading: boolean;
  error: string | null;
  fetchSummary: () => Promise<void>
};

export const useSummaryStore = create<SummaryStateType>((set, get) => ({
  summary: 0,
  loading: false,
  error: null,


}))
