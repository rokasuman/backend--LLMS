import express from "express";
import { insertBooks } from "../controller/booksCntroller.js";
import { adminAuthMiddleware, userAuthMiddleWare } from "../middleware/authMiddleWare.js";

const router = express.Router()

//creating the router the books 
router.get("/",(req,res,next)=>{
    res.json({
        message:"todo:creating the table"
    })
    next()
})

//api to insert the book 
router.post("/",userAuthMiddleWare,adminAuthMiddleware,insertBooks)

export default router;