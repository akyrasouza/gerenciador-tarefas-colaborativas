import { pool } from '../db.js';

export const getTasks = async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  res.json(result.rows);
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  res.json(result.rows[0]);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  await pool.query("INSERT INTO tasks (title, description) VALUES ($1, $2)", [title, description]);
  res.status(201).send("Tarefa criada");
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  await pool.query("UPDATE tasks SET title = $1, description = $2 WHERE id = $3", [title, description, id]);
  res.send("Tarefa atualizada");
};
