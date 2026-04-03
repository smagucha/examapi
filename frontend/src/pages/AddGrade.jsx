import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddGrade() {
    const [newGrade, setNewGrade] = useState({ percent: '', name: '', points: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/result/add_grade/", newGrade)
            .then(res => {
                alert("Grade Created!");
                navigate('/events/'); 
            })
            .catch(err => console.error("Error creating grade:", err.response.data));
    };
    return (
        <div style={{ padding: '20px' }}>
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
