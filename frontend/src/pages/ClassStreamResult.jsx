import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

// 1. Capitalize function name so React recognizes it as a component
function ClassStreamResult() {
    const { name, stream, term } = useParams(); 
    const [ResultData,setResultData] = useState([]);
    const [subject, setSubject]=useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        // 2. Add your full backend URL prefix here
        const baseUrl = "http://localhost:8000"; 
        const apiUrl = stream 
            ? `${baseUrl}/result/resultstreamterm/${name}/${term}/${stream}/`
            : `${baseUrl}/result/resultperclassterm/${name}/${term}/`;

        axios.get(apiUrl)
            .then(response => {
                setResultData(response.data.page_obj);
                setSubject(response.data.subjects)
                setLoading(false)
                
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
                setResultData([]); // Clear data on error
            });
    }, [name, stream, term]);

    if (loading) return <p>Loading attendance records...</p>;
    console.log(ResultData)
    return (
        <div style={{ padding: '20px' }}>
            <h2>subject results for {name} {stream ? `(${stream} Stream)` : '(Full Class)'}</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Number</th>
                        <th> Student</th>
                        {subject.map((cls, index) => (
                            <th>{cls}</th>
                            ))}
                        <th> Total</th>
                        <th> Grade</th>
                        <th> Points </th>
                    </tr>
                </thead>
                <tbody>
                    {ResultData.map((cls, index) => (
                    <tr key={index} value={cls}> 
                        {cls.map((item, myitem) => (
                        <td >{item}</td>
                        ))}
                    </tr> 
                     ))}
                      
                </tbody>
            </table>
        </div>
    );
}
export default ClassStreamResult;
