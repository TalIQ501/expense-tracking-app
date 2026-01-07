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
(expense_date, item, amount, quantity, category, brand, store, address, rating)
VALUES (@expense_date, @item, @amount, @quantity, @category, @brand, @store, @address, @rating);
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
