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


export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/expenses", element: <ExpensesPage /> },
];
