import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../index";
import "./AdminDashboard.css";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetchStats();
  }, []);

  if (user && user.role !== "admin") return navigate("/");

  
  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(stats)
  return (
    <div>
      <Layout>
        <div className="main-content">
          <div className="dashboard">
            <div className = "card">
              <h2 className= "h2">Total Courses</h2>
              <p>{stats.totalcourses}</p>
            </div>

          <div className="card">
            <h2 className= "h2">Total Lectures</h2>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="card">
            <h2 className= "h2">Total Users</h2>
            <p>{stats.totalUser}</p>
          </div>
        </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;