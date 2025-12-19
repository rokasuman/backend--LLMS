import { responseClient } from "../middleware/responseClient.js";
import { createNewUser } from "../models/user/userModels.js";
import { hashPassword } from "../utils/bcrypt.js";

export const insertNewUser =async (req,res,next)=>{
    try {
        // receive the user data 
        console.log(req.body);
        // destructuring the password 
        //to do signup process
        // encrypt the password 
        const {password} = req.body;// this password must encrpt so it in utils folder
        req.body.password = hashPassword(password);
        
        // insert to the DB
        const user = await createNewUser(req.body);

        if(user?._id){
            //create the unique user activation link and send to their email
        const message = "we have sent you the email activation link. please follow the step."
          return responseClient({req,res,message});
        }
        
        throw new Error("unable to create the account");
    } catch (error) {
        if(error.message.includes("E11000 duplicate key error collection")){
            error.message ="This email already exist. Try different email";
            error.statusCode = 400;
        }
       next(error)
        
    }
};