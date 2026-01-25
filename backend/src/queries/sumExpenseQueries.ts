export const getGeneralExpensesSumQuery = `
SELECT SUM(amount) AS Total
FROM general_expenses
`;
//WHERE date BETWEEN @fromDate AND @toDate

export const getClothesExpensesSumQuery = `
SELECT SUM(amount) AS Total
FROM clothes_expenses
WHERE date BETWEEN @fromDate AND @toDate
`;

export const getTransportExpensesSumQuery = `
SELECT SUM(amount) AS Total
FROM transport_expenses
WHERE date BETWEEN @fromDate AND @toDate
`;

export const getGroceryExpensesSumQuery = `
SELECT SUM(amount) AS Total
FROM grocery_expenses
WHERE date BETWEEN @fromDate AND @toDate
`;

export const getStationaryExpensesSumQuery = `
SELECT SUM(amount) AS Total
FROM stationary_expenses
WHERE date BETWEEN @fromDate AND @toDate
`;

export const getFoodExpensesSumQuery = `
SELECT SUM(amount) AS Total
FROM food_expenses
WHERE date BETWEEN @fromDate AND @toDate
`;
