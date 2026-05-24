// =============================================
// components/StudentForm.jsx
// This form is used for BOTH adding and editing
// If we pass "student" prop = edit mode
// If no "student" prop = add mode
// =============================================

import { useState, useEffect } from "react";
import { FiX, FiSave } from "react-icons/fi";

// List of courses for the dropdown
const COURSES = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Mathematics",
  "Physics",
  "Business Administration",
  "Electrical Engineering",
  "Mechanical Engineering",
];

const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F", "N/A"];

function StudentForm({ student, onSubmit, onClose, isLoading }) {
  // Form state - holds all input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    grade: "N/A",
  });

  // If editing, pre-fill the form with existing student data
  useEffect(() => {
    if (student) {
      setFormData({
        name:   student.name   || "",
        email:  student.email  || "",
        age:    student.age    || "",
        course: student.course || "",
        grade:  student.grade  || "N/A",
      });
    }
  }, [student]);

  // Update formData when user types in any input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    onSubmit(formData);
  };

  const isEditMode = !!student; // true if we have a student to edit

  return (
    // Dark overlay background
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditMode ? "✏️ Edit Student" : "➕ Add New Student"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ali Hassan"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. ali@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Age and Grade - side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 20"
                min="10"
                max="60"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
            >
              <option value="">-- Select a course --</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiSave className="w-4 h-4" />
              {isLoading ? "Saving..." : isEditMode ? "Update" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
