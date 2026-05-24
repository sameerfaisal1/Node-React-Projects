// repository/services/StudentService.js

const IStudent = require("../interfaces/IStudent");
const Result = require("../../utils/Result");
const db = require("../../config/db");

class StudentService extends IStudent {
  // 👆 extends = implements interface (like .NET)
  // If any function is missing → throws error from IStudent

  // ── GET ALL ───────────────────────────────
  async getAll() {
    try {
      const [rows] = await db.query(
        "SELECT * FROM students ORDER BY created_at DESC",
      );
      return Result.ok(rows, "Students fetched successfully");
    } catch (error) {
      return Result.fail("Error fetching students");
    }
  }

  // ── GET BY ID ─────────────────────────────
  async getById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [
        id,
      ]);
      if (!rows[0]) return Result.fail("Student not found");
      return Result.ok(rows[0], "Student fetched successfully");
    } catch (error) {
      return Result.fail("Error fetching student");
    }
  }

  // ── CREATE ────────────────────────────────
  async create(data) {
    try {
      const { name, email, age, course, grade } = data;

      // validation lives here in service
      if (!name || !email || !age || !course) {
        return Result.fail("Please provide name, email, age and course");
      }

      const [result] = await db.query(
        "INSERT INTO students (name, email, age, course, grade) VALUES (?,?,?,?,?)",
        [name, email, age, course, grade],
      );
      return Result.ok(
        { id: result.insertId, ...data },
        "Student created successfully",
      );
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return Result.fail("Email already exists");
      }
      return Result.fail("Error creating student");
    }
  }

  // ── UPDATE ────────────────────────────────
  async update(id, data) {
    try {
      const { name, email, age, course, grade } = data;

      // check exists first
      const checkResult = await this.getById(id);
      if (!checkResult.isSuccess) return Result.fail("Student not found");

      await db.query(
        "UPDATE students SET name=?, email=?, age=?, course=?, grade=? WHERE id=?",
        [name, email, age, course, grade, id],
      );
      return Result.ok({ id, ...data }, "Student updated successfully");
    } catch (error) {
      return Result.fail("Error updating student");
    }
  }

  // ── DELETE ────────────────────────────────
  async delete(id) {
    try {
      // check exists first
      const checkResult = await this.getById(id);
      if (!checkResult.isSuccess) return Result.fail("Student not found");

      await db.query("DELETE FROM students WHERE id = ?", [id]);
      return Result.success("Student deleted successfully");
    } catch (error) {
      return Result.fail("Error deleting student");
    }
  }
}

module.exports = new StudentService();
// 👆 export instance directly
//    so controller just imports and uses it
