import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/TakeAttendance.css";
import api from "../components/api";
import ReusableSelect from "../components/ReusableSelect";
import Navbar from "../components/NaVBar";
import { AuthContext } from "../context/AuthContext";

function EditTeacherSubject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [streams, setStreams] = useState([]);

  const [formData, setFormData] = useState({
    teacher: "",
    subject: "",
    class: "",
    stream: "",
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await api.get(
          `/teacher/teachersubject_detail/${id}/`
        );

        const subjectResponse = await api.get(`/result/list_subjects/`);

        const classResponse = await api.get(`/all_classes/`);

        const streamResponse = await api.get(`/stream_list/`);

        const teacherInfo = teacherResponse.data;

        setSubjects(subjectResponse.data);
        setClasses(classResponse.data);
        setStreams(streamResponse.data);

        setFormData({
          teacher: teacherInfo.teacher || "",
          subject: teacherInfo.subject || "",
          class: teacherInfo.Class || "",
          stream: teacherInfo.stream || "",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  // Handle changes
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
      await api.put(
        `/teacher/teachersubject_detail/${id}/`,
        formData
      );

      alert("Teacher subject updated successfully!");
      navigate("/teachersubject/");
    } catch (err) {
      console.error("API error:", err.response?.data || err.message);

      alert(
        "Error: " + JSON.stringify(err.response?.data)
      );
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

      <h2>Edit Teacher Subject</h2>

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
        <input
          type="text"
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
          readOnly
        />

        {/* Subject */}
        <ReusableSelect
          label="Subject"
          name="subject"
          options={subjects}
          value={formData.subject}
          onChange={handleChange}
        />

        {/* Class */}
        <ReusableSelect
          label="Class"
          name="class"
          options={classes}
          value={formData.class}
          onChange={handleChange}
        />

        {/* Stream */}
        <label>Stream</label>
        <select
          name="stream"
          value={formData.stream}
          onChange={handleChange}
          required
        >
          <option value="">-- Select stream --</option>

          {streams.map((s, index) => (
            <option key={s.id || index} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="submit"
          value="Submit"
          style={{ marginTop: "10px" }}
        />
      </form>
    </div>
  );
}

export default EditTeacherSubject;