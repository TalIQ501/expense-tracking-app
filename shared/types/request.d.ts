export interface IExpenseRequestBody {
  expense_date: string;
  amount: number;
  type_id: number;
  rating?: number;
}

export interface IGeneralRequestBody {
  purpose?: string;
  description?: string;
  given_to?: string;
  address?: string;
}

export interface IFoodRequestBody {
  item?: string;
  quantity?: number;
  outlet?: number;
  area?: number;
  address?: string;
}

export interface ITransportRequestBody {
  mode?: string;
  origin?: string;
  origin_region?: string;
  destination?: string;
  destination_region?: string;
  service_name?: string;
}

export interface IGroceryRequestBody {
  item?: string;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
  address?: string;
}

export interface IStationaryRequestBody {
  item?: string;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
  address?: string;
}

export interface IClothesRequestBody {
  item?: string;
  quantity?: number;
  category?: string;
  brand?: string;
  store?: string;
  address?: string;
}

export interface ExpenseRequestMap {
  general: IGeneralRequestBody;
  food: IFoodRequestBody;
  transport: ITransportRequestBody;
  grocery: IGroceryRequestBody;
  stationary: IStationaryRequestBody;
  clothes: IClothesRequestBody;
}

export type ExpenseRequestTypes = keyof ExpenseRequestMap;

export type IRequestBodyExtra =
  | IGeneralRequestBody
  | IFoodRequestBody
  | ITransportRequestBody
  | IGroceryRequestBody
  | IStationaryRequestBody
  | IClothesRequestBody;

export type IRequestBody = IExpenseRequestBody & IRequestBodyExtra
