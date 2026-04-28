import React, { useState, useEffect, useContext } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import "../css/TakeAttendance.css";
import api from "../components/api";
import ReusableSelect from "../components/ReusableSelect";
import Navbar from "../components/NaVBar";
import { AuthContext } from "../context/AuthContext";
function EditTeacherSubject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState([]);
  const [Subject, setSubject] = useState([]);
  const [Classes, setClass] = useState([]);
  const [stream, setStream] = useState([]);
  const [formData, setFormData] = useState({
    teacher: "",
    Subject: "",
    Class: "",
    stream: "",
  });
  const {auth} = useContext(AuthContext);

  // Fetch users & designations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const TeacherResponse = await api.get(
          `/teacher/teachersubject_detail/${id}/`
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
        const teacherinfo = TeacherResponse.data;
        // console.log(teacherinfo.teacher);
        setTeacher(TeacherResponse.data);
        setSubject(SubjectResponse.data);
        setClass(ClassResponse.data);
        setStream(StreamResponse.data);
        setFormData({
          teacher: teacherinfo.teacher,
          Subject: teacherinfo.subject,
          Class: teacherinfo.Class,
          stream: teacherinfo.stream,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    console.log("form data", formData);
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
      const response = await api.put(
        `/teacher/teachersubject_detail/${id}/`,
        formData
      );
      alert("Teacher information updated saved successfully!");
      navigate('/teachersubject/');
    } catch (err) {
      console.error("api post error:", err.response?.data || err.message);
      alert("Error: " + JSON.stringify(err.response?.data));
    }
  };
  return (
    <div style={{ padding: "20px" }}>
       <Navbar 
        user={auth.user}
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
        <input type="text"  
          value={formData.teacher}  
          onChange={handleChange}
        />

        {/* subject */}
        {/*<label>subject</label>
        <select
          name="Subject"
          value={formData.Subject}
          onChange={handleChange}
          required
        >
          <option value="">-- Select subject --</option>
          {Subject.map((s, index) => (
          <option key={s.id || index} value={s.id}>
          {s.name}
          </option>
            ))}
        </select>*/}
        <ReusableSelect 
            label="subject"
            name="subject"
            options={data.subjects}
            value={formData.subjects}
            onChange={handleChange}
          />
        {/* classes */}
    {/*<label>Classes</label>
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
        </select>*/}
        <ReusableSelect 
            label="Class"
            name="class"
            options={data.classes}
            value={formData.class}
            onChange={handleChange}
          />

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

export default EditTeacherSubject;