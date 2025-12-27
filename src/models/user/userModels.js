import userSchema from "./userSchema.js";

// insert the user
export const createNewUser = (userObj) => {
  return userSchema(userObj).save();
};


//update the user 

export const upDateUser = (filter,update) => {
  return userSchema.findOneAndUpdate(filter,update, {new:true});
};