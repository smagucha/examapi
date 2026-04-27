import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import "../css/TakeAttendance.css";
import api from "../components/api";
import ReusableSelect from "../components/ReusableSelect";
import Navbar from "../components/NavBar";

function AddTeacherSubject() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState([]);
  const [subject, setSubject] = useState([]);
  const [Classes, setClass] = useState([]);
  const [stream, setStream] = useState([]);
  const [formData, setFormData] = useState({
    teacher: "",
    Subject: "",
    Class: "",
    stream: "",
  });

  // Fetch users & designations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const TeacherResponse = await api.get(
          `/teacher/list_teacher/`
        );
        const SubjectResponse = await api.get(
          `/result/list_subjects/`
        );
        const ClassResponse = await api.get(
          `/all_classes/`
        );
        const StreamResponse = await api.get(
          `/stream_list/`
        );
        setTeacher(TeacherResponse.data);
        setSubject(SubjectResponse.data);
        setClass(ClassResponse.data);
        setStream(StreamResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `/teacher/add_teachersubject/`,
        formData
      );
      alert("Teacher information updated saved successfully!");
      navigate('/teachersubject/');
    } catch (err) {
      console.error("Axios post error:", err.response?.data || err.message);
      alert("Error: " + JSON.stringify(err.response?.data));
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
        <select
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
          required
        >
          <option value="">-- Select teacher --</option>
          {teacher.map((t, index) => (
          <option key={t.id || index} value={t.id}>
          {t.full_name}
          </option>
            ))}
        </select>

        {/* subject */}
      <ReusableSelect 
        label="subject"
        name="Subject"
        options={subject}
        value={formData.Subject}
        onChange={handleChange}
      />
        {/* classes */}
      <ReusableSelect 
        label="Classes"
        name="Class"
        options={Classes}
        value={formData.Class}
        onChange={handleChange}
      />
        {/* stream */}
       <ReusableSelect 
        label="stream"
        name="stream"
        options={stream}
        value={formData.stream}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" style={{ marginTop: "10px" }} />
      </form>
    </div>
  );
}

export default AddTeacherSubject;