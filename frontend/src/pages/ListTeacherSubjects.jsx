import React ,{ useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://localhost:8000";

function ListTeacherSubjects(){
    const [teachersubject, setTeacherSubject] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}/teacher/list_teachersubject/`)
        .then(res => {
            setTeacherSubject(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching teacher subjects:", err);
            setLoading(false);
        });
    }, []);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this classs?")) {
            axios.delete(`${BASE_URL}/teacher/teachersubject_detail/${id}/`)
            .then(() => {
                setTeacherSubject(teachersubject.filter(teachersubject => teachersubject.id !== id));
                alert("teacher subject deleted successfully");
            })
            .catch(err => {
                console.error("Error deleting class:", err);
                alert("Failed to delete class");
            });
        }
    };
    if (loading ) return <p> Loading teachers subjects...</p>;
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2> teachers</h2>
                <Link to="/addteachersubject/">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add teacher subject
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>teacher</th>
                        <th>subject</th>
                        <th>class</th>
                        <th>stream</th>
                        <th>Update</th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>
                  {teachersubject.length > 0 ? (
                    teachersubject.map((teacher) => (
                      <tr key={teachersubject.id}>
                        <td>{teacher.teacher}</td>
                        <td>{teacher.subject}</td>
                        <td>{teacher.class}</td>
                        <td>{teacher.stream}</td>

                        <td>
                          <Link to={`/teacher/updateteachersubject/${teacher.id}/`}>
                            <button style={{ marginRight: '5px', cursor: 'pointer' }}>
                              Edit
                            </button>
                          </Link>
                        </td>

                        <td>
                          <button
                            onClick={() => handleDelete(teacher.id)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '5px 10px',
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center' }}>
                        No subjects found.
                      </td>
                    </tr>
                  )}
                </tbody>
            </table>
        </div>
        );
}
export default ListTeacherSubjects;