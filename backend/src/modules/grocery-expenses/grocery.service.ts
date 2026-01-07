import { groceryRepository } from "./grocery.repository";
import type { GroceryType } from "./grocery";

export const groceryService = (repo: groceryRepository) => {
  const getAll = () => repo.findAll();

  const getById = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid grocery expenses ID");
    }

    const grocery = repo.findById(id);

    if (!grocery) {
      throw new Error("Grocery Expense not found");
    }

    return grocery;
  };

  const create = (data: GroceryType) => {
    return repo.create(data);
  };

  const update = (id: number, data: GroceryType) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid grocery expense ID");
    }

    const changes = repo.update(data, id);

    if (changes === 0) {
      throw new Error("Grocery expense not found");
    }

    return changes;
  };

  const remove = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid grocery expenses ID");
    }

    const result = repo.remove(id);

    if (result.changes === 0) {
      throw new Error("Grocery expense not found");
    }
  };

  return { getAll, getById, create, update, remove };
};
