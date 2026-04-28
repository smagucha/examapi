import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";
function UpdateGrade() {
    const { pk } = useParams(); // Gets the ID from the URL path
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    // Initialize state with empty strings to prevent "uncontrolled input" errors
    const [formData, setFormData] = useState({
        name: '',
        points: '',
        percent: ''
    });
    const [loading, setLoading] = useState(true);

    // 1. GET: Fetch existing data when the component loads
    useEffect(() => {
        api.get(`/result/detail_grade/${pk}/`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching grade:", err);
                setLoading(false);
            });
    }, [pk]);

    // 2. PUT: Send updated data to Django
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/result/detail_grade/${pk}/`, formData)
            .then(res => {
                alert("Event updated successfully!");
                navigate('/gradelist'); // Redirect back to the list
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
                user={auth.user}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
            <h2>Edit Event #{pk}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Percentage:</label><br/>
                    <input 
                        type="number" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.percent || ''} 
                        onChange={(e) => setFormData({...formData, percent: e.target.value})} 
                        required 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Name: </label><br/>
                    <textarea 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.name || ''} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>points:</label><br/>
                    <input 
                        type="number" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.points || ''} 
                        onChange={(e) => setFormData({...formData, points: e.target.value})} 
                        required 
                    />
                </div>

                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                    Update Event
                </button>
                <button type="button" onClick={() => navigate('/gradelist')} style={{ marginLeft: '10px', padding: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UpdateGrade;
