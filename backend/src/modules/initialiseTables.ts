import { type Database } from "better-sqlite3";
import { initTablesQuery } from "../queries/initTablesQueries";

export const initialiseTables = (db: Database) => {
  db.exec(initTablesQuery);
};
