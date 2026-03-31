import { ExpenseList } from "../components/ExpenseList";

export const ExpensesPage = () => {
  return (
    <>
      <section className="flex flex-col gap-3 w-full">
        <div className="">Expenses</div>
        <ExpenseList />
      </section>
    </>
  );
};
