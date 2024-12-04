import React, { useState, useEffect } from 'react';
import Layout from "../../../src/admin/Utils/Layout"; // Assuming Layout is correctly imported
import { UserData } from "../../context/UserContext"; // Assuming UserData context is correctly imported
import axios from "axios";
import { server } from '../../index';
import "./TeacherCourses.css"

const TeacherCourses = () => {
  const { user } = UserData(); // Access user data from context
  const [loading, setLoading] = useState(false);
  const [teacherCourses, setTeacherCourses] = useState([]);
  console.log(teacherCourses)
  // Fetch courses on initial render
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
      setTeacherCourses(data.data); // Store courses data
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

  const handleReport = (courseId) => {
    console.log(`Generate report for course with ID: ${courseId}`);
    // Implement report functionality
  };

  const handleDelete = async (courseId) => {
    try {
      // Ask for user confirmation before proceeding with the delete action
      const confirmation = window.confirm("Are you sure you want to delete this course?");
      if (!confirmation) return;
  
      // Send DELETE request to the backend
      await axios.delete(`${server}/api/teacher/course/${courseId}`, {
        headers: { token: localStorage.getItem("token") }
      });
  
      // Fetch the updated list of courses after successful deletion
      fetchTeacherCourses();
      
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course.");
    }
  };
  
  
  return (
    <Layout>
      <div className="teacher-courses">
        <h1>Your Courses</h1>
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="course-cards">
            {teacherCourses.length > 0 ? (
              teacherCourses.map((course) => (
                <div key={course._id} className="course-card">
                  {/* Render course image */}
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
