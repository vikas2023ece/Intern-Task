import React, { useState, useEffect, useCallback } from "react";
import axios from "../api";

const UpdateStudent = ({ onBack }) => {
  const [studentClass, setStudentClass] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
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

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setName(student.name);
    setPhoneNumber(student.phoneNumber);
    setFatherName(student.fatherName);
    setDepartment(student.department);
    setYear(student.year);
  };

  const handleUpdateStudent = async () => {
    if (!selectedStudent || !name || !phoneNumber || !fatherName || !department || !year) {
      alert("Please fill in all fields");
      return;
    }
  
    try {
      console.log("Updating student:", {
        id: selectedStudent._id,
        name,
        phoneNumber,
        fatherName,
        department,
        year,
      });
  
      const response = await axios.put(`/students/${selectedStudent._id}`, {
        name,
        phoneNumber,
        fatherName,
        department,
        year,
      });
  
      if (response.status === 200) {
        alert("Student updated successfully");
        setSelectedStudent(null);
        setName("");
        setPhoneNumber("");
        setFatherName("");
        setDepartment("");
        setYear("");
        setErrorMessage("");
        fetchStudents(); // Refresh the student list
      } else {
        console.error("Failed to update student:", response);
        setErrorMessage("Failed to update student. Please try again.");
      }
    } catch (error) {
      console.error("Error updating student:", error.response?.data || error.message);
      setErrorMessage("Failed to update student. Please try again.");
    }
  };
  
  return (
    <div className="update-student">
      <h2>Update Student</h2>
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
        {students.map((student) => (
          <li key={student._id} onClick={() => handleStudentSelect(student)}>
            {student.name} - {student.studentId}
          </li>
        ))}
      </ul>
      {selectedStudent && (
        <div>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Father's Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            <option value="ECE-A">ECE-A</option>
            <option value="ECE-B">ECE-B</option>
            <option value="ECE-C">ECE-C</option>
            <option value="CSC">CSC</option>
            <option value="AIDS">AIDS</option>
            <option value="CCE">CCE</option>
            <option value="EEE">EEE</option>
            <option value="IT">IT</option>
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
          <button onClick={handleUpdateStudent}>Update Student</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default UpdateStudent;