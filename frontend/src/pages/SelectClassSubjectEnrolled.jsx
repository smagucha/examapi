import React, { useEffect, useState } from "react";
import api from "../components/api";
import { useNavigate } from "react-router-dom";

export default function SelectClassSubjectEnrolled() {
  const [classes, setClasses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const response = await api.get(`/result/select_class_subject_enrolled/`);

        setClasses(response.data.classes || []);
        setStreams(response.data.streams || []);
        setSubjects(response.data.subjects || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load form data.");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // stream is now optional
    if (!selectedClass || !selectedSubject) {
      setError("Please select class and subject.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(`/result/select_class_subject_enrolled/`, {
        selected_class: selectedClass,
        selected_stream: selectedStream || "",
        selected_subject: selectedSubject,
      });

      if (response.data.redirect_url) {
        navigate(response.data.redirect_url);
      } else {
        setError("No redirect URL returned from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select Class, Stream & Subject
      </h2>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Class */}
        <div>
          <label className="block mb-2 font-medium">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Stream - optional */}
        <div>
          <label className="block mb-2 font-medium">
            Stream <span className="text-gray-500">(Optional)</span>
          </label>
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- All Streams / No Stream --</option>
            {streams.map((stream, index) => (
              <option key={index} value={stream}>
                {stream}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-2 font-medium">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "View Enrolled Students"}
        </button>
      </form>
    </div>
  );
}