export const transportColumnsString = `
t.mode, t.origin, t.origin_region, t.destination, t.destination_region, t.service_name
`;

export const transportJoinString = `
LEFT JOIN transport_expenses t ON t.expense_id = e.id
`;

export const transportQueryMap = {
  mode: {
    column: "mode",
    param: "@mode",
  },
  origin: {
    column: "origin",
    param: "@origin",
  },
  origin_region: {
    column: "origin_region",
    param: "@origin_region",
  },
  destination: {
    column: "destination",
    param: "@destination",
  },
  destination_region: {
    column: "destination_region",
    param: "@destination_region",
  },
  service_name: {
    column: "service_name",
    param: "@service_name",
  },
};
