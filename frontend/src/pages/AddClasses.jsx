import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AddStream(){
	const [newStream, setNewStream] = useState({name: ''});
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("http://127.0.0.1:8000/add_stream/", newStream)
		.then(res  => {
			alert("stream created!");
			navigate('/liststream');
		})
		.catch(err => console.error("Error creating stream:", err.response.data));
	};
	return(
		<div style={{ padding: '20px' }}>
            <h2>Add new stream</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" placeholder="name" 
                    onChange={(e) => setNewStream({...newStream, name: e.target.value})} 
                    required 
                />
                <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
                    Create stream
                </button>
            </form>
        </div>
		);
}
export default AddStream;