import { useState } from "react";
import { EXPENSE_FIELDS, type FieldConfig } from "../field-links/expenseFields";
import { type ExpenseType } from "../types/expenseTypes";
import { useExpenseStore } from "../store/useExpenseStore";
import { type FormState } from "../types/formStateType";
import { buildSchema } from "../schema/ZodField";
import { getExpenseTypeId } from "../utils/expenseTypeMap";

type FormErrors = Record<string, string>;

export const AddExpenseForm = () => {
  const expenseKeys = Object.keys(EXPENSE_FIELDS) as ExpenseType[];

  const [formTypeState, setFormTypeState] = useState<ExpenseType>("general");
  const [errors, setErrors] = useState<FormErrors>({});

  const fields = EXPENSE_FIELDS[formTypeState];
  const addExpense = useExpenseStore((store) => store.addExpense);

  const initialState = Object.fromEntries(
    fields.map((f) => [f.name, f.default]),
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

    setErrors((prev) => {
      const copy = { ...prev };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fields = EXPENSE_FIELDS[formTypeState];
    const typeId = getExpenseTypeId(formTypeState);

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

    addExpense({ ...form, type_id: typeId });
    setForm(initialState);
    setErrors({});
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[80vh] max-h-150 overflow-y-auto rounded-lg p-4 flex flex-col">
      <select
        value={formTypeState}
        onChange={(e) => {
          setFormTypeState(e.target.value as ExpenseType);
          setForm(initialState);
        }}
        className="border p-2 rounded mb-4"
      >
        {expenseKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="grid grid-cols-2 gap-6">
          {fields.map((field: FieldConfig) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="font-semibold">{field.label}</label>

              {field.type === "select" ? (
                <select
                  value={form[field.name]}
                  onChange={(e) =>
                    handleChange(
                      field.name,
                      field.type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                    )
                  }
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                // {field.options?.map(option => (
                //   <option key={option} value={option}>
                //     {option}
                //   </option>
                // ))}
                <input
                  type={field.type}
                  value={form[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`
                    border rounded p-2 outline-none
                    ${
                      errors[field.name]
                        ? "border-red-500"
                        : form[field.name]
                          ? "border-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:border-2"
                    }
                  
                `}
                ></input>
              )}
              <p className="text-red-500 text-sm min-h-5">
                {errors[field.name] ?? ""}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full sticky bottom-0 bg-white pt-2 flex-row justify-center">
          <button
            type="submit"
            className="w-full rounded border font-semibold bg-blue-700 text-white p-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
