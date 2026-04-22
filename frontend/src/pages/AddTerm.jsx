import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../components/api";

function AddTerm() {
    const [newTerm, setNewTerm] = useState({ name: ''});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/result/add_term/`, newTerm)
            .then(res => {
                alert("Term Created!");
                navigate('/listterm'); 
            })
            .catch(err => console.error("Error creating term:", err.response.data));
    };
    return (
        <div style={{ padding: '20px' }}>
            <h2>Add term</h2>
            <form onSubmit={handleSubmit}>
              
                 <input 
                    type="text" placeholder="name" 
                    onChange={(e) => setNewTerm({...newTerm, name: e.target.value})} 
                    required 
                />
               
                <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                    Create term
                </button>
            </form>
        </div>
    );
}

export default AddTerm;
