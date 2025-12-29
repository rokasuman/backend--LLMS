import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { verifyAccessJWT } from "../utils/jwt.js";
import { getSession } from "../models/session/sessionModels.js";
import { getUserByEmail } from "../models/user/userModels.js";

const router = express.Router();

router.get("/profile", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return responseClient({
      req,
      res,
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  // Split "Bearer <token>"
  const token = authorization.split(" ")[1];

  if (!token) {
    return responseClient({
      req,
      res,
      message: "Malformed token",
      statusCode: 401,
    });
  }

  // Verify token
  const decoded = verifyAccessJWT(token);

  if (decoded.email) {
    const tokenSession = await getSession({token})
    if(tokenSession?._id){

        //get user by email
      const user = await getUserByEmail(decoded.email) 
      if(user?._id) {
        return responseClient({req,res,message:"user profile",payload:user})
      }
    }
    
  }
  console.log(decoded)

  // Token is valid, return user info
  req.user = decoded;

  return res.json({
    message: "User profile fetched successfully",
    user: req.user,
  });
  
});

export default router;
