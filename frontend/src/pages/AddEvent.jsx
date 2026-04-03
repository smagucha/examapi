import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
    const [newEvent, setNewEvent] = useState({ name: '', description: '', dateevents: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/events/add_event/", newEvent)
            .then(res => {
                alert("Event Created!");
                navigate('/events/'); // Redirect to the list view after success
            })
            .catch(err => console.error("Error creating event:", err.response.data));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add New School Event</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" placeholder="name" 
                    onChange={(e) => setNewEvent({...newEvent, name: e.target.value})} 
                    required 
                />
                 <input 
                    type="text" placeholder="description" 
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} 
                    required 
                />
                <input 
                    type="date" 
                    onChange={(e) => setNewEvent({...newEvent, dateevents: e.target.value})} 
                    required 
                />
                <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                    Create Event
                </button>
            </form>
        </div>
    );
}

export default AddEvent;
