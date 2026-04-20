import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import "../css/TakeAttendance.css";

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
        const TeacherResponse = await axios.get(
          `http://127.0.0.1:8000/teacher/list_teacher/`
        );
        const SubjectResponse = await axios.get(
          "http://127.0.0.1:8000/result/list_subjects/"
        );
        const ClassResponse = await axios.get(
          `http://127.0.0.1:8000/all_classes/`
        );
        const StreamResponse = await axios.get(
          "http://127.0.0.1:8000/stream_list/"
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
      const response = await axios.post(
        `http://127.0.0.1:8000/teacher/add_teachersubject/`,
        formData
      );
      console.log(formData)
      alert("Teacher information updated saved successfully!");
      navigate('/teachersubject/');
    } catch (err) {
      console.error("Axios post error:", err.response?.data || err.message);
      alert("Error: " + JSON.stringify(err.response?.data));
    }
  };
  return (
    <div style={{ padding: "20px" }}>
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
        <label>subject</label>
        <select
          name="Subject"
          value={formData.Subject}
          onChange={handleChange}
          required
        >
          <option value="">-- Select subject --</option>
          {subject.map((s, index) => (
          <option key={s.id || index} value={s.id}>
          {s.name}
          </option>
            ))}
        </select>

        {/* classes */}
    <label>Classes</label>
        <select
          name="Class"
          value={formData.Class}
          onChange={handleChange}
          required
        >
          <option value="">-- Select class --</option>
          {Classes.map((c, index) => (
          <option key={c.id || index} value={c.id}>
          {c.name}
          </option>
            ))}
        </select>

        {/* stream */}
        <label>stream</label>
        <select
          name="stream"
          value={formData.stream}
          onChange={handleChange}
          required
        >
          <option value="">-- Select stream --</option>
          {stream.map((s, index) => (
          <option key={s.id || index} value={s.id}>
          {s.name}
          </option>
            ))}
        </select>
          <input type="submit" value="Submit" style={{ marginTop: "10px" }} />
      </form>
    </div>
  );
}

export default AddTeacherSubject;