import { type Database } from "better-sqlite3";
import { getGeneralExpensesSumQuery } from "../../queries/sumExpenseQueries";

export const summaryRepository = (db: Database) => {
  const getSumOfDates = () => {
    return db.prepare(getGeneralExpensesSumQuery).run();
  };

  return { getSumOfDates }
};

export type summaryRepository = ReturnType<typeof summaryRepository>;
