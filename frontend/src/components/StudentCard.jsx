// =============================================
// components/StudentCard.jsx
// Displays a single student's info as a card
// Has Edit and Delete buttons
// =============================================

import { FiEdit2, FiTrash2, FiMail, FiBook, FiUser } from "react-icons/fi";

// Helper: return a color class based on the grade
function getGradeColor(grade) {
  if (grade?.startsWith("A")) return "bg-green-100 text-green-700";
  if (grade?.startsWith("B")) return "bg-blue-100 text-blue-700";
  if (grade?.startsWith("C")) return "bg-yellow-100 text-yellow-700";
  if (grade?.startsWith("D")) return "bg-orange-100 text-orange-700";
  if (grade === "F")          return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
}

// Helper: generate a background color for the avatar based on name
function getAvatarColor(name) {
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-green-500",
    "bg-rose-500",  "bg-amber-500",  "bg-teal-500",
  ];
  const index = name?.charCodeAt(0) % colors.length || 0;
  return colors[index];
}

function StudentCard({ student, onEdit, onDelete }) {
  // Get the first letter of the name for the avatar
  const initial = student.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">

      {/* Top row: avatar + name + grade badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar circle with initial */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getAvatarColor(student.name)}`}>
            {initial}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base">{student.name}</h3>
            <p className="text-sm text-gray-400">Age: {student.age}</p>
          </div>
        </div>

        {/* Grade badge */}
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${getGradeColor(student.grade)}`}>
          {student.grade || "N/A"}
        </span>
      </div>

      {/* Info rows */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiMail className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{student.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiBook className="w-4 h-4 flex-shrink-0" />
          <span>{student.course}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2 border-t border-gray-50">
        <button
          onClick={() => onEdit(student)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
        >
          <FiEdit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(student.id, student.name)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition font-medium"
        >
          <FiTrash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
