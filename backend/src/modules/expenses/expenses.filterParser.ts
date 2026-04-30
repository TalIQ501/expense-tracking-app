import { IAllFilters } from "shared/types/queryFilters";
import { IAllFiltersRequest } from "shared/types/queryRequest";

type MainFilterParserType = (filters: IAllFiltersRequest) => IAllFilters;

export const filterParser: MainFilterParserType = (
  filters: IAllFiltersRequest,
) => {
  const parsed = {
    deleted: filters.deleted === "true" ? true : false,
    expense_date: filters.expense_date,
    date_from: filters.date_from,
    date_to: filters.date_to,
    amount: filters.amount ? Number(filters.amount) : undefined,
    amount_from: filters.amount_from ? Number(filters.amount_from) : undefined,
    amount_to: filters.amount_to ? Number(filters.amount_to) : undefined,
    type_id: filters.type_id ? Number(filters.type_id) : undefined,
    expense_type: filters.expense_type,
    recorded_at: filters.recorded_at,
    recorded_from: filters.recorded_from,
    recorded_to: filters.recorded_to,
    rating: filters.rating ? Number(filters.rating) : undefined,
    rating_from: filters.rating_from ? Number(filters.rating_from) : undefined,
    rating_to: filters.rating_to ? Number(filters.rating_to) : undefined,
    page: filters.page ? Number(filters.page) : 1,
    page_size: filters.page_size ? Number(filters.page_size) : 20,
    sort_desc: filters.sort_desc === "false" ? false : true,
    sort_type: filters.sort_type,
  };

  const filtered = Object.fromEntries(
    Object.entries(parsed).filter(([_, v]) => v !== undefined || v !== null)
  );
  
  return filtered as unknown as IAllFilters;
};
