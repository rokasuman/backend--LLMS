import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/sessionModels.js";
import { upDateUser } from "../models/user/userModels.js";

// generate access token
export const createAccessTokenJWT = async (email) => {
  const token = jwt.sign(
    { email },
    process.env.ACCESSJWT_SECRET,
    { expiresIn: "15m" }
  );

  const sessionObj = {
    token,
    association: email,
    expire: new Date(Date.now() + 15 * 60 * 1000),
  };

  const newSession = await createNewSession(sessionObj);
  return newSession?._id ? token : null;
};

// verify access token
export const verifyAccessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESSJWT_SECRET);
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return null;
  }
};

// generate refresh token
export const createRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign(
    { email },
    process.env.REFRESHJWT_SECRET,
    { expiresIn: "30d" }
  );

  const user = await upDateUser({ email }, { refreshJWT });
  return user?._id ? refreshJWT : null;
};

// get both tokens
export const getJwt = async (email) => {
  return {
    accessJWT: await createAccessTokenJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};
