import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../components/api";
import Navbar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import useRoles from "../components/useRoles";

function EventList() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    const {
        isAdmin,
    } = useRoles();

    // FETCH EVENTS
    useEffect(() => {

        api.get(`/events/event_list/`)
            .then((res) => {

                setEvents(res.data);
                setLoading(false);

            })
            .catch((err) => {

                console.error("Error fetching events:", err);
                setLoading(false);

            });

    }, []);

    // DELETE EVENT
    const handleDelete = (id) => {

        if (window.confirm("Are you sure you want to delete this event?")) {

            api.delete(`/events/event/${id}/`)
                .then(() => {

                    setEvents(
                        events.filter((event) => event.id !== id)
                    );

                    alert("Event deleted successfully");

                })
                .catch((err) => {

                    console.error("Error deleting event:", err);
                    alert("Failed to delete event.");

                });
        }
    };

    if (loading) return <p>Loading events...</p>;

    return (
        <div style={{ padding: "20px" }}>

            <Navbar
                user={auth.user}
                onLogout={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
            />

            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >

                <h2>School Events</h2>

                {/* ONLY ADMIN CAN ADD */}
                {isAdmin && (
                    <Link to="/addevent">

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
                            + Add Event
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
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>

                        {/* ONLY ADMIN */}
                        {isAdmin && <th>Edit</th>}
                        {isAdmin && <th>Delete</th>}

                    </tr>

                </thead>

                <tbody>

                    {events.length > 0 ? (

                        events.map((event) => (

                            <tr key={event.id}>

                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td>{event.description}</td>
                                <td>{event.dateevents}</td>

                                {/* ONLY ADMIN CAN EDIT */}
                                {isAdmin && (
                                    <td>

                                        <Link to={`/events/edit/${event.id}`}>

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
                                                handleDelete(event.id)
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
                                colSpan={isAdmin ? "6" : "4"}
                                style={{ textAlign: "center" }}
                            >
                                No events scheduled.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default EventList;