import { transportRepository } from "./transport.repository";
import type { TransportType } from "./transport";

export const transportService = (repo: transportRepository) => {
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

  const create = (data: TransportType) => {
    return repo.create(data);
  };

  const update = (id: number, data: TransportType) => {
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
      throw new Error("Transport expense not found")
    }
  };

  return { getAll, getById, create, update, remove };
};
