import React ,{ useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../components/api"

function ListClass(){
    const [klass, setKlass] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/all_classes/`)
        .then(res => {
            setKlass(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching classes:", err);
            setLoading(false);
        });
    }, []);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this classs?")) {
            api.delete(`/class_detail/${id}/`)
            .then(() => {
                setKlass(klasses.filter(klass => klass.id !== id));
                alert("class deleted successfully");
            })
            .catch(err => {
                console.error("Error deleting class:", err);
                alert("Failed to delete class");
            });
        }
    };
    if (loading ) return <p> Loading stream ...</p>;
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2> classes</h2>
                <Link to="/addclass">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add class
                    </button>
                </Link>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>edit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {klass.length > 0 ? (
                        klass.map((klass) => (
                            <tr key={klass.id}>
                                <td>{klass.id}</td>
                                <td>{klass.name}</td>
                                <td> <Link to={`/updateclass/${klass.id}`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(klass.id)} 
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
export default ListClass;