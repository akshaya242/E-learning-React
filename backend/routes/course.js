import express from 'express'
import { getAllCourses, getSingleCourse ,fetchLectures,fetchlecutre, getMycourses, checkout, paymentVerification} from '../controllers/course.js';
import {isAuth} from  '../middlewares/isAuth.js'

const router = express.Router();

router.get("/course/all",getAllCourses);
router.get("/course/:id",getSingleCourse);
router.get('/lectures/:id',isAuth ,fetchLectures);
router.get('/lecture/:id',isAuth ,fetchlecutre);
router.get("/mycourse",isAuth,getMycourses)
router.post("/course/checkout/:id",isAuth,checkout);
router.post("/verification/:id",isAuth,paymentVerification);

export default router; 