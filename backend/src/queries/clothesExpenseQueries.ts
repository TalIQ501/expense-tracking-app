export const getClothesExpensesQuery = `
SELECT * FROM clothes_expenses 
WHERE is_deleted = 0
ORDER BY expense_date DESC
;
`;

export const getClothesExpensesByIdQuery = `
SELECT * FROM clothes_expenses WHERE id = ?;
`;

export const createClothesExpensesQuery = `
INSERT INTO clothes_expenses 
(expense_id, item, quantity, category, brand, store, address)
VALUES (@expense_id, @item, @quantity, @category, @brand, @store, @address);
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