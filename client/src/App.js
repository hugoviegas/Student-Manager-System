import express from "express";
import path from "path";

const app = express();
const port = 3000;

// Resolver o caminho absoluto
const __dirname = path.resolve();

// Servir os arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "../../client/public/")));

// Redirecionar todas as rotas desconhecidas para o React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/", "index.html"));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
