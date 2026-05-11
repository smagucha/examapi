import { useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";
import useRoles from "../components/useRoles";
function ListDesignation(){
	const [designation, setDesignation] = useState([]);
	const [loading, setLoading] = useState(true);
    const {auth}= useContext(AuthContext);
    const {
        isAdmin,
        isTeacher
    } = useRoles();
	useEffect(() => {
		api.get(`/teacher/list_designation/`)
		.then(res => {
			setDesignation(res.data);
			setLoading(false);
		})
		.catch(err => {
			console.error("Error fetching streams:", err);
			setLoading(false);
		});
	}, []);
	const handleDelete = (id) => {
		if (window.confirm("Are you sure want to delete this designation?")) {
			api.delete(`/teacher/designation_detail/${id}/`)
			.then(() => {
				setDesignation(designation.filter(designation => designation.id !== id));
				alert("stream deleted successfully");
			})
			.catch(err => {
				console.error("Error deleting stream:", err);
				alert("Failed to delete stream");
			});
		}
	};
	if (loading ) return <p> Loading stream ...</p>;
	return (
		<div style={{ padding: '20px' }}>
            <Navbar 
                user={auth.user}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
            {isAdmin &&(
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2> designations</h2>
                <Link to="/addesignation">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add Designation
                    </button>
                </Link>
            </div>)}

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Name</th>
                        {isAdmin &&<th>edit</th>} 
                        {isAdmin &&<th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {designation.length > 0 ? (
                        designation.map((designation) => (
                            <tr key={designation.id}>
                                <td>{designation.title}</td>
                                {isAdmin &&(<td> <Link to={`/teacher/designation_detail/${designation.id}`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>)}
                                {isAdmin &&(<td>
                                   
                                    <button 
                                        onClick={() => handleDelete(designation.id)} 
                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>)}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No titles found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
		);
}
export default ListDesignation;