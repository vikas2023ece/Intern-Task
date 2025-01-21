import React, { useState } from "react";
import axios from "../api";
import "./AddStudent.css";

const AddStudent = ({ onBack }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const handleAddStudent = async () => {
    if (!name || !phoneNumber || !fatherName || !department || !year) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Adding student with data:", { name, phoneNumber, fatherName, department, year });

    try {
      const response = await axios.post("/students", { name, phoneNumber, fatherName, department, year });
      alert(`Student added with ID: ${response.data.studentId}`);
      setName("");
      setPhoneNumber("");
      setFatherName("");
      setDepartment("");
      setYear("");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="add-student">
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="animated-input"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="animated-input"
      />
      <input
        type="text"
        placeholder="Father's Name"
        value={fatherName}
        onChange={(e) => setFatherName(e.target.value)}
        className="animated-input"
      />
      <select value={department} onChange={(e) => setDepartment(e.target.value)} className="animated-input">
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
      <select value={year} onChange={(e) => setYear(e.target.value)} className="animated-input">
        <option value="">Select Year</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
      </select>
      <button onClick={handleAddStudent} className="animated-button">Add Student</button>
      <button onClick={onBack} className="animated-button">Back</button>
    </div>
  );
};

export default AddStudent;