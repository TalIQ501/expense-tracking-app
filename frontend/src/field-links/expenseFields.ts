import type { ExpenseType } from "../types/expenseTypes";

export type FieldType = "text" | "number" | "date" | "select";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  default: string | number;
  options?: string[];

  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
};

export const EXPENSE_FIELDS: Record<ExpenseType, FieldConfig[]> = {
  general: [
    {
      name: "expense_date",
      label: "Date",
      type: "date",
      default: "",
      validation: { required: true },
    },
    { name: "purpose", label: "Purpose", type: "text", default: "" },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      default: "",
      validation: { required: true, min: 0 },
    },
    { name: "description", label: "Description", type: "text", default: "" },
    { name: "given_to", label: "Given To", type: "text", default: "" },
    { name: "address", label: "Address", type: "text", default: "" },
    { name: "rating", label: "Rating", type: "text", default: "" },
  ],
  food: [
    {
      name: "expense_date",
      label: "Date",
      type: "date",
      default: "",
      validation: { required: true },
    },
    {
      name: "item",
      label: "Item",
      type: "text",
      default: "",
      validation: { maxLength: 50 },
    },
    {
      name: "amount",
      label: "Cost",
      type: "number",
      default: "",
      validation: { required: true, min: 0 },
    },
    { name: "quantity", label: "Quantity", type: "number", default: 1 },
    { name: "outlet", label: "Outlet", default: "", type: "text" },
    { name: "area", label: "Area", default: "", type: "text" },
    { name: "address", label: "Address", default: "", type: "text" },
    { name: "rating", label: "Rating", default: "", type: "number" },
  ],
  transport: [
    {
      name: "expense_date",
      label: "Date",
      type: "date",
      default: "",
      validation: { required: true },
    },
    { name: "mode", label: "Mode", type: "text", default: "" },
    {
      name: "amount",
      label: "Cost",
      type: "number",
      default: "",
      validation: { required: true, min: 0 },
    },
    { name: "origin_region", label: "Start Region", type: "text", default: "" },
    { name: "origin", label: "Start Location", type: "text", default: "" },
    {
      name: "destination_region",
      label: "Destination Region",
      type: "text",
      default: "",
    },
    {
      name: "destination",
      label: "Destination Location",
      type: "text",
      default: "",
    },
    { name: "service", label: "Service", type: "text", default: "" },
    { name: "rating", label: "Rating", type: "number", default: "" },
  ],
  grocery: [
    {
      name: "expense_date",
      label: "Date",
      type: "date",
      default: "",
      validation: { required: true },
    },
    { name: "item", label: "Item", type: "text", default: "" },
    {
      name: "amount",
      label: "Cost",
      type: "number",
      default: "",
      validation: { required: true, min: 0 },
    },
    { name: "quantity", label: "Quantity", type: "number", default: 1 },
    { name: "category", label: "Category", type: "text", default: "" },
    { name: "brand", label: "Brand", type: "text", default: "" },
    { name: "store", label: "Store", type: "text", default: "" },
    { name: "address", label: "Address", type: "text", default: "" },
    { name: "rating", label: "Rating", type: "text", default: "" },
  ],
  stationary: [
    {
      name: "expense_date",
      label: "Date",
      type: "date",
      default: "",
      validation: { required: true },
    },
    { name: "item", label: "Item", type: "text", default: "" },
    {
      name: "amount",
      label: "Cost",
      type: "number",
      default: "",
      validation: { required: true, min: 0 },
    },
    { name: "quantity", label: "Quantity", type: "number", default: "" },
    { name: "category", label: "Category", type: "text", default: "" },
    { name: "brand", label: "Brand", type: "text", default: "" },
    { name: "store", label: "Store", type: "text", default: "" },
    { name: "address", label: "Address", type: "text", default: "" },
    { name: "rating", label: "Rating", type: "text", default: "" },
  ],
  clothes: [
    {
      name: "expense_date",
      label: "Date",
      type: "date",
      default: "",
      validation: { required: true },
    },
    { name: "item", label: "Item", type: "text", default: "" },
    {
      name: "amount",
      label: "Cost",
      type: "number",
      default: "",
      validation: { required: true, min: 0 },
    },
    { name: "quantity", label: "Quantity", type: "number", default: "" },
    { name: "category", label: "Category", type: "text", default: "" },
    { name: "brand", label: "Brand", type: "text", default: "" },
    { name: "store", label: "Store", type: "text", default: "" },
    { name: "address", label: "Address", type: "text", default: "" },
    { name: "rating", label: "Rating", type: "text", default: "" },
  ] as const,
};
