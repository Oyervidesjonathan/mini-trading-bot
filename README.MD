# 🚀 Mini Trading Bot API

A backend trading simulation project built with FastAPI and PostgreSQL as part of my software development learning.

This project focuses on practicing core backend concepts including:
- API development with FastAPI
- Service-layer design for business logic
- Database integration with PostgreSQL
- Basic trading strategy evaluation (BUY / SELL / HOLD)
- Simulated trade execution and persistence
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

### 💻 Main Trading UI
![Main UI](screenshots/frontend_main.png)

---

### 📊 Account Summary Dashboard
![Account Summary](screenshots/account_summary.png)

---

### 🧠 Swagger API Documentation
![Swagger UI](screenshots/swagger.png)

---

### 💰 Trade Execution Example
![Trade Example](screenshots/example_trade.png)

---
## 🏗️ Architecture Flow


flowchart LR

    %% Frontend
    A[Frontend UI]

    %% API Layer
    B[FastAPI Router]

    %% Services
    C[Strategy Service]
    D[Trade Service]
    E[Market Price Service]

    %% Data
    F[(PostgreSQL)]

    %% Flows
    A -->|Run Bot / Trade| B
    A -->|Get Account| B

    B --> C
    B --> D

    C --> E
    D --> E
    D --> F

    B --> F

    %% Response
    F --> B
    E --> B
    B --> A
