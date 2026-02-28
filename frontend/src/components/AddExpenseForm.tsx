import { useState } from "react";
import { EXPENSE_FIELDS, type FieldConfig } from "../field-links/expenseFields";
import { type ExpenseType } from "../types/expenseTypes";
import { useExpenseStore } from "../store/useExpenseStore";
import { type FormState } from "../types/formStateType";
import { buildSchema } from "../schema/ZodField";

type FormErrors = Record<string, string>;

export const AddExpenseForm = () => {
  const expenseKeys = Object.keys(EXPENSE_FIELDS) as ExpenseType[];

  const [formTypeState, setFormTypeState] = useState<ExpenseType>("general");
  const [errors, setErrors] = useState<FormErrors>({});

  const fields = EXPENSE_FIELDS[formTypeState];
  const addExpense = useExpenseStore((store) => store.addExpense);

  const initialState = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "number" ? 0 : ""]),
  );

  const [form, setForm] = useState<FormState<typeof formTypeState>>(
    initialState as FormState<typeof formTypeState>,
  );

  const handleChange = <K extends keyof typeof form>(
    name: string,
    value: (typeof form)[K],
  ) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);

    const schema = buildSchema(EXPENSE_FIELDS[formTypeState]);
    const result = schema.safeParse(newForm);

    if (!result.success) {
      const newErrors: FormErrors = {};
      
      for (const issue of result.error.issues) {
        const field = issue.path[0];
  
        if (typeof field === "string") {
          newErrors[field] = issue.message;
        }
      }

      setErrors(newErrors);
    } else {
      setErrors({});
    }

    setErrors(prev => {
      const copy = { ...prev };
      return copy;
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fields = EXPENSE_FIELDS[formTypeState];
    const schema = buildSchema(fields);

    const result = schema.safeParse(form);

    if (!result.success) {
      const newErrors: FormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && !newErrors[field]) {
          newErrors[field] = issue.message;
        }
      }

      setErrors(newErrors);
      return;
    }

    addExpense(formTypeState, form);
    setForm(initialState);
    setErrors({});
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
                onChange={(e) => 
                  handleChange(
                    field.name, 
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
              ></select>
              // {field.options?.map(option => (
              //   <option key={option} value={option}>
              //     {option}
              //   </option>
              // ))}
            ) : (
              <input
                type={field.type}
                value={form[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`
                  border rounded p-2
                  ${errors[field.name]
                    ? "border-red-500"
                    : form[field.name]
                    ? "border-green-500"
                    : "border-gray-300"
                  }
                `}
              ></input>
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-sm">
                {errors[field.name]}
              </p>
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
