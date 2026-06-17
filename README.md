# 3PL Order Management System

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL

## Features

- Create Order
- View Orders
- Update Orders
- Delete Orders
- Search Orders
- Dashboard Statistics
- Business Validations

## Setup Instructions

### Backend

```bash
npm install
npm run dev
```

### Database

Import:

```text
database/3pl_order_management.sql
```

### Frontend

Open:

```text
frontend/html/index.html
```

## Business Validations

1. Quantity must be greater than 0
2. Delivery date must be after order date
3. Shipped/Delivered orders cannot be deleted