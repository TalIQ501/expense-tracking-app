export const getGroceryExpensesQuery = `
SELECT * FROM grocery_expenses
WHERE is_deleted <> 1
ORDER BY expense_date DESC
;`;

export const getGroceryExpensesByIdQuery = `
SELECT * FROM grocery_expenses WHERE id = ?;
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

