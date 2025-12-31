import { responseClient } from "../middleware/responseClient.js";
import { verifyAccessJWT } from "../utils/jwt.js";
import { getSession } from "../models/session/sessionModels.js";
import { getUserByEmail } from "../models/user/userModels.js";

export const userAuthMiddleWare = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return responseClient({
        req,
        res,
        message: "Unauthorized",
        statusCode: 401,
      });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return responseClient({
        req,
        res,
        message: "Malformed token",
        statusCode: 401,
      });
    }

    const decoded = await verifyAccessJWT(token);
    if (!decoded || !decoded.email) {
      return responseClient({
        req,
        res,
        message: "Invalid token",
        statusCode: 401,
      });
    }

    const tokenSession = await getSession({ token });
    if (!tokenSession?._id) {
      return responseClient({
        req,
        res,
        message: "Session expired",
        statusCode: 401,
      });
    }

    const user = await getUserByEmail(decoded.email);
    if (!user?._id) {
      return responseClient({
        req,
        res,
        message: "User not found",
        statusCode: 404,
      });
    }

    req.userInfo = user;
    next();
  } catch (error) {
    console.error(error);
    return responseClient({
      req,
      res,
      message: "Internal server error",
      statusCode: 500,
    });
  }
};
