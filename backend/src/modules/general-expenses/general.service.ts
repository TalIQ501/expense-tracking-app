import { generalExpenseRepository } from "./general.repository";
import type { GeneralExpenseType } from "./general";

export const generalExpenseService = (repo: generalExpenseRepository) => {
  const getAll = () => repo.findAll();

  const getById = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid general expenses ID");
    }

    const general = repo.findById(id);

    if (!general) {
      throw new Error("General Expense not found");
    }

    return general;
  };

  const create = (data: GeneralExpenseType) => {
    return repo.create(data);
  };

  const update = (id: number, data: GeneralExpenseType) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid general expense ID");
    }

    const changes = repo.update(data, id);

    if (changes === 0) {
      throw new Error("General expense not found");
    }

    return changes;
  };

  const remove = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid general expenses ID");
    }

    const result = repo.remove(id);

    if (result.changes === 0) {
      throw new Error("General expense not found")
    }
  };

  return { getAll, getById, create, update, remove };
};
