import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "../css/Home.css";
import api from "../components/api";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";
function StudentPerClassTream() {
    const { name, stream } = useParams();
    const [student, setStudent] = useState([]);
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext)
    const API_URL = stream
    ? `/class/${name}/${stream}/`
    : `/class/${name}/`;


    // 1. GET - Fetch all events
    useEffect(() => {
        const fetchData = async () => {
            try {
                const StudentResponse = await api.get(API_URL);
                const StreamResponse = await api.get(`/stream_list/`);
                setStudent(StudentResponse.data);
                setStreams(StreamResponse.data);
                setLoading(false);
            }
        catch (err) {
        console.error("Error fetching data:", err);
    }
      };
       fetchData();
    }, [name, stream] );

    // 2. DELETE - Remove an event by ID
    const handleDelete = (pk) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            // This hits your @api_view(["DELETE"]) def event_detail(request, pk)
            api.delete(`/student/${pk}/`)
                .then(() => {
                    // Update UI immediately by filtering out the deleted event
                    setStudent(student.filter(student => student.pk !== pk));
                    alert(" deleted successfully");
                })
                .catch(err => {
                    console.error("Error deleting grade:", err);
                    alert("Failed to delete student.");
                });
        }
    };
    if (loading) return <p>Loading student...</p>;
    return (
        <div style={{ padding: '20px' }}>
             <Navbar 
                user={auth.user}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
        {/* Only display the stream container if there are streams available */}
        {streams.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <p>to view students per stream you can click the streams button</p>
                {streams.map((s) => (
                    <Link to={`/Class/${name}/${s.name}/`} key={s.id}>
                        <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            {s.name}
                        </button>
                    </Link>
                ))}
            </div>
        )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>students</h2>
                <Link to="/addsubject">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add student
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>Class </th>
                        <th>Administion Number</th>
                        <th>Date of Birth</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {student.length > 0 ? (
                        student.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.full_name}</td>
                                <td>{student.Class}</td>
                                <td>{student.Adimision_number}</td>
                                <td>{student.date_of_birth}</td>
                                <td> <Link to={`/student/${student.pk}/`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(student.pk)} 
                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No students were added.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentPerClassTream;