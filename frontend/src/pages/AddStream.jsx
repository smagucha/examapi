import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";

function AddClass(){
	const [newClass, setNewClass] = useState({name: ''});
	const navigate = useNavigate();
	const {auth} = useContext(AuthContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		api.post("http://127.0.0.1:8000/add_class/", newClass)
		.then(res  => {
			alert("class created!");
			navigate('/liststream');
		})
		.catch(err => console.error("Error creating class:", err.response.data));
	};
	return(
		<div style={{ padding: '20px' }}>
		<Navbar 
        	user={auth.user}
        	onLogout={() => {
          	localStorage.clear();
          	window.location.href = "/login";
        	}} 
      	/>
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