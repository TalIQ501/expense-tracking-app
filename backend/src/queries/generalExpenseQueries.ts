export const getGeneralExpensesQuery = `
SELECT * FROM general_expenses 
WHERE is_deleted <> 1
ORDER BY expense_date DESC
;`;

export const getGeneralExpensesByIdQuery = `
SELECT * FROM general_expenses WHERE id = ?;
`;

export const createGeneralExpensesQuery = `
INSERT INTO general_expenses 
(expense_id, purpose, description, given_to, address)
VALUES (@expense_id, @purpose, @description, @given_to, @address);
`;

export const updateGeneralExpensesQuery = `
UPDATE general_expenses SET 
expense_date = @expense_date,
purpose = @purpose,
amount = @amount,
description = @description,
given_to = @given_to,
address = @address,
rating = @rating,
updated_at = CURRENT_TIMESTAMP

WHERE id = @id
`;