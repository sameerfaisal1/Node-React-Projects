// with repository

const StudentService = require("../repository/services/StudentService");

const studentController = {
  getAllStudents: async (req, res) => {
    const result = await StudentService.getAll();
    res.status(result.isSuccess ? 200 : 500).json(result);
  },

  getStudentById: async (req, res) => {
    const result = await StudentService.getById(req.params.id);
    res.status(result.isSuccess ? 200 : 404).json(result);
  },

  createStudent: async (req, res) => {
    const result = await StudentService.create(req.body);
    res.status(result.isSuccess ? 201 : 400).json(result);
  },

  updateStudent: async (req, res) => {
    const result = await StudentService.update(req.params.id, req.body);
    res.status(result.isSuccess ? 200 : 404).json(result);
  },

  deleteStudent: async (req, res) => {
    const result = await StudentService.delete(req.params.id);
    res.status(result.isSuccess ? 200 : 404).json(result);
  },
};

module.exports = studentController;
//old code without repository method
// const Student = require("../models/Student");

// const studentController = {
//   // ── GET ALL STUDENTS ──────────────────────
//   // GET /api/students
//   getAllStudents: async (req, res) => {
//     try {
//       const students = await Student.getAll();
//       res.status(200).json({
//         success: true,
//         count: students.length,
//         data: students,
//       });
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       res.status(500).json({
//         success: false,
//         message: "Server error while fetching students",
//       });
//     }
//   },

//   // ── GET ONE STUDENT ───────────────────────
//   // GET /api/students/:id
//   getStudentById: async (req, res) => {
//     try {
//       const student = await Student.getById(req.params.id);

//       if (!student) {
//         return res.status(404).json({
//           success: false,
//           message: "Student not found",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         data: student,
//       });
//     } catch (error) {
//       console.error("Error fetching student:", error);
//       res.status(500).json({
//         success: false,
//         message: "Server error while fetching student",
//       });
//     }
//   },

//   // ── CREATE STUDENT ────────────────────────
//   // POST /api/students
//   createStudent: async (req, res) => {
//     try {
//       const { name, email, age, course, grade } = req.body;

//       // Basic validation - check required fields
//       if (!name || !email || !age || !course) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide name, email, age, and course",
//         });
//       }

//       const result = await Student.create({ name, email, age, course, grade });

//       res.status(201).json({
//         success: true,
//         message: "Student created successfully",
//         data: { id: result.insertId, name, email, age, course, grade },
//       });
//     } catch (error) {
//       // Handle duplicate email error
//       if (error.code === "ER_DUP_ENTRY") {
//         return res.status(400).json({
//           success: false,
//           message: "Email already exists",
//         });
//       }
//       console.error("Error creating student:", error);
//       res.status(500).json({
//         success: false,
//         message: "Server error while creating student",
//       });
//     }
//   },

//   // ── UPDATE STUDENT ────────────────────────
//   // PUT /api/students/:id
//   updateStudent: async (req, res) => {
//     try {
//       const student = await Student.getById(req.params.id);

//       if (!student) {
//         return res.status(404).json({
//           success: false,
//           message: "Student not found",
//         });
//       }

//       const { name, email, age, course, grade } = req.body;
//       await Student.update(req.params.id, { name, email, age, course, grade });

//       res.status(200).json({
//         success: true,
//         message: "Student updated successfully",
//         data: { id: req.params.id, name, email, age, course, grade },
//       });
//     } catch (error) {
//       console.error("Error updating student:", error);
//       res.status(500).json({
//         success: false,
//         message: "Server error while updating student",
//       });
//     }
//   },

//   // ── DELETE STUDENT ────────────────────────
//   // DELETE /api/students/:id
//   deleteStudent: async (req, res) => {
//     try {
//       const student = await Student.getById(req.params.id);

//       if (!student) {
//         return res.status(404).json({
//           success: false,
//           message: "Student not found",
//         });
//       }

//       await Student.delete(req.params.id);

//       res.status(200).json({
//         success: true,
//         message: "Student deleted successfully",
//       });
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       res.status(500).json({
//         success: false,
//         message: "Server error while deleting student",
//       });
//     }
//   },
// };

// module.exports = studentController;
