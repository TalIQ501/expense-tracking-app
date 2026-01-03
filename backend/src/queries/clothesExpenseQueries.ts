export const getClothesExpensesQuery = `
SELECT * FROM clothes_expenses ORDER BY expense_date DESC;
`;

export const getClothesExpensesByIdQuery = `
SELECT * FROM clothes_expenses WHERE id = ?;
`;

export const createClothesExpensesQuery = `
INSERT INTO clothes_expenses 
(expense_date, item, amount, quantity, category, brand, store, address, rating)
VALUES (@expense_date, @item, @amount, @quantity, @category, @brand, @store, @address, @rating);
`;

export const deleteClothesExpensesQuery = `
UPDATE clothes_expenses SET
is_deleted = 1
deleted_at = CURRENT_TIMESTAMP
WHERE id = ?
`;

export const updateClothesExpensesQuery = `
UPDATE clothes_expenses SET 
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
