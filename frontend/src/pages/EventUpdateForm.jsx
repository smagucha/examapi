import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../components/api"; 

function EventUpdateForm() {
    const { pk } = useParams(); // Gets the ID from the URL path
    const navigate = useNavigate();
    
    // Initialize state with empty strings to prevent "uncontrolled input" errors
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: ''
    });
    const [loading, setLoading] = useState(true);

    // 1. GET: Fetch existing data when the component loads
    useEffect(() => {
        api.get(`/events/event/${pk}/`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching event:", err);
                setLoading(false);
            });
    }, [pk]);

    // 2. PUT: Send updated data to Django
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/events/event/${pk}/`, formData)
            .then(res => {
                alert("Event updated successfully!");
                navigate('/events/'); // Redirect back to the list
            })
            .catch(err => {
                console.error("Update failed:", err.response?.data || err.message);
                alert("Error updating event. Check console for details.");
            });
    };

    if (loading) return <p>Loading event data...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '500px' }}>
            <h2>Edit Event #{pk}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Event Name:</label><br/>
                    <input 
                        type="text" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.name || ''} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Description:</label><br/>
                    <textarea 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.description || ''} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Date:</label><br/>
                    <input 
                        type="date" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.dateevents || ''} 
                        onChange={(e) => setFormData({...formData, date: e.target.value})} 
                        required 
                    />
                </div>

                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                    Update Event
                </button>
                <button type="button" onClick={() => navigate('/events')} style={{ marginLeft: '10px', padding: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default EventUpdateForm;
