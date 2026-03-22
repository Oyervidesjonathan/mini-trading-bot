-- Defines Schema for Mini Trading Bot
-- Defines tables used to store executed trades
CREATE TABLE IF NOT EXISTS trades (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    status TEXT NOT NULL
    
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password, TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS portafolios (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user(id),
  balance NUMERIC DEFAULT 10000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  
);

CREATE TABLE IF NOT EXISTS positions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user(id),
  symbol TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  avg_price NUMERIC DEFAULT 0

);

