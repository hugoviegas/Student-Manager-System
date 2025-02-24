const express = require("express");
const app = express();
const port = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rotas principais
const studentRoutes = require("./routes/students");
app.use("/students", studentRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
