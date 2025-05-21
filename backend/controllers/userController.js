import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashed]);
    res.status(201).send("Usuário cadastrado");
  } catch (err) {
    res.status(400).send("Erro ao cadastrar usuário");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, "segredo", { expiresIn: "1d" });
      res.json({ token });
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  } catch {
    res.status(500).send("Erro ao autenticar");
  }
};
