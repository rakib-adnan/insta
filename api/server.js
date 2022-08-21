import express from "express";
import colors from 'colors';
import dotenv from "dotenv";
import studentRoute from "./routes/student.js";
import mongoDBConnect from "./config/db.js";
import errorhendler from "./middlewares/errorHandler.js";
import userRoute from "./routes/user.js";
import loginRoute from "./routes/user.js";
import registerRoute from "./routes/user.js";
import { userLogin, userRegister } from "./controllers/authController.js";
import cookieParser from "cookie-parser";
import cors from "cors";




//! load env file
dotenv.config();
//! init express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}))
//! cookie
app.use(cookieParser())
//! cors
app.use(cors());




//! init env variables
const port = process.env.SERVER_PORT || 5000;

//! routes 
app.use('/api/student', studentRoute);
app.use('/api/user' , userRoute);


//! Auth router
app.use('/api/login', userLogin);
app.use('/api/register', userRegister);

//! express error handler
app.use(errorhendler);

//! listen server
app.listen(port, () => {
    mongoDBConnect();
    console.log(`Server is running on port ${port}`.bgCyan.black);
});

