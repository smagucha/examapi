import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/api";
import "../css/TakeAttendance.css";

function ViewAttendance() {
  const navigate = useNavigate();

  const [data, setData] = useState({ classes: [], streams: [] });
  const [formData, setFormData] = useState({ class: "", stream: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    api
      .get(`/viewattendance/`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Failed to load data");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.class) {
      setErrorMessage("Please select a class");
      return;
    }

    setErrorMessage("");
    setSubmitting(true);

    setTimeout(() => {
      if (formData.stream) {
        navigate(
          `/viewattendanceperclass/${formData.class}/${formData.stream}/`
        );
      } else {
        navigate(`/viewattendanceperclass/${formData.class}/`);
      }
    }, 500);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="take-attendance-container">
      <div className="take-attendance-card">
        <div className="take-attendance-header">
          <h2 className="take-attendance-title">📋 view Attendance</h2>
          <p className="take-attendance-subtitle">
            Select class and optional stream
          </p>
        </div>

        {errorMessage && (
          <div className="error-message">⚠ {errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="take-attendance-form">
          <div className="form-group">
            <label className="form-label">
              Class <span className="required">*</span>
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Class</option>
              {data?.classes?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Stream (Optional)</label>
            <select
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Stream</option>
              {data?.streams?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={submitting ? "submit-btn disabled" : "submit-btn"}
            disabled={submitting}
          >
            {submitting ? "Redirecting..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ViewAttendance;