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

export const getDeletedGroceryExpensesQuery = `
SELECT * FROM grocery_expenses
WHERE is_deleted = 1
ORDER BY deleted_at DESC
`;

export const getDeletedGroceryExpenseByIdQuery = `
SELECT * FROM grocery_expenses
WHERE is_deleted = 1
AND id = @id
`;

export const permaDeleteGroceryExpensesQuery = `
DELETE FROM grocery_expenses
WHERE id = @id
AND is_deleted = 1
`;
