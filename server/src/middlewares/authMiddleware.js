import pkg from "jsonwebtoken";
const { verify } = pkg;

// Middleware de autenticação
export default (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Acesso negado");

  try {
    const verified = verify(token, process.env.JWT_SECRET);
    req.user = verified; // Adiciona os dados do usuário à requisição
    next();
  } catch (err) {
    res.status(400).send("Token inválido");
  }
};
