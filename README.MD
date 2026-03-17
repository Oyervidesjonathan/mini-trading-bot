# 🚀 Mini Trading Bot API

A backend trading simulation system built with **FastAPI**, **PostgreSQL**, and a clean **layered architecture**.

This project demonstrates how a real-world trading backend is structured, including:
- API layer (FastAPI)
- Service layer (business logic)
- Database layer (PostgreSQL)
- Strategy evaluation
- Trade execution + persistence

---

## 📌 Features

- 📈 Simulated market price generation
- 🧠 Strategy engine (BUY / SELL / HOLD)
- 💰 Trade execution system
- 🗄️ Persistent trade storage (PostgreSQL)
- 🔍 Query trades by symbol or retrieve all trades
- ⚡ FastAPI with automatic Swagger docs
- ❤️ Health check endpoint

---

## 📸 Screenshots

### Swagger API Documentation
![Swagger UI](./screenshots/swagger.png)

---

### Trade Execution Example
![Trade Example](./screenshots/example_trade.png)

---

## 🏗️ Architecture

```mermaid
flowchart TD
    A[Client] --> B[API Layer (FastAPI)]
    B --> C[Strategy Service]
    B --> D[Trade Service]
    C --> E[Market Service]
    D --> F[Database (PostgreSQL)]
