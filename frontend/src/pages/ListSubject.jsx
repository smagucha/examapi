import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/api";

function SubjectsList() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. GET - Fetch all events
    useEffect(() => {
        api.get(`/result/allsubjects`) 
            .then(res => {
                setSubjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching subjects:", err);
                setLoading(false);
            });
    }, []);

    // 2. DELETE - Remove an event by ID
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            // This hits your @api_view(["DELETE"]) def event_detail(request, pk)
            api.delete(`/result/detail_subject/${id}/`)
                .then(() => {
                    // Update UI immediately by filtering out the deleted event
                    setSubjects(subjects.filter(subject => subject.id !== id));
                    alert(" deleted successfully");
                })
                .catch(err => {
                    console.error("Error deleting grade:", err);
                    alert("Failed to delete subject.");
                });
        }
    };

    if (loading) return <p>Loading subjects...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Navbar 
                user={{ username: "sammy" }}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>subjects</h2>
                <Link to="/addsubject">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add subject
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>CODE</th>
                        <th>edit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.length > 0 ? (
                        subjects.map((subject) => (
                            <tr key={subject.id}>
                                <td>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td>{subject.code}</td>
                                <td> <Link to={`/subject/edit/${subject.id}/`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(subject.id)} 
                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No subject were added.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default SubjectsList;
