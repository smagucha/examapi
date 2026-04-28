import { useState, useEffect, useContext } from "react";
import api from "../components/api";
import { useParams, useNavigate } from 'react-router-dom'; 
import "../css/TakeAttendance.css";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";

function UpdateTeacher() {
  const { pk } = useParams();
  const [designations, setDesignations] = useState([]);
  const [formData, setFormData] = useState({
    teacher: "",
    date_of_appointment: "",
    designation: "",
    gender: "",
  });
  const auth = useContext(AuthContext);
  // Fetch users & designations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get(
          `/teacher/teacher_detail/${pk}/`
        );
        const designationResponse = await api.get(
          "/teacher/list_designation/"
        );
        setFormData(userResponse.data);
        setDesignations(designationResponse.data);
        console.log(userResponse.data)
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
      const response = await api.put(
        `/teacher/teacher_detail/${pk}/`,
        formData
      );
      console.log(formData)
      alert("Teacher information updated saved successfully!");
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
        <select
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        >
          <option value="">-- Select user --</option>
          <option value={formData.user} >
          {formData.user}
          </option>
        
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
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
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
          required
        >
          <option value="">-- Select designation --</option>
          {designations.map((d, index) => (
          <option key={d.id || index} value={d.id}>
          {d.title}
          </option>
            ))}
        </select>
          <input type="submit" value="Submit" style={{ marginTop: "10px" }} />
      </form>
    </div>
  );
}

export default UpdateTeacher;