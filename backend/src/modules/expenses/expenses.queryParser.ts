import {
  IClothesRequestBody,
  IExpenseRequestBody,
  IFoodRequestBody,
  IGeneralRequestBody,
  IGroceryRequestBody,
  IStationaryRequestBody,
  ITransportRequestBody,
} from "shared/types/request";

const mainExpenseParser = (data: IExpenseRequestBody) => ({
  expense_date: data.expense_date?.trim(),
  amount: Number(data.amount),
  type_id: Number(data.type_id),
  rating: Number(data.rating),
});

const generalExpenseParser = (data: IGeneralRequestBody) => ({
  purpose: data.purpose?.trim(),
  description: data.description?.trim(),
  given_to: data.given_to?.trim(),
  address: data.address?.trim(),
});

const foodExpenseParser = (data: IFoodRequestBody) => ({
  item: data.item?.trim(),
  quantity: Number(data.quantity),
  outlet: data.outlet?.trim(),
  area: data.area?.trim(),
  address: data.address?.trim(),
});

const transportExpenseParser = (data: ITransportRequestBody) => ({
  mode: data.mode?.trim(),
  origin: data.origin?.trim(),
  origin_region: data.origin_region?.trim(),
  destination: data.destination?.trim(),
  destination_region: data.destination_region?.trim(),
  service_name: data.service_name?.trim(),
});

const groceryExpenseParser = (data: IGroceryRequestBody) => ({
  item: data.item?.trim(),
  quantity: Number(data.quantity),
  category: data.category?.trim(),
  brand: data.brand?.trim(),
  store: data.store?.trim(),
  address: data.address?.trim(),
});

const stationaryExpenseParser = (data: IStationaryRequestBody) => ({
  item: data.item?.trim(),
  quantity: Number(data.quantity),
  category: data.category?.trim(),
  brand: data.brand?.trim(),
  store: data.store?.trim(),
  address: data.address?.trim(),
});

const clothesExpenseParser = (data: IClothesRequestBody) => ({
  item: data.item?.trim(),
  quantity: Number(data.quantity),
  category: data.category?.trim(),
  brand: data.brand?.trim(),
  store: data.store?.trim(),
  address: data.address?.trim(),
});

export const parseExpenseMap = {
  expense: mainExpenseParser,
  general: generalExpenseParser,
  food: foodExpenseParser,
  transport: transportExpenseParser,
  stationary: stationaryExpenseParser,
  grocery: groceryExpenseParser,
  clothes: clothesExpenseParser,
};
