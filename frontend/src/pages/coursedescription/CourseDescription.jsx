import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./CourseDescription.css"
import { CourseData } from '../../context/CourseContext';
import { server } from '../../index.js'

const CourseDescription = ({user}) => {
    const params = useParams();
    const {fetchCourse, course} = CourseData();
    const navigate = useNavigate();
    useEffect(()=>{
        fetchCourse(params.id)
    }, [])
  return (
    <div>
     {
        course && (
            <div className="course-description">
                <div className="course-header">
                    <img src={`${server}/${course.image}`} className='course-image'/>
                    <div className="course-info">
                        <h2>{course.title}</h2>
                        <p>Instructor: {course.createdBy}</p>
                        <p>Duration: {course.duration} weeks</p>
                    </div>
                    <p>Let's get started with course At ₹{course.price}</p>
                    {
                        user && user.subscription.includes(course._id) ? <button className='common-btn' onClick={()=>navigate(`/course/study/${course._id}`)}>Study</button> : (
                            <button className='common-btn'>Buy Now</button>
                        )
                    }
                </div>
            </div>
        )
     }
    </div>
  )
}

export default CourseDescription
