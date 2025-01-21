import React, { useState, useEffect, useCallback } from "react";
import axios from "../api";
import "./MarkAttendance.css";

const MarkAttendance = ({ onBack }) => {
  const [studentClass, setStudentClass] = useState("");
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});

  const fetchStudents = useCallback(async () => {
    if (studentClass) {
      try {
        const response = await axios.get(`/students/class/${studentClass}`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  }, [studentClass]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleAttendanceChange = (studentId, period, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: {
        ...prevAttendance[studentId],
        [period]: status,
      },
    }));
  };

  const handleSaveAttendance = async () => {
    if (!studentClass || !date || Object.keys(attendance).length === 0) {
      alert("Please select a class, date, and mark attendance for at least one period.");
      return;
    }

    try {
      for (const studentId in attendance) {
        for (const period in attendance[studentId]) {
          await axios.patch(`/students/${studentId}/attendance`, {
            status: attendance[studentId][period],
            date,
            period,
          });
        }
      }
      alert("Attendance saved successfully");
      setAttendance({});
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance. Please try again.");
    }
  };

  return (
    <div className="mark-attendance">
      <h2>Mark Attendance</h2>
      <select value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
        <option value="">Select Class</option>
        <option value="ECE-A">ECE-A</option>
        <option value="ECE-B">ECE-B</option>
        <option value="ECE-C">ECE-C</option>
        <option value="CSC">CSC</option>
        <option value="AIDS">AIDS</option>
        <option value="CCE">CCE</option>
        <option value="EEE">EEE</option>
        <option value="IT">IT</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.studentId}
            {[...Array(7)].map((_, period) => (
              <div key={period}>
                <span>Period {period + 1}: </span>
                <button className="animated-button" onClick={() => handleAttendanceChange(student._id, period + 1, "Present")}>Present</button>
                <button className="animated-button" onClick={() => handleAttendanceChange(student._id, period + 1, "Absent")}>Absent</button>
                <button className="animated-button" onClick={() => handleAttendanceChange(student._id, period + 1, "OD")}>OD</button>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <button className="animated-button" onClick={handleSaveAttendance}>Save Attendance</button>
      <button className="animated-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default MarkAttendance;