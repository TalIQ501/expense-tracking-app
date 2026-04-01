export const expensesColumnsString = `
e.id, e.expense_date, e.amount, e.type_id, e.rating
`;

export const expensesFromString = `
FROM expenses e
`

export const typeNameQuery = `
SELECT name 
FROM expense_types
WHERE id = @type_id
`;

export const getExpenseByIdQuery = `
SELECT id, expense_date, amount, type_id, rating
FROM expenses
WHERE id = @id
`;

export const createExpenseQuery = `
INSERT INTO expenses
(expense_date, amount, type_id, rating)
VALUES (@expense_date, @amount, @type_id, @rating);
`;

export const softDeleteExpenseQuery = `
UPDATE expenses SET
deleted_at = CURRENT_TIMESTAMP
WHERE id = @id
`;

export const updateExpenseQuery = `
UPDATE expenses SET
last_updated_at = CURRENT_TIMESTAMP
amount = @amount
`;

export const getDeletedExpensesQuery = `
SELECT * FROM expenses
WHERE deleted_at IS NOT NULL
ORDER BY expense_date DESC;
`;

export const getDeletedExpenseByIdQuery = `
SELECT * FROM expenses
WHERE id = @id
AND deleted_at IS NOT NULL
`;
export const hardDeleteExpenseQuery = `

`;
