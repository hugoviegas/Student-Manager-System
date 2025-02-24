let students = []; // Simulando um banco de dados na memória

// Funções do CRUD
export function getAllStudents(req, res) {
  res.status(200).json(students); // Retorna a lista de alunos
}

// Função para criar um novo aluno
export function createStudent(req, res) {
  const { name, email } = req.body; // Pega os dados do corpo da requisição
  const newStudent = { id: Date.now(), name, email }; // Cria um novo aluno
  students.push(newStudent); // Adiciona o aluno ao banco de dados
  res.status(201).json(newStudent); // Retorna o aluno criado
}

// Função para atualizar um aluno
export function updateStudent(req, res) {
  const { id } = req.params; // Pega o ID do aluno
  const { name, email } = req.body; // Pega os dados do corpo da requisição
  let student = students.find((s) => s.id == id); // Busca o aluno no banco de dados

  if (!student) {
    return res.status(404).json({ message: "Aluno não encontrado" }); // Retorna erro se o aluno não for encontrado
  }

  student.name = name || student.name; // Atualiza o nome do aluno
  student.email = email || student.email; // Atualiza o email do aluno
  res.status(200).json(student); // Retorna o aluno atualizado
}

// Função para deletar um aluno
export function deleteStudent(req, res) {
  const { id } = req.params; // Pega o ID do aluno
  students = students.filter((s) => s.id != id); // Remove o aluno do banco de dados
  res.status(200).json({ message: "Aluno removido com sucesso" }); // Retorna mensagem de sucesso
}
