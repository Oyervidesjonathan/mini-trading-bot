CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    status TEXT NOT NULL
    
);