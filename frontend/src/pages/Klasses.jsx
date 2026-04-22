import "../css/Home.css";
import { Link } from "react-router-dom";
import React ,{ useState, useEffect} from 'react';
import {FaUserGraduate} from "react-icons/fa";
import api from "../components/api";

export default function Klasses() {
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
        if (loading ) return <p> Loading Classes ...</p>;
  return (
    
    <div className="home-container">
      <div className="card-grid">

         {klass.length > 0 ? (
          klass.map((klass) => (
          <Link to={`/Class/${klass.name}/`} className="card-link" key={klass.id}>
            <div className="dashboard-card">
              <div className="card-icon"><FaUserGraduate /></div>
              <h3>{klass.name}</h3>
            </div>
          </Link>
        ))):
         (
          <div className="dashboard-card">
              <div className="card-icon"><FaUserGraduate /></div>
              <h3>NO Clasess</h3>
            </div>
          )}
      </div>
    </div>
  );
}