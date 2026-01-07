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
(expense_date, item, amount, quantity, category, brand, store, address, rating)
VALUES (@expense_date, @item, @amount, @quantity, @category, @brand, @store, @address, @rating);
`;

export const deleteGroceryExpensesQuery = `
UPDATE grocery_expenses SET
is_deleted = 1,
deleted_at = CURRENT_TIMESTAMP
WHERE id = ?
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
