import Todo from '../models/Todo.js';

// @desc    Get all todos (with optional filtering)
// @route   GET /api/todos
// @access  Public
export const getTodos = async (req, res, next) => {
  try {
    const { completed, priority, search } = req.query;
    const filter = {};

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Public
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
export const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a todo title',
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed ?? false,
      priority: priority || 'medium',
      dueDate: dueDate || null,
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
export const updateTodo = async (req, res, next) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id of ${req.params.id}`,
      });
    }

    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description.trim();
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;

    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle todo completion status
// @route   PATCH /api/todos/:id/toggle
// @access  Public
export const toggleTodoStatus = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id of ${req.params.id}`,
      });
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      message: `Todo marked as ${updatedTodo.completed ? 'completed' : 'incomplete'}`,
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with id of ${req.params.id}`,
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
