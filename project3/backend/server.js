// filepath: /c:/Users/vikas/OneDrive/Desktop/Task/project3/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process on database connection failure
  });

// Mongoose Schema and Model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fatherName: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  studentId: { type: String, unique: true, required: true },
  presentDays: { type: Number, default: 0 },
  absentDays: { type: Number, default: 0 },
  odDays: { type: Number, default: 0 },
  attendance: [
    {
      date: { type: String, required: true },
      period: { type: Number, required: true },
      status: { type: String, enum: ["Present", "Absent", "OD"], required: true },
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

// Routes

// 1. Add a New Student
app.post('/students', async (req, res) => {
  const { name, phoneNumber, fatherName, department, year } = req.body;

  if (!name || !phoneNumber || !fatherName || !department || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const studentId = `SID${Math.floor(Math.random() * 1000000)}`;

  const student = new Student({ name, phoneNumber, fatherName, department, year, studentId });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(400).json({ message: err.message });
  }
});

// 2. Get Students by Class
app.get('/students/class/:className', async (req, res) => {
  try {
    const students = await Student.find({ department: req.params.className });
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: err.message });
  }
});

// 3. Get Attendance by Class and Date
app.get('/students/class/:className/attendance/:date', async (req, res) => {
  try {
    const students = await Student.find({ department: req.params.className });
    const attendanceRecords = students.map((student) => ({
      studentId: student.studentId,
      attendance: student.attendance.filter((record) => record.date === req.params.date),
    }));
    res.json(attendanceRecords);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ message: err.message });
  }
});

// 4. Mark or Update Attendance
app.patch('/students/:id/attendance', async (req, res) => {
  const { status, date, period } = req.body;

  if (!status || !date || !period) {
    return res.status(400).json({ message: "Status, date, and period are required" });
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Log the student data to check if attendance exists
    console.log('Student:', student);

    let attendanceRecord = student.attendance.find((record) => record.date === date && record.period === period);
    
    if (!attendanceRecord) {
      // If attendance record doesn't exist for this date and period, create a new one
      console.log(`No existing attendance found for ${date}, Period ${period}. Creating a new record.`);
      attendanceRecord = { date, period, status };
      student.attendance.push(attendanceRecord);
      
      // Adjust counters for the new status
      if (status === "Present") student.presentDays += 1;
      if (status === "Absent") student.absentDays += 1;
      if (status === "OD") student.odDays += 1;
    } else {
      // Store previous attendance state
      const previousStatus = attendanceRecord.status;

      // If status has changed, update the counters
      if (previousStatus !== status) {
        // Decrease the counter for previous status
        if (previousStatus === "Present") student.presentDays -= 1;
        if (previousStatus === "Absent") student.absentDays -= 1;
        if (previousStatus === "OD") student.odDays -= 1;

        // Increase the counter for new status
        if (status === "Present") student.presentDays += 1;
        if (status === "Absent") student.absentDays += 1;
        if (status === "OD") student.odDays += 1;

        // Update the attendance record
        attendanceRecord.status = status;
      }
    }

    // Save the updated student document
    const updatedStudent = await student.save();

    // Log the updated student data
    console.log('Updated Student:', updatedStudent);

    res.json({
      message: 'Attendance updated successfully',
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(400).json({ message: err.message });
  }
});

// Update Student Details
app.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and run schema validation
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(400).json({ message: err.message });
  }
});

// Default Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "An unexpected error occurred" });
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});