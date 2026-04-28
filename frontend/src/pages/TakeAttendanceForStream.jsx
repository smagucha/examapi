import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../components/api";
import "../css/TakeAttendanceForStream.css";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";
function TakeAttendanceForStream() {
  const { name, stream } = useParams();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {auth} = useContext(AuthContext);
  useEffect(() => {
    let url = "";

    if (stream) {
      url = `/take_attendance_for_stream/${name}/${stream}/`;
    } else {
      url = `/take_attendance/${name}/`;
    }

    api
      .get(url)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);

          const initialAttendance = res.data.map((student) => ({
            student_id: student.student_id,
            present_status: "present",
            reason: "",
          }));

          setAttendance(initialAttendance);
        } else {
          setError(res.data || "No student data found");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load students");
        setLoading(false);
      });
  }, [name, stream]);

  const handleAttendanceChange = (studentId, field, value) => {
    setAttendance((prev) =>
      prev.map((record) =>
        record.student_id === studentId
          ? { ...record, [field]: value }
          : record
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    let url = "";

    if (stream) {
      url = `/take_attendance_for_stream/${name}/${stream}/`;
    } else {
      url = `/take_attendance/${name}/`;
    }

    try {
      const res = await api.post(url, attendance, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(res.data.message || "Attendance submitted successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to submit attendance");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="attendance-loading-container">
        <div className="attendance-spinner"></div>
        <p className="attendance-loading-text">Loading students...</p>
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
    <div className="attendance-page">
      <div className="attendance-card">
        <div className="attendance-header">
          <h2 className="attendance-title">📋 Take Attendance</h2>
          <p className="attendance-subtitle">
            Class: <strong>{name}</strong>{" "}
            {stream && (
              <>
                | Stream: <strong>{stream}</strong>
              </>
            )}
          </p>
        </div>

        {message && <div className="attendance-success">{message}</div>}
        {error && <div className="attendance-error">{error}</div>}

        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Stream</th>
                  <th>Attend</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
  {students.map((student) => {
    const current = attendance.find(
      (item) => item.student_id === student.student_id
    );

    return (
      <tr key={student.student_id}>
        <td>{student.full_name}</td>
        <td>{student.class_name}</td>
        <td>{student.stream_name}</td>
        <td>
          <select
            className="status-select"
            value={current?.present_status || "present"}
            onChange={(e) =>
              handleAttendanceChange(
                student.student_id,
                "present_status",
                e.target.value
              )
            }
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </td>
        <td>
          {current?.present_status === "absent" ? (
            <input
              type="text"
              className="reason-input"
              placeholder="Reason (optional)"
              value={current?.reason || ""}
              onChange={(e) =>
                handleAttendanceChange(
                  student.student_id,
                  "reason",
                  e.target.value
                )
              }
            />
          ) : (
            <span className="no-reason">—</span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
            </table>
          </div>

          <button
            type="submit"
            className={
              submitting
                ? "attendance-submit disabled"
                : "attendance-submit"
            }
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default TakeAttendanceForStream;