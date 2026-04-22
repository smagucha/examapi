import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../components/api";

export default function EnrollStudentsToSubject() {
  const { name, stream } = useParams();
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [message, setMessage] = useState("");

  const BASE_URL = "http://127.0.0.1:8000";

  const endpoint = stream
    ? `/result/enrollstudentstosubject/${name}/${stream}/`
    : `/result/enrollstudentstosubjectclass/${name}/`;

  useEffect(() => {
    fetchData();
  }, [name, stream]);

  const fetchData = async () => {
    try {
      const res = await api.get(endpoint);
      setStudents(res.data.students || []);
      setSubjects(res.data.subjects || []);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load students and subjects.");
    }
  };

  const handleSubjectChange = (studentId, subjectId) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [studentId]: subjectId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = Object.entries(selectedSubjects)
      .filter(([_, subjectId]) => subjectId)
      .map(([studentId, subjectId]) => ({
        student_id: Number(studentId),
        subject_id: Number(subjectId),
      }));

    if (payload.length === 0) {
      setMessage("Please select at least one subject.");
      return;
    }

    try {
      const res = await api.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(res.data.message || "Enrollment successful.");
      setSelectedSubjects({});
    } catch (error) {
      console.error(error);
      setMessage("Enrollment failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white shadow rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4 text-lg font-bold">student</th>
                <th className="p-4 text-lg font-bold">subject</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">
                      <select
                        className="border rounded px-2 py-1"
                        value={selectedSubjects[student.id] || ""}
                        onChange={(e) =>
                          handleSubjectChange(student.id, e.target.value)
                        }
                      >
                        <option value="">---------</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-4 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-4">
            <button
              type="submit"
              className="border px-4 py-2 rounded bg-white hover:bg-gray-100"
            >
              Submit
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 font-semibold text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

