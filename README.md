# 🚀 SPY - Sales Performance & Yield Dashboard

SPY is a full-stack Sales Analytics Dashboard built using **React, Quarkus, and PostgreSQL**.  
It allows sales teams to record sales data and provides powerful admin analytics with charts, filters, and exports.

---

## 📌 Features

### ✅ Sales Entry
- Add new sales records
- Course dropdown selection
- Price & Date tracking
- Success toast notification

### 📊 Admin Dashboard
- Today’s Revenue
- Monthly Revenue
- Total Sales Count
- Highest Selling Course
- Pagination
- Dark Mode

### 📈 Analytics
- Monthly Revenue Line Chart
- Course-wise Revenue Bar Chart
- Interactive Filtering (Course & Date)

### 📁 Export
- CSV Download
- Excel Export

---

## 🏗️ Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Recharts
- XLSX (Excel Export)

Backend:
- Quarkus
- Java
- Hibernate ORM
- REST APIs

Database:
- PostgreSQL

---

## 🧠 Architecture

Frontend (React)
⬇ REST API Calls
Backend (Quarkus)
⬇ JPA/Hibernate
PostgreSQL Database

---

## 🚀 How to Run

### Backend

```bash
cd hello-backend
mvn quarkus:dev
