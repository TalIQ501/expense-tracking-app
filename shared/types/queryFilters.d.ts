export interface IExpenseFilters {
  deleted?: string;
  expense_date?: string;
  date_from?: string;
  date_to?: string;
  amount?: string;
  amount_from?: string;
  amount_to?: string;
  type_id?: string;
  expense_type?: string;
  recorded_at?: string;
  recorded_from?: string;
  recorded_to?: string;
  rating?: string;
  rating_from?: string;
  rating_to?: string;
}

export interface IPageFilters {
  page: number;
  pageSize: number;
}

export interface IGeneralFilters {
  purpose?: string;
  description?: string;
  given_to?: string;
}

export interface IFoodFilters {
  item?: string;
  outlet?: string;
  area?: string;
}

export interface ITRansportFilters {
  mode?: string;
  origin?: string;
  origin_region?: string;
  destination?: string;
  destination_region?: string;
  service_name?: string;
}

export interface IGroceryFilters {
  item?: number;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
}

export interface IStationaryFilters {
  item?: number;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
}

export interface IClothesFilters {
  item?: number;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
}

export interface ISortFilters {
  sort_desc?: boolean;
  sort_date?: boolean;
  sort_type?: boolean;
  sort_deleted_at?: boolean;
}

export type IAllConditionFilters = IExpenseFilters &
  IGeneralFilters &
  IFoodFilters &
  ITRansportFilters &
  IGroceryFilters &
  IStationaryFilters &
  IClothesFilters;

export type IAllFilters = ISortFilters & IAllConditionFilters
