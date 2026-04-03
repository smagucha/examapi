import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://localhost:8000"; 

function ListTerm() {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. GET - Fetch all events
    useEffect(() => {
        axios.get(`${BASE_URL}/result/list_term/`) 
            .then(res => {
                setTerms(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching terms:", err);
                setLoading(false);
            });
    }, []);

    // 2. DELETE - Remove an event by ID
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this term?")) {
            // This hits your @api_view(["DELETE"]) def event_detail(request, pk)
            axios.delete(`${BASE_URL}/result/detail_term/${id}/`)
                .then(() => {
                    // Update UI immediately by filtering out the deleted event
                    setTerms(terms.filter(term => term.id !== id));
                    alert("Term deleted successfully");
                })
                .catch(err => {
                    console.error("Error deleting Term:", err);
                    alert("Failed to delete term.");
                });
        }
    };

    if (loading) return <p>Loading terms...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>terms</h2>
                <Link to="/addterm">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add grade
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>edit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {terms.length > 0 ? (
                        terms.map((term) => (
                            <tr key={term.id}>
                                <td>{term.id}</td>
                                <td>{term.name}</td>
                                <td> <Link to={`/updateterm/${term.id}`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(term.id)} 
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

export default ListTerm;
