import express from "express";

import { userAuthMiddleWare } from "../middleware/authMiddleWare.js";
import { responseClient } from "../middleware/responseClient.js";

const router = express.Router();

router.get("/profile",userAuthMiddleWare, async (req, res) => {
    const user = req.userInfo ;
    user.password = undefined
    user.__v = undefined
    user.refreshJWT = undefined
return responseClient({
    req,
    res,
    message:"user Profile",
    payload:user
})
})
export default router;
