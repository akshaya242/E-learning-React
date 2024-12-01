import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
import Testimonials from '../../components/testimonials/Testimonials.jsx';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className="home">
            <div className="home-content">
                <h1>Welcome to QuikLearn</h1>
                <p>Learn, Grow and Excel</p>
                <button onClick={()=>navigate("/courses")} className='common-btn'>
                    Get started
                </button>
            </div>
        </div>
        <Testimonials />
    </div>
  )
}

export default Home
