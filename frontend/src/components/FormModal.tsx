import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useFormModalStore } from "../store/useFormModalStore";
import { AddExpenseForm } from "./AddExpenseForm";

export const FormModal = () => {
  const isOpen = useFormModalStore((state) => state.isOpen);
  const closeModal = useFormModalStore((state) => state.closeModal);

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="z-50">
        <div className="fixed inset-0 bg-black/40" />
        <DialogPanel>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded">
              <button
                className="shadow-sm rounded hover:shadow-lg transition mb-2 p-2 font-bold"
                onClick={closeModal}
              >
                X
              </button>
              <DialogTitle className="text-lg font-semibold">
                Add Expense
              </DialogTitle>
              <AddExpenseForm />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};
