import { useState } from "react";
import type { IAllFilters } from "../../../shared/types/queryFilters";

export const useFilters = () => {
  const [filters, setFilters] = useState<IAllFilters>({
    deleted: false,
    page: 1,
    page_size: 20,
  });

  return { filters, setFilters };
};
