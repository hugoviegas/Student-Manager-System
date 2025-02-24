const express = require("express"); // Importar o express
const app = express(); // Inicializar o express
const port = 3000; // Porta padrão

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rotas principais
const studentRoutes = require("./routes/students");
app.use("/students", studentRoutes); // Rota para alunos

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Mensagem de sucesso
});
