// =============================================
// pages/StudentsPage.jsx
// Main page - shows all students, handles
// search, add, edit, and delete actions
// =============================================

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch, FiLoader, FiInbox } from "react-icons/fi";

import studentService from "../services/studentService";
import StudentCard from "../components/StudentCard";
import StudentForm from "../components/StudentForm";

function StudentsPage({ onStudentCountChange }) {
  // ── STATE ────────────────────────────────────
  const [students, setStudents]         = useState([]);   // all students from DB
  const [filtered, setFiltered]         = useState([]);   // after search filter
  const [loading, setLoading]           = useState(true); // initial page load
  const [formLoading, setFormLoading]   = useState(false);// form submit loading
  const [showForm, setShowForm]         = useState(false);// show/hide modal
  const [editingStudent, setEditingStudent] = useState(null); // null = add mode
  const [searchQuery, setSearchQuery]   = useState("");

  // ── LOAD STUDENTS ON PAGE LOAD ───────────────
  useEffect(() => {
    fetchStudents();
  }, []);

  // ── SEARCH FILTER ────────────────────────────
  // Runs every time searchQuery or students changes
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const results = students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [searchQuery, students]);

  // ── FETCH ALL STUDENTS ───────────────────────
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
      onStudentCountChange(data.length); // update navbar count
    } catch (error) {
      toast.error("Failed to load students. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // ── OPEN FORM FOR ADDING ─────────────────────
  const handleOpenAddForm = () => {
    setEditingStudent(null); // no student = add mode
    setShowForm(true);
  };

  // ── OPEN FORM FOR EDITING ────────────────────
  const handleOpenEditForm = (student) => {
    setEditingStudent(student); // pass student = edit mode
    setShowForm(true);
  };

  // ── CLOSE FORM ───────────────────────────────
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  // ── SUBMIT FORM (ADD or EDIT) ─────────────────
  const handleSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (editingStudent) {
        // EDIT MODE
        await studentService.update(editingStudent.id, formData);
        toast.success("Student updated successfully!");
      } else {
        // ADD MODE
        await studentService.create(formData);
        toast.success("Student added successfully!");
      }

      handleCloseForm();
      fetchStudents(); // refresh the list
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  // ── DELETE STUDENT ───────────────────────────
  const handleDelete = async (id, name) => {
    // Confirm before deleting
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await studentService.delete(id);
      toast.success("Student deleted successfully!");
      fetchStudents(); // refresh the list
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  // ── RENDER ───────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Top bar: Search + Add button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search bar */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>

        {/* Add Student button */}
        <button
          onClick={handleOpenAddForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm whitespace-nowrap"
        >
          <FiPlus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Search result label */}
      {searchQuery && (
        <p className="text-sm text-gray-500 mb-4">
          Found <strong>{filtered.length}</strong> result(s) for "{searchQuery}"
        </p>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center py-24">
          <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <FiInbox className="w-16 h-16 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">No students found</p>
          <p className="text-sm mt-1">
            {searchQuery ? "Try a different search" : "Click 'Add Student' to get started"}
          </p>
        </div>
      )}

      {/* Student cards grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleOpenEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={formLoading}
        />
      )}
    </div>
  );
}

export default StudentsPage;
