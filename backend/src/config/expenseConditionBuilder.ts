import { createClothesExpensesQuery } from "../queries/clothesExpenseQueries";
import { createFoodExpensesQuery } from "../queries/foodExpenseQueries";
import { createGeneralExpensesQuery } from "../queries/generalExpenseQueries";
import { createGroceryExpensesQuery } from "../queries/groceryExpenseQueries";
import { createStationaryExpensesQuery } from "../queries/stationaryExpenseQueries";
import { createTransportExpensesQuery } from "../queries/transportExpenseQueries";

export const expenseFilterConditionMap = {
  deleted: "e.deleted = @deleted",
  expense_date: "e.expense_date = @expense_date",
  date_from: "e.expense_date >= @date_from",
  date_to: "e.expense_date <= @date_to",
  amount: "e.amount = @amount",
  amount_from: "e.amount >= @amount_from",
  amount_to: "e.amount >= @amount_to",
  type_id: "e.type_id = @type_id",
  expense_type: "e.expense_type = @expense_type",
  recorded_at: "e.recorded_at = @recorded_at",
  recorded_from: "e.recorded_at >= @recorded_from",
  recorded_to: "e.recorded_at >= @recorded_to",
  rating: "e.rating = @rating",
  rating_from: "e.rating >= @rating_from",
  rating_to: "e.rating >= @rating_to",
};

export const createQueryMap = {
  general: createGeneralExpensesQuery,
  food: createFoodExpensesQuery,
  transport: createTransportExpensesQuery,
  grocery: createGroceryExpensesQuery,
  stationary: createStationaryExpensesQuery,
  clothes: createClothesExpensesQuery,
};

export const generalFilterConditionMap = {
  purpose: "gen.purpose = @purpose",
  description: "gen.description = @description",
  given_to: "gen.given_to = @given_to",
};

export const foodFilterConditionMap = {
  food_item: "f.item = @food_item",
  food_outlet: "f.outlet = @outlet",
  food_area: "f.area = @area",
};

export const transportFilterConditionMap = {
  transport_mode: "t.mode = @transport_mode",
  origin: "t.origin = @origin",
  origin_region: "t.origin_region = @origin_region",
  destination: "t.destination = @destination",
  destination_region: "t.destination_region = @destination_region",
  transport_service: "t.transport_service = @transport_service",
};

export const groceryFilterConditionMap = {
  grocery_item: "gr.item = @grocery_item",
  grocery_quantity: "gr.quantity = @grocery_quantity",
  grocery_category: "gr.category = @category",
  grocery_brand: "gr.brand = @grocery_brand",
  grocery_store: "gr.store = @grocery_store",
};

export const stationaryFilterConditionMap = {
  stationary_item: "s.item = @stationary_item",
  stationary_quantity: "s.quantity = @stationary_quantity",
  stationary_category: "s.category = @stationary_category",
  stationary_brand: "s.brand = @stationary_brand",
  stationary_store: "s.store = @stationary_store",
};

export const clothesFilterConditionMap = {
  clothes_item: "clo.item = @clothes_item",
  clothes_quantity: "clo.quantity = @clothes_quantity",
  clothes_category: "clo.category = @clothes_category",
  clothes_brand: "clo.brand = @clothes_brand",
  clothes_store: "clo.store = @clothes_store",
};

export const allFilterConditionMap = {
  ...expenseFilterConditionMap,
  ...generalFilterConditionMap,
  ...foodFilterConditionMap,
  ...transportFilterConditionMap,
  ...groceryFilterConditionMap,
  ...stationaryFilterConditionMap,
  ...clothesFilterConditionMap,
};
