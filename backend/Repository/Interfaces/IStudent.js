// repository/interfaces/IStudent.js
// INTERFACE = only function definitions, no code inside
// This is a contract — StudentService MUST implement all these

class IStudent {
  // GET all students → Result with list
  async getAll() {
    throw new Error("getAll() must be implemented");
  }

  // GET one student → Result with single student
  async getById(id) {
    throw new Error("getById() must be implemented");
  }

  // POST create student → Result with created student
  async create(data) {
    throw new Error("create() must be implemented");
  }

  // PUT update student → Result with updated student
  async update(id, data) {
    throw new Error("update() must be implemented");
  }

  // DELETE student → Result with message
  async delete(id) {
    throw new Error("delete() must be implemented");
  }
}

module.exports = IStudent;
