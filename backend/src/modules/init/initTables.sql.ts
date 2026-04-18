export const initTablesQuery = `

CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY,
    expense_date TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    type_id INTEGER REFERENCES expense_types(id),
    rating INTEGER,
    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS expense_types (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS general_expenses (
    expense_id REFERENCES expenses(id) ON DELETE CASCADE,
    purpose TEXT,
    description TEXT,
    given_to TEXT,
    address TEXT
);

CREATE TABLE IF NOT EXISTS food_expenses (
    expense_id REFERENCES expenses(id) ON DELETE CASCADE,
    item TEXT NOT NULL,
    quantity REAL DEFAULT NULL DEFAULT 1,
    outlet TEXT,
    area TEXT,
    address TEXT
);

CREATE TABLE IF NOT EXISTS transport_expenses (
    expense_id REFERENCES expenses(id) ON DELETE CASCADE,
    mode TEXT NOT NULL,
    origin TEXT NOT NULL,
    origin_region TEXT NOT NULL,
    destination TEXT NOT NULL,
    destination_region TEXT NOT NULL,
    service_name TEXT
);

CREATE TABLE IF NOT EXISTS grocery_expenses (
    expense_id REFERENCES expenses(id) ON DELETE CASCADE,
    item TEXT NOT NULL,
    quantity REAL NOT NULL DEFAULT 1,
    category TEXT,
    brand TEXT,
    store TEXT,
    address TEXT
);

CREATE TABLE IF NOT EXISTS stationary_expenses (
    expense_id REFERENCES expenses(id) ON DELETE CASCADE,
    item TEXT NOT NULL,
    quantity REAL NOT NULL DEFAULT 1,
    category TEXT NOT NULL,
    brand TEXT,
    store TEXT,
    address TEXT
);

CREATE TABLE IF NOT EXISTS clothes_expenses (
    expense_id REFERENCES expenses(id) ON DELETE CASCADE,
    item TEXT NOT NULL,
    quantity REAL NOT NULL DEFAULT 1,
    category TEXT,
    brand TEXT,
    store TEXT,
    address TEXT
);


BEGIN TRANSACTION;

INSERT OR IGNORE INTO expense_types (name) VALUES ('general');
INSERT OR IGNORE INTO expense_types (name) VALUES ('food');
INSERT OR IGNORE INTO expense_types (name) VALUES ('transport');
INSERT OR IGNORE INTO expense_types (name) VALUES ('grocery');
INSERT OR IGNORE INTO expense_types (name) VALUES ('stationary');
INSERT OR IGNORE INTO expense_types (name) VALUES ('clothes');

COMMIT;
`;
