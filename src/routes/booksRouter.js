import express from "express";
import { getAllBooksController, insertBooks } from "../controller/booksCntroller.js";
import { adminAuthMiddleware, userAuthMiddleWare } from "../middleware/authMiddleWare.js";

const router = express.Router()

//public api
router.get("/", getAllBooksController);

// admin only
router.get("/admin",userAuthMiddleWare,adminAuthMiddleware, getAllBooksController);

//api to insert the book 
router.post("/",userAuthMiddleWare,adminAuthMiddleware,insertBooks)

export default router;