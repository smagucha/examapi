import { useState, useEffect, useContext } from "react";
import {  useParams } from "react-router-dom";
import api from "../components/api";
import "../css/MarksEntryTable.css";
import Navbar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

const EnterResult = () => {
  const { name, term, subject, stream} = useParams();

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const {auth} = useContext(AuthContext)

  useEffect(() => {
    // if (name && stream  && subject &&  term) {
    fetchStudents();
    // } else {
    //   setError("Missing required parameters");
    //   setLoading(false);
    // }
  }, [name, stream, term, subject ]);

  const getApiUrl = () => {
    if (stream) {
      return `/result/enterexam/${name}/${stream}/${term}/${subject}/`;
    }
    return `/result/enterexamforclass/${name}/${term}/${subject}/`;
  };
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(getApiUrl());
      setStudents(response.data);
      console.log(response.data)
      const initialMarks = {};
      response.data.forEach((students) => {
        initialMarks[students.student_id] = "";
      });
      setMarks(initialMarks);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch student data");
    } finally {
      setLoading(false);
    }
  };

  const handleMarksChange = (studentId, value) => {
    if (value === "" || /^\d+$/.test(value)) {
      if (value !== "" && (parseInt(value) < 0 || parseInt(value) > 100)) {
        setError("Marks should be between 0 and 100");
        return;
      }

      setError(null);
      setMarks((prev) => ({
        ...prev,
        [studentId]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const emptyMarks = students.some(
      (student) =>
        marks[student.student_id] === "" ||
        marks[student.student_id] === undefined
    );

    if (emptyMarks) {
      setError("Please enter marks for all students");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccessMessage("");

      const marksList = students.map((student) => marks[student.student_id]);

      await api.post(getApiUrl(), {
        subjectname: marksList,
      });

      setSuccessMessage("Marks submitted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error submitting marks:", err);
      setError("Failed to submit marks");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="marks-entry-container">
       <Navbar 
        user={auth.user}
        onLogout={() => {
        localStorage.clear();
        window.location.href = "/login";
        }} 
      />
      <div className="marks-card">
        {/* Header */}
        <div className="marks-header">
          <div>
            <h2>Enter Student Results</h2>
          </div>
          <button className="refresh-btn" onClick={fetchStudents}>
            Refresh
          </button>
        </div>

        {/* Class info */}
        <div className="exam-info-grid">
          <div className="exam-info-box">
            <span className="label">Class</span>
            <span className="value"> {name}</span>
          </div>
          <div className="exam-info-box">
            <span className="label">Term</span>
            <span className="value"> {term}</span>
          </div>
          <div className="exam-info-box">
            <span className="label">Subject</span>
            <span className="value"> {subject}</span>
          </div>
          <div className="exam-info-box">
            <span className="label">Stream</span>
            <span className="value"> {stream || "N/A"}</span>
          </div>
        </div>

        {/* Alerts */}
        {error && <div className="alert error-alert">{error}</div>}
        {successMessage && (
          <div className="alert success-alert">{successMessage}</div>
        )}

        {/* Content */}
        {loading ? (
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="empty-box">
            <p>No students found for this selection.</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Term</th>
                    <th>Subject</th>
                    <th>Stream</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.student_id}>
                      <td>{index + 1}</td>
                      <td className="readonly-cell">{student.student_name}</td>
                      <td className="readonly-cell">{name}</td>
                      <td className="readonly-cell">{term}</td>
                      <td className="readonly-cell">{subject}</td>
                      <td className="readonly-cell">{stream || "N/A"}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={marks[student.student_id] || ""}
                          onChange={(e) =>
                            handleMarksChange(
                              student.student_id,
                              e.target.value
                            )
                          }
                          className="marks-input"
                          placeholder="0 - 100"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="submit-section">
              <div className="student-count">
                Total Students: <strong>{students.length}</strong>
              </div>

              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Marks"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnterResult;