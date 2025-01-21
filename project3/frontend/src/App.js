import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import MarkAttendance from "./components/MarkAttendance";
import UpdateStudent from "./components/UpdateStudent";
import ViewAttendance from "./components/ViewAttendance";
import UpdateAttendance from "./components/UpdateAttendance";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption("");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (selectedOption === "addStudent") {
    return <AddStudent onBack={handleBack} />;
  }

  if (selectedOption === "markAttendance") {
    return <MarkAttendance onBack={handleBack} />;
  }

  if (selectedOption === "updateStudent") {
    return <UpdateStudent onBack={handleBack} />;
  }

  if (selectedOption === "viewAttendance") {
    return <ViewAttendance onBack={handleBack} />;
  }

  if (selectedOption === "updateAttendance") {
    return <UpdateAttendance onBack={handleBack} />;
  }

  return <Dashboard onSelectOption={handleSelectOption} />;
};

export default App;