import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/api";
import "../css/TakeAttendance.css";
import SelectReusable from "../components/SelectReusable";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";
function ResultStreamorTerm() {
  const navigate = useNavigate();

  const [data, setData] = useState({ classes: [], streams: [], terms: [] });
  const [formData, setFormData] = useState({ class: "", stream: "" , term: ""});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {auth} = useContext(AuthContext);
  useEffect(() => {
    api
      .get(`/result/selectstreamorclassforresult/`)
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
          `/resultstreamterm/${formData.class}/${formData.stream}/${formData.term}/`
        );
      } else {
        navigate(`/resultperclassterm/${formData.class}/${formData.term}/`);
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
    <div>
      <Navbar 
        user={auth.user}
        onLogout={() => {
        localStorage.clear();
        window.location.href = "/login";
        }} 
      />
    <div className="take-attendance-container">
      <div className="take-attendance-card">
        <div className="take-attendance-header">
          <h2 className="take-attendance-title">📋 enter result</h2>
          <p className="take-attendance-subtitle">
            Select class and optional stream
          </p>
        </div>

        {errorMessage && (
          <div className="error-message">⚠ {errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="take-attendance-form">
          <SelectReusable 
            label="Class"
            name="class"
            options={data.classes}
            value={formData.class}
            onChange={handleChange}
          />
          <SelectReusable 
            label="Stream (Optional)"
            name="stream"
            options={data.streams}
            value={formData.stream}
            onChange={handleChange}
          />
          <SelectReusable 
            label="term"
            name="term"
            options={data.terms}
            value={formData.term}
            onChange={handleChange}
          />
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
  </div>
  );
}

export default ResultStreamorTerm;