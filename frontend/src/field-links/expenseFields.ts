import type { ExpenseType } from "../types/expenseTypes";

export type FieldType = "text" | "number" | "date" | "select";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];

  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }
}

export const EXPENSE_FIELDS: Record<ExpenseType, FieldConfig[]> = {
  food: [
    { name: "expense_date", label: "Date", type: "date", validation: { required: true } },
    { name: "item", label: "Item", type: "text", validation: { maxLength: 50 } },
    { name: "amount", label: "Cost", type: "number", validation: { required: true, min: 0 } },
    { name: "outlet", label: "Outlet", type: "text" },
    { name: "area", label: "Area", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "rating", label: "Rating", type: "number" },
  ],
  transport: [
    { name: "expense_date", label: "Date", type: "date", validation: { required: true } },
    { name: "mode", label: "Mode", type: "text" },
    { name: "amount", label: "Cost", type: "number", validation: { required: true, min: 0 } },
    { name: "origin_region", label: "Start Region", type: "text" },
    { name: "origin", label: "Start Location", type: "text" },
    { name: "destination_region", label: "Destination Region", type: "text" },
    { name: "destination", label: "Destination Location", type: "text" },
    { name: "service", label: "Service", type: "text" },
    { name: "rating", label: "Rating", type: "number" },
  ],
  grocery: [
    { name: "expense_date", label: "Date", type: "date", validation: { required: true } },
    { name: "item", label: "Item", type: "text" },
    { name: "amount", label: "Cost", type: "number", validation: { required: true, min: 0 } },
    { name: "quantity", label: "Quantity", type: "number" },
    { name: "category", label: "Category", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "store", label: "Store", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "rating", label: "Rating", type: "text" },
  ],
  clothes: [
    { name: "expense_date", label: "Date", type: "date", validation: { required: true } },
    { name: "item", label: "Item", type: "text" },
    { name: "amount", label: "Cost", type: "number", validation: { required: true, min: 0 } },
    { name: "quantity", label: "Quantity", type: "number" },
    { name: "category", label: "Category", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "store", label: "Store", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "rating", label: "Rating", type: "text" },
  ],
  stationary: [
    { name: "expense_date", label: "Date", type: "date", validation: { required: true } },
    { name: "item", label: "Item", type: "text" },
    { name: "amount", label: "Cost", type: "number", validation: { required: true, min: 0 } },
    { name: "quantity", label: "Quantity", type: "number" },
    { name: "category", label: "Category", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "store", label: "Store", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "rating", label: "Rating", type: "text" },
  ],
  general: [
    { name: "expense_date", label: "Date", type: "date", validation: { required: true } },
    { name: "purpose", label: "Purpose", type: "text" },
    { name: "amount", label: "Amount", type: "number",validation: { required: true, min: 0 } },
    { name: "description", label: "Description", type: "text" },
    { name: "given_to", label: "Given To", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "rating", label: "Rating", type: "text" },
  ] as const,
};
