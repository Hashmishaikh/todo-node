import express from 'express';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
} from '../controllers/todoController.js';

const router = express.Router();

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

router.route('/:id/toggle')
  .patch(toggleTodoStatus);

export default router;
