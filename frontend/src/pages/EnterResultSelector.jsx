import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EnterResultSelector() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selected_class: "",
    selected_term: "",
    selected_subject: "",
    selected_stream: "",
  });

  const [options, setOptions] = useState({
    classes: [],
    terms: [],
    subjects: [],
    streams: [],
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/result/enter_result_for_stream_or_class/"
        );
        
        console.log("API Response:", res.data);
        
        setOptions({
          classes: res.data.classes || [],
          terms: res.data.terms || [],
          subjects: res.data.subjects || [],
          streams: res.data.streams || [],
        });
      } catch (err) {
        console.error("GET ERROR:", err.response?.data || err.message);
        setError("Failed to load form options.");
      } finally {
        setFetching(false);
      }
    };

    fetchOptions();
  }, []);

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

    if (
      !formData.selected_class ||
      !formData.selected_term ||
      !formData.selected_subject
    ) {
      setError("Please select class, term, and subject.");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting:", formData);

      const res = await axios.post(
        "http://127.0.0.1:8000/result/enter_result_for_stream_or_class/",
        formData
      );

      console.log("POST RESPONSE:", res.data);

      if (res.data.redirect_url) {
        navigate(res.data.redirect_url);
      } else {
        setError("No redirect URL returned from server.");
      }
    } catch (err) {
      console.error("POST ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to proceed.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6 text-center text-lg font-medium">
        Loading form...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Enter Exam Results
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* CLASS */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Select Class
            </label>
            <select
              name="selected_class"
              value={formData.selected_class}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Class --</option>
              {options.classes.map((cls, index) => (
                <option key={index} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* TERM */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Select Term
            </label>
            <select
              name="selected_term"
              value={formData.selected_term}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Term --</option>
              {options.terms.map((term, index) => (
                <option key={index} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Select Subject
            </label>
            <select
              name="selected_subject"
              value={formData.selected_subject}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Subject --</option>
              {options.subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* STREAM */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Select Stream (Optional)
            </label>
            <select
              name="selected_stream"
              value={formData.selected_stream}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- No Stream / Whole Class --</option>
              {options.streams.map((stream, index) => (
                <option key={index} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:bg-blue-300"
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}