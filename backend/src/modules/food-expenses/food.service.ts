import { foodRepository } from "./food.repository";
import type { FoodType } from "./food";

export const foodService = (repo: foodRepository) => {
  const getAll = () => repo.findAll();

  const getById = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid food expenses ID");
    }

    const food = repo.findById(id);

    if (!food) {
      throw new Error("Food Expense not found");
    }

    return food;
  };

  const create = (data: FoodType) => {
    if (!data.item || data.amount <= 0 || data.quantity <= 0) {
      throw new Error("Invalid food expense data");
    }

    data.expense_date = new Date();

    return repo.create(data);
  };

  const update = (id: number, data: FoodType) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid food expense ID");
    }

    const changes = repo.update(data, id);

    if (changes === 0) {
      throw new Error("Food expense not found");
    }

    return changes;
  };

  const remove = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid food expenses ID");
    }

    const result = repo.remove(id);

    if (result.changes === 0) {
      throw new Error("Food expense not found")
    }
  };

  return { getAll, getById, create, update, remove };
};
