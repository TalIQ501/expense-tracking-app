export const getExpensesQuery = `
SELECT * FROM expenses
WHERE is_deleted IS NULL
ORDER BY expense_date DESC;
`;

export const getExpenseByIdQuery = `
SELECT * FROM expenses
WHERE id = @id
`;

export const createExpenseQuery = `
INSERT INTO expenses
(expense_date, amount, category_id, rating)
VALUES (@expense_date, @amount, @category_id, @rating);
`;

export const removeExpenseQuery = `
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
export const deleteExpenseQuery = `

`;
