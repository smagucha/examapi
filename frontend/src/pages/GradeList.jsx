import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../components/api";

const BASE_URL = "http://localhost:8000"; 

function GradeList() {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. GET - Fetch all events
    useEffect(() => {
        api.get(`/result/list_grade/`) 
            .then(res => {
                setGrades(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching grades:", err);
                setLoading(false);
            });
    }, []);

    // 2. DELETE - Remove an event by ID
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this grade?")) {
            // This hits your @api_view(["DELETE"]) def event_detail(request, pk)
            api.delete(`/result/detail_grade/${id}/`)
                .then(() => {
                    // Update UI immediately by filtering out the deleted event
                    setGrades(grades.filter(grade => grade.id !== id));
                    alert("Grade deleted successfully");
                })
                .catch(err => {
                    console.error("Error deleting grade:", err);
                    alert("Failed to delete grade.");
                });
        }
    };

    if (loading) return <p>Loading grades...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>grades</h2>
                <Link to="/addgrade">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add grade
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>PERCENT</th>
                        <th>NAME</th>
                        <th>POINTS</th>
                        <th>edit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.length > 0 ? (
                        grades.map((grade) => (
                            <tr key={grade.id}>
                                <td>{grade.id}</td>
                                <td>{grade.percent}</td>
                                <td>{grade.name}</td>
                                <td>{grade.points}</td>
                                <td> <Link to={`/updategrade/${grade.id}`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(grade.id)} 
                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No events scheduled.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GradeList;
