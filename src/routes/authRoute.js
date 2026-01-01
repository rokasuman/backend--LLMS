import express from "express"
import { activeUser, generateOTP, insertNewUser, loginUser, resetNewPassword } from "../controller/authController.js";
import { aciveUserDataValidation, loginDataValidation, newPasswordDataValidation, newValiDataValidation } from "../middleware/validations/authDataValidation.js";



const router = express.Router()
router.post("/register",newValiDataValidation, insertNewUser);
router.post("/activate-user",aciveUserDataValidation ,activeUser)
router.post("/login",loginDataValidation,loginUser)
router.post("/otp",generateOTP)
router.post("/reset-password",newPasswordDataValidation,resetNewPassword,)

export default router;