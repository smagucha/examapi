import React, { useEffect, useState } from "react";
import api from "../components/api";
import { useParams } from "react-router-dom";

export default function SubjectsEnrolledByStudent() {
  const { name, subject, stream } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Build API URL depending on whether stream exists
  const API_URL = stream
    ? `/result/studentenrolledsubjects/${name}/${stream}/${subject}/`
    : `/result/subjects_enrolled_by_student/${name}/${subject}/`;

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(API_URL);

        console.log("API Response:", response.data);

        setStudents(
          Array.isArray(response.data?.enrolled_students)
            ? response.data.enrolled_students
            : []
        );
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load enrolled students.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledStudents();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading enrolled students...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-4 bg-red-100 text-red-700 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      {/* Header Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Enrolled Students
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Class</p>
            <h2 className="text-xl font-semibold">{name}</h2>
          </div>

          <div className="bg-green-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Subject</p>
            <h2 className="text-xl font-semibold">{subject}</h2>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Stream</p>
            <h2 className="text-xl font-semibold">
              {stream ? stream : "All Streams"}
            </h2>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Total Students</p>
            <h2 className="text-xl font-semibold">{students.length}</h2>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Student List
        </h2>

        {students.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No students enrolled for this subject.
          </div>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 border-b">#</th>
                <th className="text-left px-4 py-3 border-b">Student Name</th>
                <th className="text-left px-4 py-3 border-b">Class</th>
                <th className="text-left px-4 py-3 border-b">Stream</th>
                <th className="text-left px-4 py-3 border-b">Subject</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">
                    {student.student_name || "N/A"}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {student.class_name || name}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {student.stream || "N/A"}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {student.subject || subject}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}