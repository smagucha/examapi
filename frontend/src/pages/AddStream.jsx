import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AddClass(){
	const [newClass, setNewClass] = useState({name: ''});
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("http://127.0.0.1:8000/add_class/", newClass)
		.then(res  => {
			alert("class created!");
			navigate('/liststream');
		})
		.catch(err => console.error("Error creating class:", err.response.data));
	};
	return(
		<div style={{ padding: '20px' }}>
            <h2>Add new stream</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" placeholder="name" 
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})} 
                    required 
                />
                <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                    Create stream
                </button>
            </form>
        </div>
		);
}
export default AddClass;