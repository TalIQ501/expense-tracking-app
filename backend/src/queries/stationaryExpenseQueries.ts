export const stationaryColumnsString = `
s.item, s.quantity, s.category, s.brand, s.store, s.address
`;

export const stationaryJoinString = `
LEFT JOIN stationary_expenses s ON s.expense_id = e.id
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
