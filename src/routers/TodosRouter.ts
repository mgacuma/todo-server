
import express, { Router } from 'express';
import TodosController from '../controllers/TodosController';

const router = Router();
const todosController = new TodosController();

router.post('/get-todos', todosController.getTodos);
router.post('/new-todo', todosController.upsertTodo);
router.post('/toggle-todo', todosController.toggleTodo);
router.post('/delete-todos', todosController.deleteTodos);

export default router;