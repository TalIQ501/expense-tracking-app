import { ExpenseList } from "../components/ExpenseList";
import { FilterBar } from "../components/FilterBar";

export const ExpensesPage = () => {
  return (
    <>
      <section className="flex flex-col gap-3 w-full">
        <div className="">Expenses</div>
        <FilterBar />
        <ExpenseList />
      </section>
    </>
  );
};
