export const getStationaryExpensesQuery = `
SELECT * FROM stationary_expenses ORDER BY expense_date DESC;
`;

export const getStationaryExpensesByIdQuery = `
SELECT * FROM stationary_expenses WHERE id = ?;
`;

export const createStationaryExpensesQuery = `
INSERT INTO stationary_expenses 
(expense_date, item, amount, quantity, category, brand, store, address, rating)
VALUES (@expense_date, @item, @amount, @quantity, @category, @brand, @store, @address, @rating);
`;

export const deleteStationaryExpensesQuery = `
UPDATE stationary_expenses SET
is_deleted = 1
deleted_at = CURRENT_TIMESTAMP
WHERE id = ?
`;

export const updateStationaryExpensesQuery = `
UPDATE stationary_expenses SET 
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
