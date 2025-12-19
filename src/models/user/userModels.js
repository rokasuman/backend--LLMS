import userSchema from "./userSchema.js";

// insert the user
export const createNewUser = (userObj) => {
  return userSchema(userObj).save();
};
