import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";

// Define your base URL once to keep things clean


function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. GET - Fetch all events
    useEffect(() => {
        api.get(`/events/event_list/`) 
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching events:", err);
                setLoading(false);
            });
    }, []);

    // 2. DELETE - Remove an event by ID
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            api.delete(`/events/event/${id}/`)
                .then(() => {
                    setEvents(events.filter(event => event.id !== id));
                    alert("Event deleted successfully");
                })
                .catch(err => {
                    console.error("Error deleting event:", err);
                    alert("Failed to delete event.");
                });
        }
    };

    if (loading) return <p>Loading events...</p>;

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
                <h2>School Events</h2>
                <Link to="/addevent">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add Event
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>edit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td>{event.description}</td>
                                <td>{event.dateevents}</td>
                                <td> <Link to={`/events/edit/${event.id}`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(event.id)} 
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

export default EventList;
