export const getStationaryExpensesQuery = `
SELECT * FROM stationary_expenses
WHERE is_deleted <> 1
ORDER BY expense_date DESC
;`;

export const getStationaryExpensesByIdQuery = `
SELECT * FROM stationary_expenses WHERE id = @id;
`;

export const createStationaryExpensesQuery = `
INSERT INTO stationary_expenses 
(expense_id, item, quantity, category, brand, store, address)
VALUES (@expense_id, @item, @quantity, @category, @brand, @store, @address);
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