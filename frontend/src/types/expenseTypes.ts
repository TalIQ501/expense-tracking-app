export const EXPENSE_TYPES = {
  food: {
    label: "Food",
    endpoint: "/food",
  },
  transport: {
    label: "Transport",
    endpoint: "/transport",
  },
  stationary: {
    label: "Stationary",
    endpoint: "/stationary",
  },
  grocery: {
    label: "Grocery",
    endpoint: "/grocery",
  },
  clothes: {
    label: "Clothes",
    endpoint: "/clothes",
  },
  general: {
    label: "General",
    endpoint: "/general",
  },
} as const;

export type ExpenseType = keyof typeof EXPENSE_TYPES;
