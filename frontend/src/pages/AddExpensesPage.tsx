import { AddExpenseForm } from "../components/AddExpenseForm";

export const AddExpensesPage = () => {
  return (
    <>
      <section className="flex flex-col gap-3 w-full">
        <div className="text-2xl font-semibold">Add Expense</div>
        <AddExpenseForm />
      </section>
    </>
  );
};
