import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext"
function ClassStreamResult() {
    const { name, stream, term } = useParams(); 
    const [ResultData,setResultData] = useState([]);
    const [subject, setSubject]=useState([])
    const [loading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext);
    useEffect(() => {
        setLoading(true);
        const apiUrl = stream 
            ? `/result/resultstreamterm/${name}/${term}/${stream}/`
            : `/result/resultperclassterm/${name}/${term}/`;

        api.get(apiUrl)
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
