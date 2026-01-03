import { useLocation, useRoutes } from "react-router-dom";
import { routes } from "./AppRoutes";
import { Suspense } from "react";
import { Navbar } from "../components/Navbar";
import { Loading } from "../components/Loading";

export const AppRouter = () => {
  const location = useLocation();
  const element = useRoutes(routes, location);

  return (
    <>
      <Navbar />
      <section className="flex flex-col p-3 gap-4 w-full max-h-10">
        <Suspense fallback={<Loading />}>
          {element}
        </Suspense>
      </section>
    </>
  );
};
