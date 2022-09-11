import express from "express"

import   {userLogin, userRegister } from "../controllers/authController.js";
import { getUserLoggedIn, createUser, deleteUser, getAllUser, getSingleUser, updateUser,verifyUserAccount , recverPassword , resetPassword} from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

import {authMiddleware}  from "../middlewares/authMiddleware.js";
import  {userMiddleware } from "../middlewares/userMiddelware.js";

//todo init routes
const router = express.Router();

//todo auth routes
router.post('/login' ,userLogin);
router.post('/register', userRegister);
router.get('/me', getUserLoggedIn);
router.post('/verify', verifyUserAccount);
router.post('/recover-password', recverPassword);
router.post('/reset-password', resetPassword);

//todo routes
router.route('/').get(adminMiddleware, getAllUser).post(authMiddleware, createUser);
router.route('/:id') .get(userMiddleware, getSingleUser).put(userMiddleware, updateUser).patch(userMiddleware, updateUser).delete(userMiddleware, deleteUser);




//todo export routes
export default router;