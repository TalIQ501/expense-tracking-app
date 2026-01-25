import type { summaryRepository } from "./summary.repository";

export const summaryService = (repo: summaryRepository) => {
  const getSum = () => repo.getSumOfDates();

  return { getSum };
};
