// =============================================
// App.jsx
// Root component - sets up the layout
// Includes Toaster for notifications
// =============================================

import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import StudentsPage from "./pages/StudentsPage";

function App() {
  // Track student count to show in navbar
  const [studentCount, setStudentCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            fontWeight: "500",
          },
        }}
      />

      {/* Navigation bar */}
      <Navbar totalStudents={studentCount} />

      {/* Main page content */}
      <main>
        <StudentsPage onStudentCountChange={setStudentCount} />
      </main>
    </div>
  );
}

export default App;
