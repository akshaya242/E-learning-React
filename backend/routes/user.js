import express from 'express';
import { loginUser, myProfile, register, verifyUser } from '../controllers/user.js';
import { isAuth, isTeacher } from '../middlewares/isAuth.js';
import { addProgress, getYourProgress } from '../controllers/course.js';
import { getAllTeachers } from '../controllers/user.js';
import { teacherDashboard } from '../controllers/user.js';

const router = express.Router();


router.post('/user/register',register); 
router.post('/user/verify',verifyUser);
router.post('/user/login',loginUser);
router.get("/user/me",isAuth,myProfile);
router.post("/user/progress",isAuth,addProgress);
router.get("/user/progress",isAuth,getYourProgress);
router.get("/user/teachers", getAllTeachers); 
router.get("/teacher/dashboard", isAuth, isTeacher,teacherDashboard);

export default router;