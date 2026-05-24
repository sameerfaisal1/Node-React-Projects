// utils/Result.js

class Result {
  constructor(isSuccess, message, data = null) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
  }

  // Result.ok([students])   → success with list
  // Result.ok(student)      → success with single object
  // Result.ok("Ali")        → success with string
  // Result.ok(true)         → success with bool
  static ok(data, message = "Success") {
    return new Result(true, message, data);
  }

  // Result.success("Deleted!") → success without data
  static success(message = "Success") {
    return new Result(true, message, null);
  }

  // Result.fail("Not found") → failure
  static fail(message = "Something went wrong") {
    return new Result(false, message, null);
  }
}

module.exports = Result;
