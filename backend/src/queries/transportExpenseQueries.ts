export const getTransportExpensesQuery = `
SELECT * FROM transport_expenses
WHERE is_deleted <> 1
ORDER BY expense_date DESC
;`;

export const getTransportExpensesByIdQuery = `
SELECT * FROM transport_expenses WHERE id = ?;
`;

export const createTransportExpensesQuery = `
INSERT INTO transport_expenses 
(expense_date, mode, amount, origin, origin_region, destination, destination_region, service_name, rating)
VALUES (@expense_date, @mode, @amount, @origin, @origin_region, @destination, @destination_region, @service_name, @rating);
`;

export const deleteTransportExpensesQuery = `
UPDATE transport_expenses SET
is_deleted = 1,
deleted_at = CURRENT_TIMESTAMP
WHERE id = ?
`;

export const updateTransportExpensesQuery = `
UPDATE transport_expenses SET 
expense_date = @expense_date,
amount = @amount,
mode = @mode,
origin = @origin,
origin_region = @origin_region,
destination_region = @destination_region,
service_name = @service_name,
rating = @rating,
updated_at = CURRENT_TIMESTAMP

WHERE id = @id
`;
