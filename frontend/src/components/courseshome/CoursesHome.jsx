import React from "react";
import "./Courseshome.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { Link } from "react-router-dom";

const CoursesHome = () => {
  const { courses } = CourseData();

  console.log(courses);

  return (
    <div className="courses">
      <h2 className="courses-home" style={{color: 'white'}}>Top Courses</h2>
      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.slice(0, 3).map((e) => <CourseCard key={e._id} course={e} />)
          
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
      <Link to="/courses">
      <button className="common-btn" style={{ marginTop: '2%', marginLeft: '55%' }}>
        View All Courses
      </button>
    </Link>
    </div>
  );
};

export default CoursesHome;
