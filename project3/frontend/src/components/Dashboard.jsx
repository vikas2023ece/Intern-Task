import React from "react";
import "./Dashboard.css";

const Dashboard = ({ onSelectOption }) => {
  return (
    <div className="dashboard">
      <h2>Faculty Dashboard</h2>
      <button onClick={() => onSelectOption("addStudent")} className="animated-button">Add Student</button>
      <button onClick={() => onSelectOption("markAttendance")} className="animated-button">Mark Attendance</button>
      <button onClick={() => onSelectOption("updateStudent")} className="animated-button">Update Student</button>
      <button onClick={() => onSelectOption("viewAttendance")} className="animated-button">View Attendance</button>
      <button onClick={() => onSelectOption("updateAttendance")} className="animated-button">Update Attendance</button>
    </div>
  );
};

export default Dashboard;