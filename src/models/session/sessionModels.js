import sessionSchema from "./sessionSchema.js";

// insert the user
export const createNewSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};
