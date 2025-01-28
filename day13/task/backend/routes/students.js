const express = require('express');
const Student = require('../models/Student');  // Import the Student model
const router = express.Router();

// POST: Add a new student
router.post('/', async (req, res) => {
  try {
    const { name, age, class: studentClass, section } = req.body;
    if (!name || !age || !studentClass) {
      return res.status(400).json({ error: 'Name, age, and class are required' });
    }

    const student = new Student({ name, age, class: studentClass, section });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, age, class: studentClass, section } = req.body;
    if (!name || !age || !studentClass) {
      return res.status(400).json({ error: 'Name, age, and class are required' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, class: studentClass, section },
      { new: true }
    );

    if (!updatedStudent) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
