import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EnterResult = () => {
  const { name, Term, Subject, stream } = useParams();
  const navigate = useNavigate();
  
  const [examData, setExamData] = useState(null);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch exam data on component mount
  useEffect(() => {
    fetchExamData();
  }, [name, Term, Subject, stream]);

  const fetchExamData = async () => {
    try {
      setLoading(true);
      // Build URL based on whether stream is provided
      let url = `/api/enteresult/${name}/${Term}/${Subject}/`;
      if (stream) {
        url = `/api/enteresult/${name}/${Term}/${Subject}/${stream}/`;
      }
      
      const response = await axios.get(url);
      setExamData(response.data);
      // Initialize marks state with empty values for each student
      const initialMarks = {};
      response.data.exam.forEach((student, index) => {
        initialMarks[index] = '';
      });
      setMarks(initialMarks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch exam data. Please try again.');
      console.error('Error fetching exam data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkChange = (index, value) => {
    // Allow only numbers
    if (value === '' || /^\d+$/.test(value)) {
      setMarks(prev => ({
        ...prev,
        [index]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare marks data
      const marksList = Object.values(marks);
      
      // Validate all marks are filled
      const emptyMarks = marksList.some(mark => mark === '');
      if (emptyMarks) {
        setError('Please enter marks for all students');
        setSubmitting(false);
        return;
      }

      // Validate marks range (assuming 0-100)
      const invalidMarks = marksList.some(mark => parseInt(mark) < 0 || parseInt(mark) > 100);
      if (invalidMarks) {
        setError('Marks must be between 0 and 100');
        setSubmitting(false);
        return;
      }

      // Build URL for POST request
      let url = `/api/enteresult/${name}/${Term}/${Subject}/`;
      if (stream) {
        url = `/api/enteresult/${name}/${Term}/${Subject}/${stream}/`;
      }

      // Submit marks
      await axios.post(url, {
        subjectname: marksList
      });

      setSuccess(true);
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        navigate('/home');
      }, 2000);
      
    } catch (err) {
      setError('Failed to submit marks. Please try again.');
      console.error('Error submitting marks:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    const resetMarks = {};
    examData?.exam.forEach((_, index) => {
      resetMarks[index] = '';
    });
    setMarks(resetMarks);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading exam data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Enter Results
        </h2>
        
        {/* Exam Details */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">Exam Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Class:</span> {examData?.name}
            </div>
            <div>
              <span className="font-medium">Term:</span> {examData?.term}
            </div>
            <div>
              <span className="font-medium">Subject:</span> {examData?.subject}
            </div>
            {examData?.stream && (
              <div>
                <span className="font-medium">Stream:</span> {examData?.stream}
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Marks submitted successfully! Redirecting to home...
          </div>
        )}

        {/* Marks Entry Form */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Marks (0-100)
                  </th>
                </tr>
              </thead>
              <tbody>
                {examData?.exam.map((student, index) => (
                  <tr key={student.student_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-900">
                      {student.student_name}
                    </td>
                    <td className="px-6 py-4 border-b">
                      <input
                        type="number"
                        value={marks[index] || ''}
                        onChange={(e) => handleMarkChange(index, e.target.value)}
                        className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Marks"
                        min="0"
                        max="100"
                        step="1"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Marks'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterResult;