import React, { useState } from "react";
import api from "./api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      const response = await api.post(
        "/useraccount/register/",
        formData
      );

      setMessage(response.data.message);

      // clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        password2: "",
      });

    } catch (error) {
      if (error.response) {
        const data = error.response.data;

        // backend custom errors
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({
            general: data.message || "Registration failed",
          });
        }
      } else {
        setErrors({
          general: "Server error. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>

      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {errors.general && (
        <p style={{ color: "red" }}>
          {errors.general}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Username */}
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {errors.username && (
            <p style={{ color: "red" }}>
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {errors.email && (
            <p style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;