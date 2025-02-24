import express from "express";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/students.js"; // Using ES module import

const app = express();
app.use(express.json());

const port = 3000;

// Rotas principais
app.use("/students", studentRoutes); // Rota para alunos

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Importar as rotas de autenticação
app.use("/auth", authRoutes);
