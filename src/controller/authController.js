import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteSession,
  getSession,
} from "../models/session/sessionModels.js";
import { createNewUser, getUserByEmail, upDateUser } from "../models/user/userModels.js";
import { passwordResetOTPNotificationSendMail, userAccountActivatedNotificationEmail, userActivationUrlEmail } from "../services/email/emailServices.js";
import { comaparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getJwt } from "../utils/jwt.js";
import { randomGenerator } from "../utils/randomGenerator.js";
import { token } from "morgan";



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
    const { email } = req.body;

    if (!email) {
      return res.json({
        status: 400,
        message: "Email is required",
      });
    }

    // get user
    const user = await getUserByEmail(email);

    if (!user?._id) {
      return res.json({
        status: 404,
        message: "User not found",
      });
    }

    // generate OTP (string)
    const otp = String(randomGenerator());
    console.log("OTP:", otp);

    // store OTP in session
    const session = await createNewSession({
      token: otp,
      association: email,
      expire: new Date(Date.now() + 1000 * 60 * 5), // 5 mins
    });

    if (!session?._id) {
      return res.json({
        status: 500,
        message: "Failed to generate OTP",
      });
    }

    // send email
    await passwordResetOTPNotificationSendMail({
      email,
      name: user.fName,
      otp,
    });

    return res.json({
      status: 200,
      message: "OTP has been sent to your email. Please check it.",
    });
  } catch (error) {
    console.log(error);
    next(error); 
  }
};



//controller for reset password 
export const resetNewPassword = async(req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    console.log(email,password,otp);

    //checking the opt in session tabel
    const session = await getSession({
      token:otp,
      association:email
    })
    if(!token){
      return res.json({
        status:400,
        message :"Token has been expire. Resend it."
      })
    }
    //encrypt the password 
    if(session?._id){
      const hassPass = hashPassword(password)
      console.log(hassPass)
      //update the user 
      const user  = await  upDateUser({email},{password:hassPass})
      if(user?._id){

       //send email notification
       userAccountActivatedNotificationEmail({email,name:user.fName})

        return responseClient({
          req,
          res,
          message :"You have successfully updated Password. "
        })
      }
    }
    res.json({
      status: 200,
      message: "todo the reset"
    });

  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: error.message
    });
    next(error);
  }
};

