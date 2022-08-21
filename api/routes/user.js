import express from "express"
import   {userLogin, userRegister } from "../controllers/authController.js";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {authMiddleware}  from "../middlewares/authMiddleware.js";
import  {userMiddleware } from "../middlewares/userMiddelware.js";

//todo init routes
const router = express.Router();



//todo routes
router.route('/').get(adminMiddleware, getAllUser).post(authMiddleware, createUser);
router.route('/:id') .get(userMiddleware, getSingleUser).put(userMiddleware, updateUser).patch(userMiddleware, updateUser).delete(userMiddleware, deleteUser);


//todo auth routes
router.post('/login' ,userLogin);
router.post('/register', userRegister);

//todo export routes
export default router;