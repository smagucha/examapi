import React ,{ useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../components/api";

function ListStream(){
	const [streams, setStreams] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api.get(`/stream_list/`)
		.then(res => {
			setStreams(res.data);
			setLoading(false);
		})
		.catch(err => {
			console.error("Error fetching streams:", err);
			setLoading(false);
		});
	}, []);
	const handleDelete = (id) => {
		if (window.confirm("Are you sure want to delete this stream?")) {
			api.delete(`/stream/${id}/`)
			.then(() => {
				setStreams(streams.filter(stream => stream.id !== id));
				alert("stream deleted successfully");
			})
			.catch(err => {
				console.error("Error deleting stream:", err);
				alert("Failed to delete stream");
			});
		}
	};
	if (loading ) return <p> Loading stream ...</p>;
	return (
		<div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2> streams</h2>
                <Link to="/addstream">
                    <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add stream
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
                    {streams.length > 0 ? (
                        streams.map((stream) => (
                            <tr key={stream.id}>
                                <td>{stream.id}</td>
                                <td>{stream.name}</td>
                                <td> <Link to={`/streamupdate/${stream.id}`}>
                                        <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                   
                                    <button 
                                        onClick={() => handleDelete(stream.id)} 
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
export default ListStream;