export const foodColumnsString = `
f.item, f.quantity, f.outlet, f.area, f.address
`;

export const foodJoinString = `
LEFT JOIN food_expenses f ON f.expense_id = e.id
`;

export const foodQueryMap = {
  item: {
    column: "item",
    param: "@item",
  },
  quantity: {
    column: "quantity",
    param: "@quantity",
  },
  outlet: {
    column: "outlet",
    param: "@outlet",
  },
  area: {
    column: "area",
    param: "@area",
  },
  address: {
    column: "address",
    param: "@address",
  },
};
