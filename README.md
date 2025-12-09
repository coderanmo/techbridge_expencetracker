# techbridge_expencetracker
Personal Finance Tracker

A full-stack application for managing personal income and expenses. Users can log transactions, organize them by category, and view financial insights through visual summaries. The system includes secure user authentication, role-based access control, and backend optimizations such as caching and rate limiting.

Features

User authentication with JWT

Role-based permissions (admin, user, read-only)

Add, update, delete, and view income/expense transactions

Category-wise and monthly summaries

Interactive charts for analytics

Search, filters, and pagination

Redis caching for frequently accessed data

API rate limiting for stability and protection

Lazy loading and optimized component rendering

Tech Stack

Frontend: React 18+, React Router, Context API, Recharts, Tailwind CSS
Backend: Node.js, Express.js,mongoDb, 
Authentication: JWT

Project Structure
/client        Frontend (React)
/server        Backend (Node.js, Express)
/database      mongoDb configuration and migrations

Core Modules
Authentication

Handles user registration, login, token generation, and route protection.

Transactions

CRUD functionality for income and expenses, including categories and filters.

Analytics

Generates monthly trends, category distribution, and income vs expense charts.

