const generalValidator = (data: Record<string, unknown>) => ({
  purpose: data.purpose,
  description: data.description,
  given_to: data.given_to,
  address: data.address,
});

const foodValidator = (data: Record<string, unknown>) => ({
  item: data.item,
  quantity: Number(data.quantity),
  outlet: data.outlet,
  area: data.area,
  address: data.address,
});

const transportValidator = (data: Record<string, unknown>) => ({
  mode: data.mode,
  origin: data.origin,
  origin_region: data.origin_region,
  destination: data.destination,
  service_name: data.service_name,
});

const groceryValidator = (data: Record<string, unknown>) => ({
  item: data.item,
  quantity: Number(data.quantity),
  category: data.category,
  brand: data.brand,
  store: data.store,
  address: data.address,
});

const stationaryValidator = (data: Record<string, unknown>) => ({
  item: data.item,
  quantity: Number(data.quantity),
  category: data.category,
  brand: data.brand,
  store: data.store,
  address: data.address,
});

const clothesValidator = (data: Record<string, unknown>) => ({
  item: data.item,
  quantity: Number(data.quantity),
  category: data.category,
  brand: data.brand,
  store: data.store,
  address: data.address,
});

export const parseExpenseMap = {
  general: generalValidator,
  food: foodValidator,
  transport: transportValidator,
  stationary: stationaryValidator,
  grocery: groceryValidator,
  clothes: clothesValidator,
};
