import React, { useEffect } from 'react';
import { UserData } from '../../context/UserContext'; // Adjust the import path if needed
import "./TeachersHome.css"
import { Link } from 'react-router-dom';

const TeachersHome = () => {
  const { teachers, fetchTeachers } = UserData(); // Access teachers and fetchTeachers from context

  // Fetch teachers when the component mounts (if not already done in the context)
  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers(); // Fetch teachers if not already available
    }
  }, [teachers, fetchTeachers]);

  return (
    <div className="teachers-home">
      <h2 style={{color: 'darkcyan'}} className='h2-teachers-home'>All Teachers</h2>
      <div className="teachers-cards">
        {teachers.length > 0 ? (
          teachers.slice(0,3).map((teacher) => (
            <div className="teacher-card" key={teacher._id}>
              <div className="teacher-card-header">
                <h3>{teacher.name}</h3>
                
              </div>
              <div className="teacher-card-body">
              <p >{teacher.role}</p>
                <p><strong>Email:</strong> {teacher.email}</p>
                
              </div>
              
            </div>
          ))
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
      <Link to="/teachers">
      <button className="common-btn" style={{ marginTop: '2%', marginLeft: '85%' }}>
        View All Teachers
      </button>
    </Link>
    </div>
  );
};

export default TeachersHome;
