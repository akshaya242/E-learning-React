import { User } from "../models/user.js";
import bcrypt from 'bcrypt';  // ES module style
import jwt from 'jsonwebtoken';  // ES module style
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";


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

        const otp = Math.floor( Math.random() * 1000000);
        const activationToken = jwt.sign({
            user,
            otp
        },process.env.Activation_Secret,{
            expiresIn: "5m",
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
        console.log(data);
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

export const verifyUser = TryCatch(async (req,res) => {
    const { otp,activationToken } = req.body;
    const verify = jwt.verify(activationToken, process.env.Activation_Secret);
    if(!verify)
        return res.status(400).json({
            messsage : "Otp expired",
        });
    if(verify.otp !== otp)
        return res.status(400).json({
            messsage : "Wronf otp",
        });
        
    await User.create({
        name : verify.user.name,
        email : verify.user.email,
        password : verify.user.password,
    })
    res.json (
        {
            messsage :"User registed successfully",
        }
    )
});

export const loginUser = TryCatch(async (req,res) => {
    const { email,password } = req.body
    const user = await User.findOne({email}) 

    if(!user) 
        return res.status(400).json({
        message : "User not found with this email",
         });
    const mathPassword = await bcrypt.compare(password,user.password);

    if(!mathPassword)  
        return res.status(400).json({
        message : "Password didnt match",
        });

    const token  = jwt.sign({ _id : user._id},process.env.Jwt_Sec,{
        expiresIn : "15d",
    });
    res.json({
        message :`welcome back ${user.name}`,
        token,
        user, 
    })
});


export const myProfile = TryCatch(async (req,res) => {
    const user = await User.findById(req.user._id)


    res.json({user})
});