import {
  clothesColumnsString,
  clothesJoinString,
  clothesQueryMap,
} from "./queries/clothes.sql";
import { expensesQueryMap } from "./queries/expense.sql";
import {
  foodColumnsString,
  foodJoinString,
  foodQueryMap,
} from "./queries/food.sql";
import {
  generalColumnsString,
  generalJoinString,
  generalQueryMap,
} from "./queries/general.sql";
import {
  groceryColumnsString,
  groceryJoinString,
  groceryQueryMap,
} from "./queries/grocery.sql";
import {
  stationaryColumnsString,
  stationaryJoinString,
  stationaryQueryMap,
} from "./queries/stationary.sql";
import {
  transportColumnsString,
  transportJoinString,
  transportQueryMap,
} from "./queries/transport.sql";

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

export const queryParamsMap = {
  expenses: expensesQueryMap,
  general: generalQueryMap,
  food: foodQueryMap,
  transport: transportQueryMap,
  grocery: groceryQueryMap,
  stationary: stationaryQueryMap,
  clothes: clothesQueryMap,
};

export const getDetailsQueryMap = {
  general: {
    columns: generalColumnsString,
    join: generalJoinString,
  },
  food: {
    columns: foodColumnsString,
    join: foodJoinString,
  },
  transport: {
    columns: transportColumnsString,
    join: transportJoinString,
  },
  grocery: {
    columns: groceryColumnsString,
    join: groceryJoinString,
  },
  stationary: {
    columns: stationaryColumnsString,
    join: stationaryJoinString,
  },
  clothes: {
    columns: clothesColumnsString,
    join: clothesJoinString,
  },
};

export const generalFilterConditionMap = {
  purpose: "gen.purpose = @purpose",
  description: "gen.description = @description",
  given_to: "gen.given_to = @given_to",
};

export const foodFilterConditionMap = {
  item: "f.item = @food_item",
  outlet: "f.outlet = @outlet",
  area: "f.area = @area",
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
  item: "gr.item = @grocery_item",
  quantity: "gr.quantity = @grocery_quantity",
  category: "gr.category = @category",
  brand: "gr.brand = @grocery_brand",
  store: "gr.store = @grocery_store",
};

export const stationaryFilterConditionMap = {
  item: "s.item = @stationary_item",
  quantity: "s.quantity = @stationary_quantity",
  category: "s.category = @stationary_category",
  brand: "s.brand = @stationary_brand",
  store: "s.store = @stationary_store",
};

export const clothesFilterConditionMap = {
  item: "clo.item = @clothes_item",
  quantity: "clo.quantity = @clothes_quantity",
  category: "clo.category = @clothes_category",
  brand: "clo.brand = @clothes_brand",
  store: "clo.store = @clothes_store",
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
