import express from "express";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/students.js";

const app = express();
app.use(express.json());

const port = 3000;

// Resolver o caminho absoluto corretamente no ES Modules
const __dirname = path.resolve();

// Servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, "client/build")));

// Rotas principais
app.use("/students", studentRoutes); // Rota para alunos
app.use("/auth", authRoutes); // Rota para autenticação

// Redirecionar todas as rotas desconhecidas para o React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
