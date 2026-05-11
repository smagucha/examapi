// export default StudentPerClassTream;
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/Home.css";
import api from "../components/api";
import Navbar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import useRoles from "../components/useRoles";

function StudentPerClassTream() {
    const { name, stream } = useParams();

    const [student, setStudent] = useState([]);
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);

    const { auth } = useContext(AuthContext);

    const API_URL = stream
        ? `/class/${name}/${stream}/`
        : `/class/${name}/`;

    const {
        isAdmin,
    } = useRoles();

    // FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const StudentResponse = await api.get(API_URL);
                const StreamResponse = await api.get(`/stream_list/`);

                setStudent(StudentResponse.data);
                setStreams(StreamResponse.data);
                setLoading(false);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();

    }, [name, stream]);

    // DELETE STUDENT
    const handleDelete = (pk) => {
        if (window.confirm("Are you sure you want to delete this student?")) {

            api.delete(`/student/${pk}/`)
                .then(() => {

                    setStudent(
                        student.filter((student) => student.pk !== pk)
                    );

                    alert("Deleted successfully");

                })
                .catch((err) => {
                    console.error("Error deleting student:", err);
                    alert("Failed to delete student.");
                });
        }
    };

    if (loading) return <p>Loading student...</p>;

    return (
        <div style={{ padding: "20px" }}>

            <Navbar
                user={auth.user}
                onLogout={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
            />

            {/* STREAMS */}
            {streams.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <p>
                        to view students per stream you can click the streams button
                    </p>

                    {streams.map((s) => (
                        <Link
                            to={`/Class/${name}/${s.name}/`}
                            key={s.id}
                        >
                            <button
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                {s.name}
                            </button>
                        </Link>
                    ))}
                </div>
            )}

            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h2>Students</h2>

                {/* ONLY ADMIN CAN ADD */}
                {isAdmin && (
                    <Link to="/addsubject">
                        <button
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            + Add student
                        </button>
                    </Link>
                )}
            </div>

            {/* TABLE */}
            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>Class</th>
                        <th>Admission Number</th>
                        <th>Date of Birth</th>

                        {/* ONLY ADMIN SEES THESE */}
                        {isAdmin && <th>Edit</th>}
                        {isAdmin && <th>Delete</th>}
                    </tr>
                </thead>

                <tbody>
                    {student.length > 0 ? (
                        student.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.full_name}</td>
                                <td>{student.Class}</td>
                                <td>{student.Adimision_number}</td>
                                <td>{student.date_of_birth}</td>

                                {/* ONLY ADMIN CAN EDIT */}
                                {isAdmin && (
                                    <td>
                                        <Link to={`/student/${student.pk}/`}>
                                            <button
                                                style={{
                                                    marginRight: "5px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                )}

                                {/* ONLY ADMIN CAN DELETE */}
                                {isAdmin && (
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete(student.pk)
                                            }
                                            style={{
                                                backgroundColor: "#dc3545",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={isAdmin ? "7" : "5"}
                                style={{ textAlign: "center" }}
                            >
                                No students were added.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentPerClassTream;