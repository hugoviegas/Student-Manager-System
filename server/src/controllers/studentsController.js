let students = []; // Simulando um banco de dados na memória

exports.getAllStudents = (req, res) => {
  res.status(200).json(students);
};

exports.createStudent = (req, res) => {
  const { name, email } = req.body;
  const newStudent = { id: Date.now(), name, email };
  students.push(newStudent);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let student = students.find((s) => s.id == id);

  if (!student) {
    return res.status(404).json({ message: "Aluno não encontrado" });
  }

  student.name = name || student.name;
  student.email = email || student.email;
  res.status(200).json(student);
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  students = students.filter((s) => s.id != id);
  res.status(200).json({ message: "Aluno removido com sucesso" });
};
