import React ,{ useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../components/api";
import Navbar from "../components/NavBar";
function Alluser(){
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/useraccount/allusers/`)
        .then(res => {
            setUser(res.data);
            setLoading(false);

        })
        .catch(err => {
            console.error("Error fetching users:", err);
            setLoading(false);
        });
    }, []);
    if (loading ) return <p> Loading users ...</p>;
    return (
        <div style={{ padding: '20px' }}>
            <Navbar 
                user={{ username: "sammy" }}
                onLogout={() => {
                localStorage.clear();
                window.location.href = "/login";
                }} 
            />
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>first name</th>
                        <th>last name</th>
                        <th>email</th>
                        <th>is active</th>
                        <th>last login</th>
                        <th> date joined </th>
                        <th> Deactivate</th>
                    </tr>
                </thead>
                <tbody>
                    {user.length > 0 ? (
                        user.map((user) => (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.Active}</td>
                                <td>{user.last_login}</td>
                                <td>{user.date_joined}</td>
                                <td> <Link to="">
                                         <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                     </Link>
                                 </td>
                         </tr>
                         ))
                     ) : (
                         <tr>
                             <td colSpan="5" style={{ textAlign: 'center' }}>No users found.</td>
                         </tr>
                     )}
                 </tbody>
             </table>
         </div>
        );
}
export default Alluser;