import bcrypt from "bcryptjs";
import User from "../models/User.js";
import createError from "./errorController.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utility/sendEmail.js";
import Token from "../models/Token.js";
import { createToken } from "../utility/createToken.js";

/**
 * 
 *? @access public
 * todo @route /api/user/getAllUser
 *! @method GET
 */
export const getAllUser = async (req, res, next) =>{
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
        
    }
/**
 * 
 *? @access public
 * todo @route /api/user/getSingleUser
 *! @method GET
 */
    export const getSingleUser = async (req, res, next ) => {
        const {id} = req.params;
        try {
            const user = await User.findById(id);
            if( !user) { 
                return next(createError(404, "Single User Not Found"))
            }
         if(user) {
             res.status(200).json(user);
         }
            
        } catch (error) {
            next(error)
        }
    }

    /** 
     * 
     * ? @access public
     * todo @route /api/user/createUser
     * ! @method POST
     * */

    export const createUser = async (req, res, next) => {
        // make a hash password
        const salt = await bcrypt.genSalt(10);
        const has_pass = await bcrypt.hash(req.body.password, salt);
        try {
            const user = await User.create({...req.body, password : has_pass});
            
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }   

    /**
 * 
 * ? @access public
 * todo @route /api/user/:id
 *! * @method PUT/PATCH
 */
export const updateUser = async(req, res, next)=> {
    const {id} = req.params
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new : true});
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
/**
 * 
 * ? @access public
 * todo @route /api/user/:id
 *! * @method DELETE
 */
export const deleteUser = async(req, res, next)=> {
    const {id} = req.params
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

/**
 * 
 * ? @access public
 * todo @route /api/me/
 *! * @method GET
 */

 export const getUserLoggedIn = async(req, res, next) =>{
        try {
            // get token
            const bearer_token = req.headers.authorization;
            let token = '';
            if(bearer_token){
                token = bearer_token.split(' ')[1];

                //get token user
                const logged_in_user = jwt.verify(token, process.env.JWT_SECRET);

                //user check 
                if(!logged_in_user){
                    next(createError(400, "Invalid Token"));
                }
                // check user
                if(logged_in_user){
                   
                    const user = await User.findById(logged_in_user.id)
                    res.status(200).json(user);
                
                }
            }
            //check token
            if(!token){
                next(createError(404, "Token Not Found"));
            }
            
        } catch (error) {
            next(error);
        }
        
 }

  /** 
     * 
     * ? @access public
     * todo @route /api/user/verify
     * ! @method POST
     * */
   export const verifyUserAccount = async (req , res, next) =>{


    try {
        const { id , token} = req.body;

        //todo check token
        const verify = await Token.findOne({id : id, token : token});

        //todo check verify

        if (!verify){
            next(createError(404, "Invalid verify url"));
        }
        if (verify){
            await User.findByIdAndUpdate(id, {
                isVerified : true
            });
            res.status(200).json({ message : "user account verifyed successful"});
            verify.remove();
        }
        
    } catch (error) {
        
    }
}
  /** 
     * 
     * ? @access public
     * todo @route /api/user/reacover
     * ! @method POST
     * */
   export const recverPassword = async (req , res, next) =>{

    try {
        //? get email
        const { email } = req.body;

        //todo check eamil form mongoose
       const recover_user = await User.findOne({email})
       
        // //todo check verify

        if (!recover_user){
            res.status(404).json({
                message : "Email dosn't exixts"
            })
        }
        if (recover_user){
            const token = createToken({ id : recover_user._id});
            const recovery_url = `http://localhost:3000/password-recover/${token}`;
            
            await Token.create({
                userId : recover_user._id,
                token : token
            });

            sendEmail(recover_user.email, "Password Reset", recovery_url);
            res.status(200).json({
                message : "Password recover Link sent"
            })
        }
        
    } catch (error) {
        
    }
}

  /** 
     * 
     * ? @access public
     * todo @route /api/user/reset
     * ! @method POST
     * */

export const resetPassword = async(req , res, next) =>{

    try {
        //get form data 
        const {token , password} = req.body;

        
        //get user id 
        const {id} = jwt.verify(token, process.env.JWT_SECRET, '60ms');

         // make a hash password
         const salt = await bcrypt.genSalt(10);
         const has_pass = await bcrypt.hash(password, salt);


        //get user details
      if(id){
        const user_data = await User.findByIdAndUpdate(id, {
            password : has_pass
        })
        res.send("password changed successful");
      }

        
    } catch (error) {
        next(error)
    }

}