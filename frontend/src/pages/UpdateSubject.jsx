import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';


function UpdateSubject(){
	const {pk} = useParams();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		code: "",
	});
	const [loading, setLoading] = useState(true)

	useEffect (()=>{
		axios.get(`http://127.0.0.1:8000/result/detail_subject/${pk}/`)
		.then(res =>{
			setFormData(res.data);
			setLoading(false)
		}).catch(err =>{
			console.error("Erroe fetching subject", err);
			setLoading(false);
		})
	},[pk]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.put(`http://127.0.0.1:8000/result/detail_subject/${pk}/`, formData)
		.then(res =>{
			alert("subject updated successfully!");
			navigate("/subjectslist");
		}).catch(err =>{
			console.error("update failed", err.response?.data || err.message);
			alert("Error updating event. check for details.");
		});
	};

	if (loading) return <p> Loading subject data ...</p>
		return (
		<div style={{ padding: '20px', maxWidth: '500px' }}>
            <h2>Edit Event #{pk}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Subject Name:</label><br/>
                    <input 
                        type="text" 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.name || ''} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>code:</label><br/>
                    <textarea 
                        style={{ width: '100%', padding: '8px' }}
                        value={formData.code || ''} 
                        onChange={(e) => setFormData({...formData, code: e.target.value})} 
                    />
                </div>

                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                    Update subject
                </button>
                <button type="button" onClick={() => navigate('/subjectslist')} style={{ marginLeft: '10px', padding: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
			);
}

export default UpdateSubject;