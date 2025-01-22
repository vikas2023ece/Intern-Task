// filepath: /project3/backend/models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  studentId: { type: String, unique: true, required: true },
  presentDays: { type: Number, default: 0 },
  absentDays: { type: Number, default: 0 },
});

module.exports = mongoose.model("Student", studentSchema);