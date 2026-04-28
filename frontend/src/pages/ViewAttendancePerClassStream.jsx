import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";
// 1. Capitalize function name so React recognizes it as a component
function ViewAttendancePerClass() {
    const { name, stream } = useParams(); 
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext);
    useEffect(() => {
        setLoading(true);
        
        // 2. Add your full backend URL prefix here
        const apiUrl = stream 
            ? `/viewattendanceperstream/${name}/${stream}/`
            : `/viewattendanceperclass/${name}/`;

        api.get(apiUrl)
            .then(res => {
                // 3. Ensure we only set state if the response is an array
                if (Array.isArray(res.data)) {
                    setAttendanceData(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                    setAttendanceData([]); // Fallback to empty array
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
                setAttendanceData([]); // Clear data on error
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
            <h2>Attendance for {name} {stream ? `(${stream} Stream)` : '(Full Class)'}</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                        <th>Stream</th>
                        <th>Status</th>
                        <th>Reason (if absent)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 4. Use Array.isArray check to prevent "map is not a function" error */}
                    {Array.isArray(attendanceData) && attendanceData.length > 0 ? (
                        attendanceData.map((item, index) => (
                            <tr key={index}>
                                <td>{item["first name"]}</td>
                                <td>{item["last name"]}</td>
                                <td>{item.class_name}</td>
                                <td>{item.stream_name || 'N/A'}</td>
                                <td>{item.present_status ? "Present" : "Absent"}</td>
                                <td>{item.absent_status || '-'}</td>
                                <td>{item.todaydate}</td>
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

export default ViewAttendancePerClass;
