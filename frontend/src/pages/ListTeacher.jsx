import React ,{ useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";

function ListTeacher(){
    const [teacher, setTeacher] = useState([]);
    const [loading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext);
    useEffect(() => {
        api.get(`/teacher/list_teacher/`)
        .then(res => {
            setTeacher(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching teacher:", err);
            setLoading(false);
        });
    }, []);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this classs?")) {
            api.delete(`/teacher/teacher_detail/${id}/`)
            .then(() => {
                setTeacher(teacher.filter(teacher => teacher.id !== id));
                alert("teacher deleted successfully");
            })
            .catch(err => {
                console.error("Error deleting class:", err);
                alert("Failed to delete class");
            });
        }
    };
    if (loading ) return <p> Loading teachers ...</p>;
    return (
        <div style={{ padding: '20px' }}>
             <Navbar 
                user={auth.user}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2> teachers</h2>
                <Link to="/addteacher">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add teacher
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>user</th>
                        <th>Gender</th>
                        <th>Date of Appointment</th>
                        <th>Designation</th>
                        <th>Update</th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {teacher.length > 0 ? (
                        teacher.map((teacher) => (
                            <tr key={teacher.id}>
                                <td>{teacher.full_name}</td>
                                <td>{teacher.Gender}</td>
                                <td>{teacher.date_of_appointment}</td>
                                <td>{teacher.Designation}</td>
                                <td> <Link to={`/teacher/updateteacher/${teacher.id}/`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(teacher.id)} 
                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No subjects found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        );
}
export default ListTeacher;