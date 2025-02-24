import { Router } from "express";
const router = Router();
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentsController.js";

// Rotas CRUD para alunos
router.get("/", getAllStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router; // Exporta as rotas para serem usadas no app.js
