export const clothesColumnsString = `
clo.item, clo.quantity, clo.category, clo.brand, clo.brand, clo.address
`

export const clothesJoinString = `
LEFT JOIN clothes_expenses c ON clo.expense_id = e.id
`

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