import "../css/Home.css";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaBook,
  FaAward,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardCheck,
  FaEye,
  FaPenFancy,
  FaEdit,
  FaChartBar,
  FaFileAlt,
  FaTrophy,
  FaCog,
} from "react-icons/fa";
import Navbar from "../components/NavBar";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function Settings() {
  const cards = [
    { title: "subjects", icon: <FaBook />, path: "/subjectslist" },
    { title: "grades", icon: <FaAward />, path: "/gradelist" },
    { title: "streams", icon: <FaChalkboardTeacher />, path: "/liststream" },
    { title: "terms", icon: <FaClipboardCheck />, path: "/listterm" },
    { title: "enroll student to subjects", icon: <FaEye />, path: "/SelectClassorStreamToEnrollSubject" },
    { title: "subjects enrolled by student", icon: <FaPenFancy />, path: "/select-class-subject-enrolled" },
    { title: "classes", icon: <FaEdit />, path: "/listclass" },
    { title: "users", icon:<FaUsers/>, path:"/users"},
  ];
  const {auth} = useContext(AuthContext);
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
          <Link to={card.path} className="card-link" key={index}>
            <div className="dashboard-card">
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}