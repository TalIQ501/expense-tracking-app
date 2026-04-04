export const generalColumnsString = `
gen.purpose, gen.description, gen.given_to, gen.address
`;

export const generalJoinString = `
LEFT JOIN general_expenses gen ON gen.expense_id = e.id
`;

export const generalQueryMap = {
  purpose: {
    column: "purpose",
    param: "@purpose",
  },
  description: {
    column: "description",
    param: "@description",
  },
  given_to: {
    column: "given_to",
    param: "@given_to",
  },
  address: {
    column: "address",
    param: "@address",
  },
};
