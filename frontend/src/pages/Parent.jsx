import React, { useState, useEffect } from 'react';
import api from "../components/api";

// 1. Capitalize function name so React recognizes it as a component
function Parent() {
    const [parentData, setParenteData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(`/allparents/`)
            .then(res => {
                // 3. Ensure we only set state if the response is an array
                if (Array.isArray(res.data)) {
                    setParenteData(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                    setParenteData([]); // Fallback to empty array
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
                setParenteData([]); // Clear data on error
            });
    },[]);

    if (loading) return <p>Loading parent records...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Parents</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Parent</th>
                        <th>Phone</th>
                        <th>Student</th>
                        <th> class </th>
                    </tr>
                </thead>
                <tbody>
                    {/* 4. Use Array.isArray check to prevent "map is not a function" error */}
                    {Array.isArray(parentData) && parentData.length > 0 ? (
                        parentData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.full_name}</td>
                                <td>{item.phone_number}</td>
                                <td>{item.student}</td>
                                <td>{item.student_class}</td>
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

export default Parent;
