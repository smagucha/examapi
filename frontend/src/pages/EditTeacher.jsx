import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditTeacher() {
  const { id } = useParams();
  const [designations, setDesignations] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    user: "",
    date_of_appointment: "",
    designation: "",
    gender: "",
  });

  const [userName, setUserName] = useState("");

  // ✅ Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch designations
        const formRes = await axios.get(
          "http://127.0.0.1:8000/teacher/form-data/"
        );
        setDesignations(formRes.data.designations);

        // Fetch teacher
        const teacherRes = await axios.get(
          `http://127.0.0.1:8000/teacher/teacher_detail/${id}/`
        );

        const teacher = teacherRes.data;

        // ✅ USE DIRECT VALUE FROM BACKEND
        setUserName(teacher.user_name || "Unknown");

        // ✅ Set form data
        setFormData({
          user: teacher.user || "",
          date_of_appointment: teacher.date_of_appointment || "",
          designation: teacher.designation || "",
          gender: teacher.gender || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [id]);

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
      const response = await axios.put(
        `http://127.0.0.1:8000/teacher/teacher_detail/${id}/`,
        formData
      );

      alert("Teacher updated successfully!");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Update failed");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Teacher</h2>

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
        {/* ✅ USER (READ ONLY) */}
        <label>Teacher</label>
        <input type="text" value={userName} readOnly />

        {/* Date */}
        <label>Date of Appointment</label>
        <input
          type="date"
          name="date_of_appointment"
          value={formData.date_of_appointment}
          onChange={handleChange}
        />

        {/* Gender */}
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
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
        >
          <option value="">-- Select designation --</option>
          {designations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTeacher;