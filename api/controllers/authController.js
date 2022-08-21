import bcrypt from "bcryptjs";
import User from "../models/User.js";
import createError from "./errorController.js";
import jwt from "jsonwebtoken";

   /** 
     * 
     * ? @access public
     * todo @route /api/user/createUser
     * ! @method POST
     * */

     export const userLogin = async (req, res, next) => {
       //? cheak if user exist 
      
        try {
            const user =await User.findOne({email : req.body.email});

            if(!user) {
                 return next(createError(404, "User not found"));
            }
             
            //? cheak if password is correct
            const isPassword = await bcrypt.compare(req.body.password, user.password);
     
            if(!isPassword) {
                 return next(createError(404, "Password is incorrect"));
            }
           
            //? create token 
             
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
             //? user info
             const {password, isAdmin, ...loginInfo} = user._doc
            res.cookie("access_token", token).status(200).json({
                token : token,
                user : loginInfo,
            })
        } catch (error) {
            next(error);
        }
            
        
      
    }   
    /** 
     * 
     * ? @access public
     * todo @route /api/user/createUser
     * ! @method POST
     * */

     export const userRegister = async (req, res, next) => {
        // make a hash password
        const salt = await bcrypt.genSalt(10);
        const has_pass = await bcrypt.hash(req.body.password, salt);
        try {
            const user = await User.create({...req.body, password : has_pass});
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }   
 