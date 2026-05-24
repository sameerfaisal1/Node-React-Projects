// =============================================
// components/Navbar.jsx
// Top navigation bar
// =============================================

import { FiUsers } from "react-icons/fi";

function Navbar({ totalStudents }) {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <FiUsers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Student Manager</h1>
            <p className="text-xs text-gray-400">Manage your students easily</p>
          </div>
        </div>

        {/* Student count badge */}
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
          {totalStudents} Students
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
