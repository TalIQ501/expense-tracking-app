import { Dialog } from "@headlessui/react";
import { useState } from "react";

export const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onClose={setIsOpen} className="z-50">
        <div className="flex items-center justify-center">
          <div 
            className="
              w-full max-w-md rounded bg-white p-6 shadow-lg
              transition duration-300
              data-enter:opacity-0 data-enter:scale-95
              data-enter-to:opacity-100 data-enter-to:scale-100
              data-leave:opacity-100 data-leave-to:opacity-0 data-leave-to:scale-95
          ">

          </div>
        </div>
      </Dialog>
    </>
  )
};
