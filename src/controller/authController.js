import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/sessionModels.js";
import { createNewUser, getUserByEmail, upDateUser } from "../models/user/userModels.js";
import { passwordResetOTPNotificationSendMail, userAccountActivatedNotificationEmail, userActivationUrlEmail } from "../services/email/emailServices.js";
import { comaparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getJwt } from "../utils/jwt.js";
import { randomGenerator } from "../utils/randomGenerator.js";



export const insertNewUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    const user = await createNewUser(req.body);

    if (!user?._id) {
      throw new Error("Unable to create the account");
    }

    const session = await createNewSession({
      token: uuidv4(),
      association: user.email,
    });

    if (session?._id) {
      const url = `http://localhost:5173/activate-user?sessionId=${session._id}&t=${session.token}`;

      console.log(url);

      // EMAIL MUST NOT BREAK SIGNUP
      try {
        await userActivationUrlEmail({
          email: user.email,
          name: user.fname,
          url,
        });
      } catch (emailError) {
        console.error("Activation email failed:", emailError.message);
      }
    }

    return responseClient({
      req,
      res,
      message:
        "We have sent you the email activation link. Please follow the steps.",
    });
  } catch (error) {
    if (res.headersSent) return;

    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "This email already exists. Try a different email.";
      error.statusCode = 400;
    }

    next(error);
  }
};

export const activeUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    console.log(sessionId, t);

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });
    if (session?._id) {
      // update the user
      const user = await upDateUser(
        {
          email: session.association
        },
        {
          status: "active"
        }
      );
      if (user?._id) {
        //send email notificaion
        await userAccountActivatedNotificationEmail({
          email: user.email,
          name: user.fName,
          
        });

       
        const message =
          "Your account has been activated you may login now";
        return responseClient({ req, res, message });
      }
    }
    const message = "Invaild link or token expire !"
    const statusCode = 400;
    responseClient({req,res,message,statusCode})
  } catch (error) {
    next(error);
  }
};


export const loginUser =async (req,res) =>{
  try {
    const {email,password} = req.body;
    console.log(email,password)
    // getting user by email
    const user = await getUserByEmail(email);
   
    if(user?._id){
      console.log(user);
    }
   
     // comparing the password imported from bcrypt
     const isPassMatch = comaparePassword(password,user.password)
      
     if(isPassMatch){
      console.log("user authenticated successfully")
     }
     //creating the jwts
     const jwts = await getJwt(email)

     // respnose the jwts
     return responseClient({
      req,
      res,
      message:"You have successfully login",
      payload:jwts,
     })

  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 400,
      message :error.message
    })
  }

}

//controller for opt endpint 
export const generateOTP = async (req, res, next) => {
  try {
    // getting the user by email
    const { email } = req.body;
    const user = await getUserByEmail(email);
    console.log(user);

    if (user?._id) {
      // generating the OTP
      const otp = randomGenerator();
      console.log(otp);

      // store in session table
      const session = await createNewSession({
        token: otp,
        association: email,
        expire:new Date(Date.now() + 1000*60*5) // 5mins 
      });

      // checking the session has an id
      if (session?._id) {
        console.log(session);
        //seding email to user
        const info = await passwordResetOTPNotificationSendMail({
          email,name:user.fName,otp
        })
        console.log(info)
      }
    }

    res.json({
      status: 200,
      message: "OTP has been sent to your email. Please check it.",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
