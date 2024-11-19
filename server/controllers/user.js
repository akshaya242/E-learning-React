import { User } from "../models/user.js";
import bcrypt from 'bcrypt';  // ES module style
import jwt from 'jsonwebtoken';  // ES module style
import sendMail from "../middlewares/sendMail.js";

export const register = async (req,res) => {
    try
    {
        const { email,name,password } = req.body;
         
        
        let user = await User.findOne({ email });

        if(user) return res.status(400).json({ 
            msg: "User already exists"
         });
        
        const hasedPassword =  await bcrypt.hash(password,10); 
        user={
            name,
            email,
            password : hasedPassword
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const activationToken = jwt.sign({
            user,
            otp
        },process.env.Activation_Secret,{
            expiresIn: '5m',
        });

        const data =
        {   
            name,
            otp,
        };
        await sendMail(
            email,
            "E Learning Platform",
            data
        )
        res.status(200).json({
            messsage : "otp send to your email",
            activationToken,
        })

    }
    catch(error)
    {
        res.status(500).json(
            {
                messsage :error.messsage,  
            });
    }
    
}