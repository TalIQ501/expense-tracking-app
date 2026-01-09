import { Link } from "react-router-dom";
import { navLinks } from "../field-links/navlinks";
import { useFormModalStore } from "../store/useFormModalStore";

export const Navbar = () => {
  const openModal = useFormModalStore((state) => state.openModal);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-x1 mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <img src="" className="h-8" alt="" /> */}
          <span 
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            Expenses
          </span>
        </Link>
        <div 
          className="self-center font-semibold whitespace-nowrap dark:text-white"
          onClick={openModal}
        >
          + Add Expense
        </div>
        <ul className="flex flex-row space-x-3">
          {navLinks.map((link) => (
            <li key={link.path} className="whitespace-nowrap dark:text-white">
              <Link to={link.path} className={``}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
