import { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../components/api"; 
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";

function UpdateDesignation() {
    const { pk } = useParams(); // Gets the ID from the URL path
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    // Initialize state with empty strings to prevent "uncontrolled input" errors
    const [formData, setFormData] = useState({
        title: '',
    });
    const [loading, setLoading] = useState(true);

    // 1. GET: Fetch existing data when the component loads
    useEffect(() => {
        api.get(`/teacher/designation_detail/${pk}/`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching term:", err);
                setLoading(false);
            });
    }, [pk]);
    console.log(formData)
    // 2. PUT: Send updated data to Django
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/teacher/designation_detail/${pk}/`, formData)
            .then(res => {
                alert("designation updated successfully!");
                navigate('/designations/'); // Redirect back to the list
            })
            .catch(err => {
                console.error("Update failed:", err.response?.data || err.message);
                alert("Error updating designation. Check console for details.");
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
            <h2>Edit designation #{pk}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>designation :</label><br/>
                    <input 
                        type="text" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.title || ''} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})} 
                        required 
                    />
                </div>
                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                    Update Designation
                </button>
                <button type="button" onClick={() => navigate('/designations/')} style={{ marginLeft: '10px', padding: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UpdateDesignation;
