import { Dialog } from "@headlessui/react";
import { useFormModalStore } from "../store/useFormModalStore";
import { AddExpenseForm } from "./AddExpenseForm";

export const FormModal = () => {
  const isOpen = useFormModalStore((state) => state.isOpen);
  const closeModal = useFormModalStore((state) => state.closeModal);

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <button 
              className=""
              onClick={closeModal}
            >X</button>
            <AddExpenseForm />
          </div>
        </div>
      </Dialog>
    </>
  );
};
