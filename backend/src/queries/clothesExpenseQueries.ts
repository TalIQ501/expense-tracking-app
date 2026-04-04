export const clothesColumnsString = `
clo.item, clo.quantity, clo.category, clo.brand, clo.brand, clo.address
`;

export const clothesJoinString = `
LEFT JOIN clothes_expenses c ON clo.expense_id = e.id
`;

export const clothesQueryMap = {
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
