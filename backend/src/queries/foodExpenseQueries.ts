export const foodColumnsString = `
f.item, f.quantity, f.outlet, f.area, f.address
`;

export const foodJoinString = `
LEFT JOIN food_expenses f ON f.expense_id = e.id
`;

export const createFoodExpensesQuery = `
INSERT INTO food_expenses 
(expense_id, item, quantity, outlet, area, address)
VALUES (@expense_id, @item, @quantity, @outlet, @area, @address);
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
