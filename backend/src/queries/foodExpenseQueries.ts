export const getFoodExpensesQuery = `
SELECT * FROM food_expenses
WHERE is_deleted <> 1
ORDER BY expense_date DESC
;`;

export const getFoodExpensesByIdQuery = `
SELECT * FROM food_expenses WHERE id = ?;
`;

export const createFoodExpensesQuery = `
INSERT INTO food_expenses 
(expense_id, item, quantity, outlet, area, address)
VALUES (@expense_id, @item, @outlet, @quantity, @area, @address);
`;

export const deleteFoodExpensesQuery = `
UPDATE food_expenses SET
is_deleted = 1,
deleted_at = CURRENT_TIMESTAMP
WHERE id = ?
`;

export const updateFoodExpensesQuery = `
UPDATE food_expenses SET 
expense_date = @expense_date,
item = @item,
amount = @amount,
quantity = @quantity,
outlet = @outlet,
area = @area,
address = @address,
category = @category,
rating = @rating,
updated_at = CURRENT_TIMESTAMP

WHERE id = @id
`;

export const getDeletedFoodExpensesQuery = `
SELECT * FROM food_expenses
WHERE is_deleted = 1
ORDER BY deleted_at DESC
`;

export const getDeletedFoodExpenseByIdQuery = `
SELECT * FROM food_expenses
WHERE is_deleted = 1
AND id = @id
`;

export const permaDeleteFoodExpensesQuery = `
DELETE FROM food_expenses
WHERE id = @id
AND is_deleted = 1
`;
