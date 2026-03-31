import { create } from "zustand";

type FormModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useFormModalStore = create<FormModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
