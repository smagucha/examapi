import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../components/api"; 
import Navbar from "../components/NavBar";

function UpdateClass() {
    const { pk } = useParams(); // Gets the ID from the URL path
    const navigate = useNavigate();
    
    // Initialize state with empty strings to prevent "uncontrolled input" errors
    const [formData, setFormData] = useState({
        name: '',
    });
    const [loading, setLoading] = useState(true);

    // 1. GET: Fetch existing data when the component loads
    useEffect(() => {
        api.get(`/class_detail/${pk}/`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching class:", err);
                setLoading(false);
            });
    }, [pk]);

    // 2. PUT: Send updated data to Django
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/class_detail/${pk}/`, formData)
            .then(res => {
                alert("class updated successfully!");
                navigate('/listclass'); // Redirect back to the list
            })
            .catch(err => {
                console.error("Update failed:", err.response?.data || err.message);
                alert("Error updating class. Check console for details.");
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
            <h2>Edit stream #{pk}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>stream name:</label><br/>
                    <input 
                        type="text" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.name || ''} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                    />
                </div>
                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                    Update Stream
                </button>
                <button type="button" onClick={() => navigate('/listclass')} style={{ marginLeft: '10px', padding: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UpdateClass;
