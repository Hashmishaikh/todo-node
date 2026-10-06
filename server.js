import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Todo API is up and running',
    version: '1.0.0',
    endpoints: {
      getAllTodos: 'GET /api/todos',
      getSingleTodo: 'GET /api/todos/:id',
      createTodo: 'POST /api/todos',
      updateTodo: 'PUT /api/todos/:id',
      toggleTodo: 'PATCH /api/todos/:id/toggle',
      deleteTodo: 'DELETE /api/todos/:id',
    },
  });
});

// API Routes
app.use('/api/todos', todoRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
