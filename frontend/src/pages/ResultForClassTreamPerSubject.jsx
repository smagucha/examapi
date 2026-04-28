import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../components/api";
import { Link } from 'react-router-dom';
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";
// 1. Capitalize function name so React recognizes it as a component
function ResultForClassTreamPerSubject() {
    const { name, stream, subject, term } = useParams(); 
    const [SubjectResultData, setSubjectResultData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext);
    useEffect(() => {
        setLoading(true);
    
        const apiUrl = stream 
            ? `/result/subject_results_classtream/${name}/${term}/${subject}/${stream}/`
            : `/result/subject_results_class/${name}/${term}/${subject}/`;

        api.get(apiUrl)
            .then(res => {
                // 3. Ensure we only set state if the response is an array
                if (Array.isArray(res.data)) {
                    setSubjectResultData(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                    setSubjectResultData([]); // Fallback to empty array
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
                setSubjectResultData([]); // Clear data on error
            });
    }, [name, stream]);

    if (loading) return <p>Loading attendance records...</p>;

    return (
        <div style={{ padding: '20px' }}>
             <Navbar 
                user={auth.user}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
            <h2>subject results for {name} {stream ? `(${stream} Stream)` : '(Full Class)'}</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Full Name</th>
                        <th>subject</th>
                        <th>term</th>
                        <th>Stream</th>
                        <th>marks</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 4. Use Array.isArray check to prevent "map is not a function" error */}
                    {Array.isArray(SubjectResultData) && SubjectResultData.length > 0 ? (
                        SubjectResultData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.student_name}</td>
                                <td>{item.subject}</td>
                                <td>{item.term}</td>
                                <td>{item.stream}</td>
                                <td>{item.marks}</td>
                                <td>
                                    <Link to={`/updateresult/${item.id}`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>No results found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ResultForClassTreamPerSubject;
