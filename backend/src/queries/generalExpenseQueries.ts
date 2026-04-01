export const generalColumnsString = `
gen.purpose, gen.description, gen.given_to, gen.address
`

export const generalJoinString = `
LEFT JOIN general_expenses gen ON gen.expense_id = e.id
`

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