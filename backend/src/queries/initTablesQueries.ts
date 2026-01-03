export const initTablesQuery = `

CREATE TABLE IF NOT EXISTS food_expenses (
    id INTEGER PRIMARY KEY,
    expense_date TEXT NOT NULL,
    item TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    quantity REAL DEFAULT NULL DEFAULT 1,
    outlet TEXT,
    area TEXT,
    address TEXT,
    rating INTEGER,
    is_deleted BOOLEAN DEFAULT 0,
    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS transport_expenses (
    id INTEGER PRIMARY KEY,
    expense_date TEXT NOT NULL,
    mode TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    origin TEXT NOT NULL,
    origin_region TEXT NOT NULL,
    destination TEXT NOT NULL,
    destination_region TEXT NOT NULL,
    service_name TEXT,
    rating INTEGER,
    is_deleted BOOLEAN DEFAULT 0,
    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS stationary_expenses (
    id INTEGER PRIMARY KEY,
    expense_date TEXT NOT NULL,
    item TEXT NOT NULL,
    amount REAL NOT NULL DEFAULT 0,
    quantity REAL NOT NULL DEFAULT 1,
    category TEXT NOT NULL,
    brand TEXT,
    store TEXT,
    address TEXT,
    rating INTEGER,
    is_deleted BOOLEAN DEFAULT 0,
    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS grocery_expenses (
    id INTEGER PRIMARY KEY,
    expense_date TEXT NOT NULL,
    item TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    quantity REAL NOT NULL DEFAULT 1,
    category TEXT,
    brand TEXT,
    store TEXT,
    address TEXT,
    rating INTEGER,
    is_deleted BOOLEAN DEFAULT 0,
    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS clothes_expenses (
    id INTEGER PRIMARY KEY,
    expense_date TEXT NOT NULL,
    item TEXT NOT NULL,
    amount REAL NOT NULL DEFAULT 0,
    quantity REAL NOT NULL DEFAULT 1,
    category TEXT,
    brand TEXT,
    store TEXT,
    address TEXT,
    rating INTEGER,
    is_deleted BOOLEAN DEFAULT 0,
    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS general_expenses (
    id INTEGER PRIMARY KEY,
    expense_date TEXT NOT NULL,
    purpose TEXT,
    amount INTEGER NOT NULL,
    description TEXT,
    given_to TEXT,
    address TEXT,
    rating INTEGER,
    is_deleted BOOLEAN DEFAULT 0,
    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at TEXT
);

`;
