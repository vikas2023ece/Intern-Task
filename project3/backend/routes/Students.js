// filepath: /project3/backend/routes/Students.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Generate a unique student ID
const { v4: uuidv4 } = require('uuid');

const generateStudentId = () => {
  return `SID${uuidv4().slice(0, 6)}`; // Generates a shorter unique ID
};

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get students by class
router.get("/class/:className", async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.className });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new student
router.post("/", async (req, res) => {
  const { name, class: studentClass } = req.body;
  const studentId = generateStudentId();

  const student = new Student({ name, class: studentClass, studentId });
  
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error while saving student:", err); // Log the error details
    res.status(400).json({ message: "Failed to add student. Please try again.", error: err.message });
  }
});

// Mark attendance
router.patch("/:id", async (req, res) => {
  const { present } = req.body; // Boolean to mark present or absent

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (present) student.presentDays += 1;
    else student.absentDays += 1;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit attendance
router.put("/:id", async (req, res) => {
  const { presentDays, absentDays } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.presentDays = presentDays;
    student.absentDays = absentDays;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;