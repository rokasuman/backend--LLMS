import express from "express"


const app = express();
const PORT = process.env.PORT || 8000;

//connection with db 
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

// middleware
import cors from "cors";
import morgan from "morgan";
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

// api endpoints 
import authRoute from "./src/routes/authRoute.js"
import { errorHandler } from "./src/middleware/errorHandler.js";
import { responseClient } from "./src/middleware/responseClient.js";
import userRoute from "./src/routes/userRoute.js"
import booksRoute from "./src/routes/booksRouter.js"
//creating the middle for auth route 
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/books",booksRoute)

//server status
app.get("/",(req,res) =>{
    const message = "server is running live"
    responseClient({req,res,message});
    
})
app.use(errorHandler);

//listening the server 
app.listen(PORT,()=>{
    try {
        console.log("server is running on port http://localhost:"+ PORT )
        
    } catch (error){
        console.log("Error starting the server", error)
    }
    
   
})