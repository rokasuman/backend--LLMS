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

  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 15 * 60 * 1000),
  };

  const newSession = await createNewSession(obj);
  return newSession?._id ? token : null;
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
//importing the created and refresh token in getJWT function
export const getJwt = async (email) => {
  return {
    accessJWT: await createAccessTokenJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};
