import "../css/Home.css";
import { Link } from "react-router-dom";
import {useContext} from "react";
import {
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,

} from "react-icons/fa";
import Navbar from "../components/NavBar";
import {AuthContext} from "../context/AuthContext";

export default function TeacherSections() {
  const cards = [
    { title: "all teacher", icon: <FaUsers />, path: "/teacherlist" },
    { title: "teacher subjects", icon: <FaChalkboardTeacher />, path: "/teachersubject/" },
    { title: "teacher designation", icon: <FaUserGraduate />, path: "/designations/" },
  ];
  const {auth} = useContext(AuthContext)
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