const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

// Rotas CRUD para alunos
router.get("/", studentsController.getAllStudents);
router.post("/", studentsController.createStudent);
router.put("/:id", studentsController.updateStudent);
router.delete("/:id", studentsController.deleteStudent);

module.exports = router;
