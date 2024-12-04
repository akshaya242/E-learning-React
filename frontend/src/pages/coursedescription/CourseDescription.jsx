import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CourseDescription.css';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../index.js';
import axios from 'axios';
import { UserData } from '../../context/UserContext';
import { toast } from 'react-hot-toast';
import Loading from '../../components/loading/Loading';

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        { headers: { token } }
      );

      const options = {
        key: 'rzp_test_leLkLRv4XKicDR',
        amount: order.id,
        currency: 'INR',
        name: 'QuikLearn',
        description: 'Learn with us',
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              { razorpay_order_id, razorpay_payment_id, razorpay_signature },
              { headers: { token } }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || error.message || 'Payment verification failed';
            toast.error(errorMessage);
          } finally {
            setLoading(false);
          }
        },
        theme: { color: 'darkcyan' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Checkout failed');
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        course && (
          <div className="course-description-page">
            <div className="course-description-card">
              <img
                src={`${server}/${course.image}`}
                alt="Course Image"
                className="course-description-image"
              />
              <h2>{course.title}</h2>
              <p>Instructor: {course.createdBy}</p>
              <p>Duration: {course.duration} weeks</p>
              <p>{course.description}</p>
              <p>Price: ₹{course.price}</p>
              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button onClick={checkoutHandler} className="common-btn">
                  Buy Now
                </button>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CourseDescription;
