import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../components/api";

function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  const [formData, setFormData] = useState({
    user: "",
    date_of_appointment: "",
    designation: "",
    gender: "",
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch designations
        const formRes = await api.get("/teacher/form-data/");
        setDesignations(formRes.data.designations || []);

        // Fetch teacher
        const teacherRes = await api.get(`/teacher/teacher_detail/${id}/`);
        const teacher = teacherRes.data;

        console.log("Teacher:", teacher);

        // ✅ USE user_name from backend
        setUserName(teacher.user_name || "Unknown");

        // ✅ Keep user ID for submission
        setFormData({
          user: teacher.user || "",
          date_of_appointment: formatDate(teacher.date_of_appointment),
          designation:
            typeof teacher.designation === "object"
              ? teacher.designation.id
              : teacher.designation || "",
          gender: teacher.gender || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        designation: Number(formData.designation),
        user: Number(formData.user),
      };

      const response = await api.put(
        `/teacher/teacher_detail/${id}/`,
        payload
      );

      alert("Teacher updated successfully!");
       navigate(`/teacherlist`);
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        setError(
          typeof err.response.data === "object"
            ? JSON.stringify(err.response.data, null, 2)
            : err.response.data
        );
      } else {
        setError("Update failed");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Teacher</h2>

      {error && <pre style={{ color: "red" }}>{error}</pre>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        {/* USER */}
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
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
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