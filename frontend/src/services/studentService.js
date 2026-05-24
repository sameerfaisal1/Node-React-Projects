// =============================================
// services/studentService.js
// SERVICE = handles all API calls to the backend
// This keeps API logic separate from UI components
// =============================================

import axios from "axios";

// Base URL for our backend API
const API_URL = "http://localhost:5000/api/students";

const studentService = {
  // Get all students
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data.data; // return the array of students
  },

  // Get one student by ID
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  // Create a new student
  create: async (studentData) => {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  },

  // Update an existing student
  update: async (id, studentData) => {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  },

  // Delete a student
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default studentService;
