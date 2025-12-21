import { responseClient } from "../middleware/responseClient.js";
import { createNewSession } from "../models/session/sessionModels.js";
import { createNewUser } from "../models/user/userModels.js";
import { userActivationUrlEmail } from "../services/email/emailServices.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";

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
      const url = `http://localhost:5371/activate-user?sessionId=${session._id}&t=${session.token}`;

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
