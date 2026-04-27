import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";


function UpdateResult() {
    const { pk } = useParams(); // Gets the ID from the URL path
    const navigate = useNavigate();
    
    // Initialize state with empty strings to prevent "uncontrolled input" errors
    const [formData, setFormData] = useState({
        student: '',
        marks: ''
    });
    const [loading, setLoading] = useState(true);

    // 1. GET: Fetch existing data when the component loads
    useEffect(() => {
        api.get(`/result/update_result/${pk}/`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching result:", err);
                setLoading(false);
            });
    }, [pk]);

    // 2. PUT: Send updated data to Django
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/result/update_result/${pk}/`, formData)
            .then(res => {
                alert("Marks updated successfully!");
                navigate('/'); // Redirect back to the list
            })
            .catch(err => {
                console.error("Update failed:", err.response?.data || err.message);
                alert("Error updating grade. Check console for details.");
            });
    };

    if (loading) return <p>Loading event data...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '500px' }}>
             <Navbar 
                user={{ username: "sammy" }}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
            <h2>Edit marks #{pk}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Student:</label><br/>
                    <input 
                        type="text" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.student || ''} 
                        onChange={(e) => setFormData({...formData, student: e.target.value})} 
                        required 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>marks:</label><br/>
                    <input 
                        type="number" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.marks || ''} 
                        onChange={(e) => setFormData({...formData, marks: e.target.value})} 
                        required 
                    />
                </div>

                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                    Update result
                </button>
                <button type="button" onClick={() => navigate('/')} style={{ marginLeft: '10px', padding: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UpdateResult;
