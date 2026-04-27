import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import "../css/TakeAttendance.css";
import api from "../components/api";
import Navbar from "../components/NavBar";

function AddTeacher() {
  const [users, setUsers] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: "",
    date_of_appointment: "",
    designation: "",
    gender: "",
  });

  // ✅ Fetch form data
  useEffect(() => {
      api.get(`/teacher/form-data/`)
      .then((res) => {
        setUsers(res.data.teachers);
        setDesignations(res.data.designations);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
      });
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post(
        `/teacher/add_teacher/`,
        formData
      );

      alert(response.data.message);
      navigate('/teacherlist');

      // Reset form
      setFormData({
        user: "",
        date_of_appointment: "",
        designation: "",
        gender: "",
      });
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar 
        user={{ username: "sammy" }}
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/login";
        }} 
      />
      <h2>Add New Teacher</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        {/* Teacher */}
        <label>Teacher</label>
        <select name="user" value={formData.user} onChange={handleChange} required>
          <option value="">-- Select user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.full_name}
            </option>
          ))}
        </select>

        {/* Date */}
        <label>Date of Appointment</label>
        <input
          name="date_of_appointment"
          type="date"
          value={formData.date_of_appointment}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">-- Select gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Designation */}
        <label>Designation</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">-- Select designation --</option>
          {designations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>

        <input type="submit" value="Submit" style={{ marginTop: "10px" }} />
      </form>
    </div>
  );
}

export default AddTeacher;