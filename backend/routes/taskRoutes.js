import express from 'express';
import { getTasks, getTask, createTask, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);

export default router;
