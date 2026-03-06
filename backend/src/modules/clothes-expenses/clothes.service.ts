import { clothesRepository } from "./clothes.repository";
import type { ClothesType } from "./clothes";

export const clothesService = (repo: clothesRepository) => {
  const getAll = () => repo.findAll();

  const getById = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid clothes expenses ID");
    }

    const clothes = repo.findById(id);

    if (!clothes) {
      throw new Error("Clothes Expense not found");
    }

    return clothes;
  };

  const create = (data: ClothesType) => {
    return repo.create(data);
  };

  const update = (id: number, data: ClothesType) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid clothes expense ID");
    }

    const changes = repo.update(data, id);

    if (changes === 0) {
      throw new Error("Clothes expense not found");
    }

    return changes;
  };

  const remove = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid clothes expenses ID");
    }

    const result = repo.remove(id);

    if (result.changes === 0) {
      throw new Error("Clothes expense not found");
    }
  };

  const getDelAll = () => repo.findDelAll();

  const getDelById = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid Query ID");
    }

    const deleted = repo.findDelById(id);

    if (!deleted) {
      throw new Error("Record not deleted or does not exist");
    }

    return deleted;
  };

  const permaDelete = (id: number) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid grocery expenses ID");
    }

    const result = repo.permaDelete(id);

    if (result.changes === 0) {
      throw new Error("");
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    getDelAll,
    getDelById,
    permaDelete,
  };
};
