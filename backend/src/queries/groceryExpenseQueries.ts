export const groceryColumnsString = `
gr.item, gr.quantity, gr.category, gr.brand, gr.store, gr.address
`;

export const groceryJoinString = `
LEFT JOIN grocery_expenses gr ON gr.expense_id = e.id
`;

export const createGroceryExpensesQuery = `
INSERT INTO grocery_expenses 
(expense_id, item, quantity, category, brand, store, address)
VALUES (@expense_id, @item, @quantity, @category, @brand, @store, @address);
`;

export const updateGroceryExpensesQuery = `
UPDATE grocery_expenses SET 
expense_date = @expense_date,
item = @item,
amount = @amount,
quantity = @quantity,
category = @category,
brand = @brand,
store = @store,
address = @address,
rating = @rating,
updated_at = CURRENT_TIMESTAMP

WHERE id = @id
`;
