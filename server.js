import express from "express"


const app = express();
const PORT = process.env.PORT || 8000;

//connection with db 
import { dbConnect } from "./config/dbConfig.js";
dbConnect();

// middleware
import cors from "cors";
import morgan from "morgan";
app.use(cors())
app.use(morgan('dev'))

//server status
app.get("/",(req,res) =>{
    res.json({
        status: 200,
        message :" server is running live"
    })
})

//listening the server 
app.listen(PORT,(res,rep)=>{
    try {
        console.log("server is running on port http://localhost:"+ PORT )
        
    } catch (error){
        console.log("Error starting the server", error)
    }
    
   
})