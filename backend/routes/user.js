import express from 'express';
import { loginUser, myProfile, register, verifyUser } from '../controllers/user.js';
import { isAuth } from '../middlewares/isAuth.js';
import { addProgress, getYourProgress } from '../controllers/course.js';
import { User } from "../models/user.js";
const router = express.Router();


router.post('/user/register',register); 
router.post('/user/verify',verifyUser);
router.post('/user/login',loginUser);
router.get("/user/me",isAuth,myProfile);
router.post("/user/progress",isAuth,addProgress);
router.get("/user/progress",isAuth,getYourProgress);
router.patch("/users/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { designation } = req.body; // Get designation from the request body
  
      // Find user and update their designation
      const user = await User.findByIdAndUpdate(
        userId,
        { designation },
        { new: true } // Return the updated user
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Designation updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

export default router;