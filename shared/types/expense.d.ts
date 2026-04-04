export interface IExpense {
  id: number;
  expense_date: string;
  amount: string;
  type_id: number;
  recorded_at: string;
  deleted_at?: string;
  rating?: number;
}

export interface IGeneralExpense {
  expense_id: number;
  purpose?: string;
  description?: string;
  given_to?: string;
  address?: string;
}

export interface IFoodExpense {
  expense_id: number;
  item?: string;
  quantity?: number;
  outlet?: string;
  area?: string;
  address?: string;
}

export interface ITransportExpense {
  expense_id: number;
  mode?: string;
  origin?: string;
  origin_region?: string;
  destination?: string;
  destination_region?: string;
  service_name?: string;
}

export interface IGroceryExpense {
  expense_id: number;
  item?: string;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
  address?: string;
}

export interface IStationaryExpense {
  expense_id: number;
  item?: string;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
  address?: string;
}

export interface IClothesExpense {
  expense_id: number;
  item?: string;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
  address?: string;
}

export interface ExpenseTypeMap {
  general: IGeneralExpense;
  food: IFoodExpense;
  transport: ITransportExpense;
  grocery: IGroceryExpense;
  stationary: IStationaryExpense;
  clothes: IClothesExpense;
}

export type ExpenseTypes = keyof ExpenseTypeMap;

export type IExpenseTypes =
  | IGeneralExpense
  | IFoodExpense
  | ITransportExpense
  | IGroceryExpense
  | IStationaryExpense
  | IClothesExpense;
