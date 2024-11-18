import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
dotenv.config();

const app = express();
const port = process.env.PORT;

//using middleware
app.use(express.json()); 

//importing routes
import userRoutes from './routes/user.js';

//using routes
app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb(); 
});
