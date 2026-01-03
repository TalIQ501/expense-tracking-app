import { useState } from "react";
import { EXPENSE_FIELDS, type FieldConfig } from "../field-links/expenseFields";
import { type ExpenseType } from "../types/expenseTypes";
import { useExpenseStore } from "../store/expenses.store";
import { type FormState } from "../types/formStateType";

export const AddExpenseForm = () => {
  const expenseKeys = Object.keys(EXPENSE_FIELDS) as ExpenseType[];

  const [formTypeState, setFormTypeState] = useState<ExpenseType>("general");

  const fields = EXPENSE_FIELDS[formTypeState];
  const addExpense = useExpenseStore((store) => store.addExpense);

  const initialState = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "number" ? 0 : ""])
  );

  const [form, setForm] = useState<FormState<typeof formTypeState>>(
    initialState as FormState<typeof formTypeState>
  );

  const handleChange = <K extends keyof typeof form>(
    name: string,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);
    
    addExpense(formTypeState, form);

    setForm(initialState);
  };

  return (
    <div>
      <select
        value={formTypeState}
        onChange={(e) => setFormTypeState(e.target.value as ExpenseType)}
        className="border p-2 rounded mb-4"
      >
        {expenseKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {fields.map((field: FieldConfig) => (
          <div key={field.name} className="flex items-center gap-2">
            <label className="font-semibold">{field.label}</label>

            {field.type === "select" ? (
              <select
                value={form[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
              ></select>
            ) : (
              <input
                type={field.type}
                value={form[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="border rounded p-2"
              ></input>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="border font-semibold bg-blue-700 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
