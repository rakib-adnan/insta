import bcrypt from "bcryptjs";
import User from "../models/User.js";
import createError from "./errorController.js";

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

 