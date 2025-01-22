import React, { useState, useEffect, useCallback } from "react";
import axios from "../api";

const ViewAttendance = ({ onBack }) => {
  const [studentClass, setStudentClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

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

  const fetchAttendance = useCallback(async () => {
    if (studentClass) {
      try {
        const response = await axios.get(`/students/class/${studentClass}/attendance`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    }
  }, [studentClass]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const calculateAttendancePercentage = (attendance) => {
    const totalPeriods = attendance.length;
    const presentPeriods = attendance.filter(record => record.status === "Present").length;
    return (presentPeriods / totalPeriods) * 100;
  };

  return (
    <div>
      <h2>View Attendance</h2>
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
      <ul>
        {students.map((student) => {
          const studentAttendance = attendanceData.find(data => data.studentId === student.studentId);
          const attendancePercentage = studentAttendance ? calculateAttendancePercentage(studentAttendance.attendance) : 0;
          return (
            <li key={student._id}>
              {student.name} - {student.studentId}
              <ul>
                {studentAttendance && studentAttendance.attendance.map((record, index) => (
                  <li key={index}>
                    Date: {record.date}, Period: {record.period}, Status: {record.status}
                  </li>
                ))}
              </ul>
              <p>Attendance Percentage: {attendancePercentage.toFixed(2)}%</p>
            </li>
          );
        })}
      </ul>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ViewAttendance;