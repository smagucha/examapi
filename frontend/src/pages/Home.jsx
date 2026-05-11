import "../css/Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardCheck,
  FaEye,
  FaPenFancy,
  FaEdit,
  FaChartBar,
  FaFileAlt,
  FaCog,
} 
from "react-icons/fa";
import useRoles from "../components/useRoles";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Home() {

  const { auth } = useContext(AuthContext);

  // permissions
   const {
        isAdmin,
        isTeacher,
        isParent,
    } = useRoles();

  const cards = [

    // CLASSES
    (isAdmin || isTeacher || isParent) && {
      title: "Classes",
      icon: <FaUserGraduate />,
      path: "/Classes",
    },

    // PARENTS
    isAdmin && {
      title: "Parents",
      icon: <FaUsers />,
      path: "/parents",
    },

    // TEACHERS
    (isAdmin || isTeacher) && {
      title: "Teachers",
      icon: <FaChalkboardTeacher />,
      path: "/teachers",
    },

    // EVENTS
    (isAdmin || isTeacher || isParent) && {
      title: "Events",
      icon: <FaCalendarAlt />,
      path: "/events",
    },

    // TAKE ATTENDANCE
    isTeacher && {
      title: "Take Attendance",
      icon: <FaClipboardCheck />,
      path: "/take-attendance",
    },

    // VIEW ATTENDANCE
    (isAdmin || isTeacher || isParent) && {
      title: "View Attendance",
      icon: <FaEye />,
      path: "/view-attendance",
    },

    // ENTER RESULT
    isTeacher && {
      title: "Enter Result",
      icon: <FaPenFancy />,
      path: "/enter-result",
    },

    // UPDATE RESULTS
    isTeacher && {
      title: "Update Results",
      icon: <FaEdit />,
      path: "/update-results",
    },

    // SUBJECT RANKING
    (isAdmin || isTeacher || isParent) && {
      title: "Subject Ranking",
      icon: <FaChartBar />,
      path: "/subject-ranking",
    },

    // RESULTS PER CLASS
    (isAdmin || isTeacher || isParent) && {
      title: "Results Per Class",
      icon: <FaFileAlt />,
      path: "/results-per-class",
    },

    // SETTINGS
    (isAdmin || isTeacher) && {
      title: "Setting",
      icon: <FaCog />,
      path: "/settings",
    },

  ].filter(Boolean); // remove false items

  return (
    <div className="home-container">

      <Navbar
        user={auth.user}
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      />

      <div className="card-grid">

        {cards.map((card, index) => (
          <Link
            to={card.path}
            className="card-link"
            key={index}
          >
            <div className="dashboard-card">

              <div className="card-icon">
                {card.icon}
              </div>

              <h3>{card.title}</h3>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}