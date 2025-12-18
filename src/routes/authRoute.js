import express from "express"

const router = express.Router()


// user signUp route



router.post("/register",(req,res,error)=>{
    try {
         res.json({
            status:"sucess",
            message:"todo"
        })  
    } catch (error) {
       next(error)
        
    }
})
export default router;