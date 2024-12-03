import React from "react";
import "./Courseshome.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const CoursesHome = () => {
  const { courses } = CourseData();

  console.log(courses);

  return (
    <div className="courses">
      <h2>Top Courses</h2>
      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.slice(0, 3).map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
    </div>
  );
};

export default CoursesHome;
