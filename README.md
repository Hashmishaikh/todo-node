# Todo REST API

A RESTful Todo API built with **Node.js**, **Express**, and **MongoDB** (via **Mongoose**), following the **MVC (Model-View-Controller)** pattern.

---

## Folder Structure

```
todo/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   └── todoController.js     # Todo business logic & handlers
├── middleware/
│   └── errorHandler.js       # 404 & global error handling middleware
├── models/
│   └── Todo.js               # Mongoose Todo schema and model
├── routes/
│   └── todoRoutes.js         # API route definitions
├── .env                      # Environment variables (ignored by git)
├── .env.example              # Sample environment template
├── .gitignore                # Ignored files
├── package.json              # Project dependencies and scripts
├── server.js                 # Express application entry point
└── README.md                 # API documentation
```

---

## Setup & Running

### 1. Configure Environment Variables
Verify your `.env` file (or copy from `.env.example`):
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/todo_db
```

### 2. Run the Server
- **Production mode:**
  ```bash
  npm start
  ```
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```

---

## API Endpoints

### Base URL: `http://localhost:5001/api/todos`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API health check & endpoint list |
| `GET` | `/api/todos` | Get all todos (supports `?completed=`, `?priority=`, `?search=`) |
| `GET` | `/api/todos/:id` | Get single todo by ID |
| `POST` | `/api/todos` | Create a new todo |
| `PUT` | `/api/todos/:id` | Update existing todo |
| `PATCH` | `/api/todos/:id/toggle` | Toggle completion status |
| `DELETE` | `/api/todos/:id` | Delete todo |

---

## Request & Response Examples

### 1. Create a Todo
**`POST /api/todos`**

Request Body:
```json
{
  "title": "Buy groceries",
  "description": "Milk, Eggs, Bread",
  "priority": "high",
  "dueDate": "2026-10-10"
}
```

Response (`201 Created`):
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "670123456789abcdef012345",
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-10-10T00:00:00.000Z",
    "createdAt": "2026-10-05T12:00:00.000Z",
    "updatedAt": "2026-10-05T12:00:00.000Z"
  }
}
```

### 2. Get All Todos (with query filters)
**`GET /api/todos?completed=false&priority=high&search=groceries`**

Response (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "670123456789abcdef012345",
      "title": "Buy groceries",
      "description": "Milk, Eggs, Bread",
      "completed": false,
      "priority": "high",
      "dueDate": "2026-10-10T00:00:00.000Z",
      "createdAt": "2026-10-05T12:00:00.000Z",
      "updatedAt": "2026-10-05T12:00:00.000Z"
    }
  ]
}
```

### 3. Toggle Status
**`PATCH /api/todos/:id/toggle`**

Response (`200 OK`):
```json
{
  "success": true,
  "message": "Todo marked as completed",
  "data": {
    "_id": "670123456789abcdef012345",
    "title": "Buy groceries",
    "completed": true
  }
}
```
