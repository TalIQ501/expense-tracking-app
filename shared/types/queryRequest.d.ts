export interface IExpenseFiltersRequest {
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

export interface IPageFiltersRequest {
  page: string;
  page_size: string;
}

export interface IGeneralFiltersRequest {
  purpose?: string;
  description?: string;
  given_to?: string;
}

export interface IFoodFiltersRequest {
  item?: string;
  outlet?: string;
  area?: string;
}

export interface ITRansportFiltersRequest {
  mode?: string;
  origin?: string;
  origin_region?: string;
  destination?: string;
  destination_region?: string;
  service_name?: string;
}

export interface IGroceryFiltersRequest {
  item?: string;
  quantity?: string;
  category?: string;
  brand?: string;
  store?: string;
}

export interface IStationaryFiltersRequest {
  item?: string;
  quantity?: string;
  category?: string;
  brand?: string;
  store?: string;
}

export interface IClothesFiltersRequest {
  item?: string;
  quantity?: string;
  category?: string;
  brand?: string;
  store?: string;
}

export interface ISortFiltersRequest {
  sort_desc?: string;
  sort_type?: string;
}

export type IAllConditionFiltersRequest = IExpenseFiltersRequest &
  IGeneralFiltersRequest &
  IFoodFiltersRequest &
  ITRansportFiltersRequest &
  IGroceryFiltersRequest &
  IStationaryFiltersRequest &
  IClothesFiltersRequest;

export type IAllFiltersRequest = ISortFiltersRequest & IPageFiltersRequest & IAllConditionFiltersRequest;
