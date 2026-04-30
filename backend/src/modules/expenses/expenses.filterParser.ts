import { IAllFilters } from "shared/types/queryFilters";
import { IAllFiltersRequest } from "shared/types/queryRequest";

type MainFilterParserType = (filters: IAllFiltersRequest) => IAllFilters;

export const filterParser : MainFilterParserType = (filters: IAllFiltersRequest) => ({
  deleted: filters.deleted === "true" ? false : true,
  expense_date: filters.expense_date,
  date_from: filters.date_from,
  date_to: filters.date_to,
  amount: filters.amount,
  amount_from: filters.amount_from,
  amount_to: filters.amount_to,
  type_id: Number(filters.type_id),
  expense_type: filters.expense_type,
  recorded_at: filters.recorded_at,
  recorded_from: filters.recorded_from,
  recorded_to: filters.recorded_to,
  rating: Number(filters.rating),
  rating_from: Number(filters.rating_from),
  rating_to: Number(filters.rating_to),
  page: Number(filters.page),
  page_size: Number(filters.page_size),
  sort_desc: filters.sort_desc === "false" ? false : true,
  sort_type: filters.sort_type,
});
