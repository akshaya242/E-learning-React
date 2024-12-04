import express from 'express'
import { getAllCourses, getSingleCourse ,fetchLectures,fetchlecutre, getMycourses, checkout, paymentVerification, generateCourseReport} from '../controllers/course.js';
import {isAuth, isTeacher,isAdminOrTeacher} from  '../middlewares/isAuth.js'

const router = express.Router();

router.get("/course/all",getAllCourses);
router.get("/course/:id",getSingleCourse);
router.get('/lectures/:id',isAuth ,fetchLectures);
router.get('/lecture/:id',isAuth ,fetchlecutre);
router.get("/mycourse",isAuth,getMycourses)
router.post("/course/checkout/:id",isAuth,checkout);
router.post("/verification/:id",isAuth,paymentVerification);
router.get("/courses/:id/report",  generateCourseReport);

export default router; 