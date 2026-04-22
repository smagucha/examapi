import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../components/api";


function AddSubject(){
	const [newSubject, setNewSubject] = useState({ name: '', code: '' });
	const navigate = useNavigate();

	const handleSubmit = (e) =>{
		e.preventDefault();
		api.post("http://127.0.0.1:8000/result/add_subject/", newSubject)
		.then(res =>{
			alert("subject added")
			navigate('/subjectslist');
		}).catch(err=> console.error("Error creating subject", err.response.data));
	};
	return (
		<div style={{ padding: '20px' }}>
            <h2>Add subject</h2>
            <form onSubmit={handleSubmit}>
            	<input 
                    type="text" placeholder="name" 
                    onChange={(e) => setNewSubject({...newSubject, name: e.target.value})} 
                    required 
                />
                <input 
                    type="text" placeholder="code" 
                    onChange={(e) => setNewSubject({...newSubject, code: e.target.value})} 
                    required 
                />
                <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                    Create subject
                </button>
            </form>
        </div>
		);
}

export default AddSubject;