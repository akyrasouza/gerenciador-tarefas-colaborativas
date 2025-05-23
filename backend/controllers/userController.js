import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
   console.log("Recebido:", req.body);

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, "segredo", { expiresIn: "1d" });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
     console.error("Erro ao cadastrar:", err);
    res.status(400).send("Erro ao cadastrar usuário");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT id, name, email, password FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, "segredo", { expiresIn: "1d" });

      // Remova a senha antes de enviar o user
      const { password, ...userWithoutPassword } = user;

      res.json({ user: userWithoutPassword, token });
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao autenticar");
  }
};

