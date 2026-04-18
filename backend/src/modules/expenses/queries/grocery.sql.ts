export const groceryColumnsString = `
gr.item, gr.quantity, gr.category, gr.brand, gr.store, gr.address
`;

export const groceryJoinString = `
LEFT JOIN grocery_expenses gr ON gr.expense_id = e.id
`;

export const groceryQueryMap = {
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
