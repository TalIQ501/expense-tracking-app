export const transportColumnsString = `
t.mode, t.origin, t.origin_region, t.destination, t.destination_region, t.service_name
`;

export const transportJoinString = `
LEFT JOIN transport_expenses t ON t.expense_id = e.id
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
