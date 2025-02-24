import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

// Carrega as variáveis de ambiente definidas no arquivo .env
dotenv.config();

// Cria uma nova instância de Pool usando as configurações do .env
const pool = new Pool({
  user: process.env.DB_USER, // Usuário configurado no .env
  host: process.env.DB_HOST, // Host do banco, normalmente "localhost"
  database: process.env.DB_DATABASE, // Nome do banco de dados
  password: process.env.DB_PASSWORD, // Senha do usuário do banco
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Porta do PostgreSQL, geralmente 5432
});

// Ouvinte para confirmar que a conexão foi estabelecida
pool.on("connect", () => {
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

// Exporta uma função "query" que facilita a execução de comandos SQL
export const query = (text, params) => pool.query(text, params);
