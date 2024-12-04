import React, { useState, useEffect } from 'react';
import Layout from "../../../src/admin/Utils/Layout";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import { server } from '../../index';
import Report from "./Report"; // Import the Report component
import "./TeacherCourses.css";

const TeacherCourses = () => {
  const { user } = UserData();
  const [loading, setLoading] = useState(false);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      fetchTeacherCourses();
    }
  }, [user]);

  const fetchTeacherCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/teacher/${user._id}/courses`, {
        headers: { token: localStorage.getItem("token") }
      });
      setTeacherCourses(data.data);
    } catch (error) {
      console.error("Error fetching teacher courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (courseId) => {
    console.log(`Update course details with ID: ${courseId}`);
    // Implement update course details functionality
  };

  const handleReport = async (courseId) => {
    try {
      const response = await axios.get(`${server}/api/courses/${courseId}/report`);
      setReportData(response.data); // Store the report data
      setShowReport(true); // Show the Report component
    } catch (error) {
      if (error.response) {
        console.error("Error generating report:", error.response.data);
      } else if (error.request) {
        console.error("Error generating report: No response from server");
      } else {
        console.error("Error generating report:", error.message);
      }
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this course?");
      if (!confirmation) return;

      await axios.delete(`${server}/api/teacher/course/${courseId}`, {
        headers: { token: localStorage.getItem("token") }
      });

      fetchTeacherCourses();
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course.");
    }
  };

  const closeReport = () => {
    setShowReport(false); // Close the Report component
    setReportData(null); // Clear the report data
  };

  return (
    <Layout>
      <div className="teacher-courses">
        <h1>Your Courses</h1>
        {loading ? (
          <p>Loading courses...</p>
        ) : showReport ? (
          <Report data={reportData} closeReport={closeReport} /> // Render the Report component
        ) : (
          <div className="course-cards">
            {teacherCourses.length > 0 ? (
              teacherCourses.map((course) => (
                <div key={course._id} className="course-card">
                  {course.image && (
                    <img src={`${server}/${course.image}`} alt={course.title} className="course-image" />
                  )}
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-buttons">
                    <button onClick={() => handleUpdate(course._id)} className="btn update-btn">Update Course Details</button>
                    <button onClick={() => handleReport(course._id)} className="btn report-btn">Report</button>
                    <button onClick={() => handleDelete(course._id)} className="btn delete-btn">Delete Course</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TeacherCourses;
