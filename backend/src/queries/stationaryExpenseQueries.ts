export const stationaryColumnsString = `
s.item, s.quantity, s.category, s.brand, s.store, s.address
`;

export const stationaryJoinString = `
LEFT JOIN stationary_expenses s ON s.expense_id = e.id
`;

export const stationaryQueryMap = {
  item: {
    column: "item",
    param: "@item",
  },
  quantity: {
    column: "quantity",
    param: "@quantity",
  },
  category: {
    column: "category",
    param: "@category",
  },
  brand: {
    column: "brand",
    param: "@brand",
  },
  store: {
    column: "store",
    param: "@store",
  },
  address: {
    column: "address",
    param: "@address",
  },
};
