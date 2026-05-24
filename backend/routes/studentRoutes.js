// =============================================
// routes/studentRoutes.js
// ROUTES = defines the URL paths (endpoints)
// Connects URL → Controller function
// =============================================

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Define all student routes:
// GET    /api/students        → get all students
// GET    /api/students/:id    → get one student
// POST   /api/students        → create student
// PUT    /api/students/:id    → update student
// DELETE /api/students/:id    → delete student

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
