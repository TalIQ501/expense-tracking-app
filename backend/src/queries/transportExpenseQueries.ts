export const getTransportExpensesQuery = `
SELECT * FROM transport_expenses
ORDER BY expense_date DESC
;`;

export const getTransportExpensesByIdQuery = `
SELECT * FROM transport_expenses WHERE id = ?;
`;

export const createTransportExpensesQuery = `
INSERT INTO transport_expenses 
(expense_id, mode, origin, origin_region, destination, destination_region, service_name)
VALUES (@expense_id, @mode, @origin, @origin_region, @destination, @destination_region, @service_name);
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