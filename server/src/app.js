import express from "express";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/students.js";

const app = express();
app.use(express.json());

const port = 3000;

// Resolver o caminho absoluto
const __dirname = path.resolve();

// Servir os arquivos estáticos da pasta build (React)
app.use(express.static(path.join(__dirname, "client/build")));

// Rotas da API
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

// Redirecionar todas as outras rotas para o index.html (React)
app.get("*", (req, res) => {
  if (
    !req.originalUrl.startsWith("/auth") &&
    !req.originalUrl.startsWith("/students")
  ) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
