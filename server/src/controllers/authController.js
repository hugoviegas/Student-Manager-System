import { query } from "../db.js";
import { hash, compare } from "bcryptjs";
import pkg from "jsonwebtoken";
const { sign } = pkg;

// Registrar um novo usuário
export async function register(req, res) {
  const { name, email, password, role } = req.body;

  try {
    // Verificar se o email já está registrado
    const userExists = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Email já registrado" });
    }

    // Criptografar a senha
    const hashedPassword = await hash(password, 10);

    // Inserir o novo usuário no banco de dados
    const result = await query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role || "user"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao registrar usuário");
  }
}

// Login de um usuário
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar o usuário pelo email
    const userResult = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const user = userResult.rows[0];

    // Verificar a senha
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    // Gerar um token JWT
    const token = sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao fazer login");
  }
}
