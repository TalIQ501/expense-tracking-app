import { stationaryRepository } from "./stationary.repository";
import type { StationaryType } from "./stationary";

export const stationaryService = (repo: stationaryRepository) => {
  const getAll = () => repo.findAll();

  const getById = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid stationary expenses ID");
    }

    const stationary = repo.findById(id);

    if (!stationary) {
      throw new Error("Stationary Expense not found");
    }

    return stationary;
  };

  const create = (data: StationaryType) => {
    return repo.create(data);
  };

  const update = (id: number, data: StationaryType) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid stationary expense ID");
    }

    const changes = repo.update(data, id);

    if (changes === 0) {
      throw new Error("Stationary expense not found");
    }

    return changes;
  };

  const remove = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid stationary expenses ID");
    }

    const result = repo.remove(id);

    if (result.changes === 0) {
      throw new Error("Stationary expense not found")
    }
  };

  return { getAll, getById, create, update, remove };
};
