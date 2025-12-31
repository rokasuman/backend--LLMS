import sessionSchema from "./sessionSchema.js";

// insert the user
export const createNewSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};

// deleting the sessions
export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
//geting the user by email
export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};


