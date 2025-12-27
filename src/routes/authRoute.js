import express from "express"
import { activeUser, insertNewUser } from "../controller/authController.js";
import { aciveUserDataValidation, newValiDataValidation } from "../middleware/validations/authDataValidation.js";


const router = express.Router()
router.post("/register",newValiDataValidation, insertNewUser);
router.post("/activate-user",aciveUserDataValidation ,activeUser)
export default router;