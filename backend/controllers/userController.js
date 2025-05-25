import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
   console.log("Recebido:", req.body);

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, name, email, is_admin",
      [name, email, hashed, false] // por padrão, todo novo usuário é comum


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
    const result = await pool.query(
      "SELECT id, name, email, password, is_admin FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];
    console.log(" Usuário encontrado no banco:", user); 

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(" Senha confere?", passwordMatch); 

      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, "segredo", { expiresIn: "1d" });

        // Remova a senha antes de enviar o user
        const { password, ...userWithoutPassword } = user;
        console.log("Login bem-sucedido, retornando:", userWithoutPassword); 

        return res.json({ user: userWithoutPassword, token });
      }
    }

    console.warn(" Credenciais inválidas para:", email); 
    res.status(401).send("Credenciais inválidas");
  } catch (err) {
    console.error("Erro ao autenticar:", err); 
    res.status(500).send("Erro ao autenticar");
  }
};


