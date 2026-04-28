import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../components/api";
import ReusableSelect from "../components/ReusableSelect";
import Navbar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const {auth} = useContext(AuthContext)
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
       <Navbar 
        user={auth.user}
        onLogout={() => {
        localStorage.clear();
        window.location.href = "/login";
        }} 
      />
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
        <div className="form-group">
        <label className="form-label">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">-- Select gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

        {/* Designation */}
       <ReusableSelect 
          label="Designation"
          name="designation"
          options={designations}
          value={formData.designation}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTeacher;