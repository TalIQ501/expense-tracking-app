import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({ default: module.HomePage }))
);

const ExpensesPage = lazy(() =>
  import("../pages/ExpensesPage").then((module) => ({
    default: module.ExpensesPage,
  }))
);

const AddExpensesPage = lazy(() =>
  import("../pages/AddExpensesPage").then((module) => ({
    default: module.AddExpensesPage,
  }))
);

export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/expenses", element: <ExpensesPage /> },
  { path: "/add", element: <AddExpensesPage /> },
];
