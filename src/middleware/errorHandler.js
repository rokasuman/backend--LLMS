import { responseClient } from "./responseClient.js"

export const errorHandler = (error,req,res,next)=>{
    const statusCode = error.statusCode || 500 
      const message = error.message
    responseClient({req,res,message,statusCode})
    res.status(statusCode).json({
        status :"error",
        message: error.message,
    })

}