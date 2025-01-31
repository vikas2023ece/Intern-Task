import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", user);
      setMessage(res.data.msg);
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: user.email,
        password: user.password,
      });
      setToken(res.data.token);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>User Authentication</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <p>{message}</p>
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default App;
