import { useState } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState<FiltersType>({ deleted: true, page_size: 20 });

  return { filters, setFilters };
};

export type FiltersType = {
  deleted: boolean;
  date_from?: Date;
  date_to?: Date;
  amount_from?: number;
  amount_to?: number;
  category?: number;
  type?: string[];
  recorded_from?: Date;
  recorded_to?: Date;
  page_size: number;
}
