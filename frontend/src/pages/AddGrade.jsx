import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/Navbar";
import {AuthContext} from "../context/AuthContext"

function AddGrade() {
    const [newGrade, setNewGrade] = useState({ percent: '', name: '', points: '' });
    const navigate = useNavigate();
    const {Auth} = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        api.post(`/result/add_grade/`, newGrade)
            .then(res => {
                alert("Grade Created!");
                navigate('/events/'); 
            })
            .catch(err => console.error("Error creating grade:", err.response.data));
    };
    return (
        <div style={{ padding: '20px' }}>
        <Navbar 
            user={auth.user}
            onLogout={() => {
            localStorage.clear();
            window.location.href = "/login";
            }} 
        />
            <h2>Add Grade</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" placeholder="percent" 
                    onChange={(e) => setNewGrade({...newGrade, percent: e.target.value})} 
                    required 
                />
                 <input 
                    type="text" placeholder="name" 
                    onChange={(e) => setNewGrade({...newGrade, name: e.target.value})} 
                    required 
                />
                <input 
                    type="number" placeholder="points" 
                    onChange={(e) => setNewGrade({...newGrade, points: e.target.value})} 
                    required 
                />
                <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                    Create Grade
                </button>
            </form>
        </div>
    );
}

export default AddGrade;
