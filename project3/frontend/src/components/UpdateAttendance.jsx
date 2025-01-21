import React, { useState, useEffect, useCallback } from "react";
import axios from "../api";
import "./UpdateAttendance.css";

const UpdateAttendance = ({ onBack }) => {
  const [studentClass, setStudentClass] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleAttendanceChange = (period, status) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((record) =>
        record.period === period ? { ...record, status } : record
      )
    );
  };

  const handleUpdateAttendance = async () => {
    if (!studentClass || !selectedStudent || attendance.length === 0) {
      setErrorMessage("Please select a class, student, and update attendance for at least one period.");
      return;
    }

    try {
      for (const record of attendance) {
        await axios.patch(`/students/${selectedStudent}/attendance`, {
          status: record.status,
          period: record.period,
        });
      }
      alert("Attendance updated successfully");
      setAttendance([]);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating attendance:", error);
      setErrorMessage("Failed to update attendance. Please try again.");
    }
  };

  return (
    <div className="update-attendance">
      <h2>Update Attendance</h2>
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
      <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>
      {selectedStudent && (
        <div>
          {attendance.map((record, index) => (
            <div key={index}>
              <span>Period {record.period}: </span>
              <select
                value={record.status || ""}
                onChange={(e) => handleAttendanceChange(record.period, e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="OD">OD</option>
              </select>
            </div>
          ))}
          <button className="animated-button" onClick={handleUpdateAttendance}>Update Attendance</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
      <button className="animated-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default UpdateAttendance;