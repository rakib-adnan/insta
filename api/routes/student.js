import express from "express";
import { createStudent, deleteStudent, getAllStudents, getSingleStudent, updateStudent } from "../controllers/studentControlles.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { userMiddleware } from "../middlewares/userMiddelware.js";

//todo init routes
const router = express.Router();

//todo routes
router.route('/').get(authMiddleware, getAllStudents).post(authMiddleware, createStudent)
router.route('/:id').get(userMiddleware, getSingleStudent).put(userMiddleware, updateStudent).patch(userMiddleware, updateStudent).delete(userMiddleware, deleteStudent)


//todo export routes
export default router;