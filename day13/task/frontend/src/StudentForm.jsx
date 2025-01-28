import React, { useState } from 'react';

function StudentForm() {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    class: '',
    section: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name || !student.age || !student.class) {
      alert('Name, Age, and Class are required.');
      return;
    }

    // Here you can make an API call to the backend to add the student
    console.log('Student Data:', student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={student.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Class: </label>
        <input
          type="text"
          name="class"
          value={student.class}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Section: </label>
        <input
          type="text"
          name="section"
          value={student.section}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;
