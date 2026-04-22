import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../components/api"

function AddClass(){
	const [newClass, setNewClass] = useState({name: ''});
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		api.post(`/add_class/`, newClass)
		.then(res  => {
			alert("class created!");
			navigate('/listclass');
		})
		.catch(err => console.error("Error creating class:", err.response.data));
	};
	return(
		<div style={{ padding: '20px' }}>
            <h2>Add New Class</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" placeholder="name" 
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})} 
                    required 
                />
                <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                    Create Class
                </button>
            </form>
        </div>
		);
}
export default AddClass;