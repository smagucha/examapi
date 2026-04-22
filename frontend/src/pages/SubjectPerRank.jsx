import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../components/api";

// 1. Capitalize function name so React recognizes it as a component
function SubjectPerRank() {
    const { name, stream, term, subject } = useParams(); 
    const [SubjectresultsData, setSubjectresultsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        // 2. Add your full backend URL prefix here
        const apiUrl = stream 
            ? `/result/subjectperrankstreamterm/${name}/${stream}/${term}/${subject}/`
            : `/result/subjectperrankclass/${name}/${term}/${subject}/`;           
        api.get(apiUrl)
            .then(res => {
                // 3. Ensure we only set state if the response is an array
                if (Array.isArray(res.data)) {
                    setSubjectresultsData(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                    setSubjectresultsData([]); // Fallback to empty array
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
                setSubjectresultsData([]); // Clear data on error
            });
    }, [name, stream]);

    if (loading) return <p>Loading subject ranking...</p>;
    return (
        <div style={{ padding: '20px' }}>
            <h2>subject ranking for {name} {stream ? `(${stream} Stream)` : '(Full Class)'}</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Full Name</th>
                        <th>Subject</th>
                        <th>Term</th>
                        <th>stream</th>
                        <th>marks</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 4. Use Array.isArray check to prevent "map is not a function" error */}
                    {Array.isArray(SubjectresultsData) && SubjectresultsData.length > 0 ? (
                        SubjectresultsData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.student}</td>
                                <td>{item.subject}</td>
                                <td>{item.term}</td>
                                <td>{item.stream || 'N/A'}</td>
                                <td>{item.marks}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>No records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SubjectPerRank;
