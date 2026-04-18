import {
  IClothesRequestBody,
  IExpenseRequestBody,
  IFoodRequestBody,
  IGeneralRequestBody,
  IGroceryRequestBody,
  IStationaryRequestBody,
  ITransportRequestBody,
} from "shared/types/request";

const mainExpenseValidator = (data: IExpenseRequestBody) => ({
  expense_date: data.expense_date,
  amount: Number(data.amount),
  type_id: Number(data.type_id),
  rating: Number(data.rating),
});

const generalValidator = (data: IGeneralRequestBody) => ({
  purpose: data.purpose,
  description: data.description,
  given_to: data.given_to,
  address: data.address,
});

const foodValidator = (data: IFoodRequestBody) => ({
  item: data.item,
  quantity: Number(data.quantity),
  outlet: data.outlet,
  area: data.area,
  address: data.address,
});

const transportValidator = (data: ITransportRequestBody) => ({
  mode: data.mode,
  origin: data.origin,
  origin_region: data.origin_region,
  destination: data.destination,
  destination_region: data.destination_region,
  service_name: data.service_name,
});

const groceryValidator = (data: IGroceryRequestBody) => ({
  item: data.item,
  quantity: Number(data.quantity),
  category: data.category,
  brand: data.brand,
  store: data.store,
  address: data.address,
});

const stationaryValidator = (data: IStationaryRequestBody) => ({
  item: data.item,
  quantity: Number(data.quantity),
  category: data.category,
  brand: data.brand,
  store: data.store,
  address: data.address,
});

const clothesValidator = (data: IClothesRequestBody) => ({
  item: data.item,
  quantity: Number(data.quantity),
  category: data.category,
  brand: data.brand,
  store: data.store,
  address: data.address,
});

export const parseExpenseMap = {
  expense: mainExpenseValidator,
  general: generalValidator,
  food: foodValidator,
  transport: transportValidator,
  stationary: stationaryValidator,
  grocery: groceryValidator,
  clothes: clothesValidator,
};
