import { validateData } from "./jioValidations.js";


export const newValiDataValidation = (req, res, next) => {
  const obj = {
    fName: joi.string().required(),
    lName: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    phone: joi.string().required(),
    password: joi.string().required(),
  };

  return validateData({ req, res, next, obj });
};

export const aciveUserDataValidation = (req, res, next) => {

    const obj ={
      sessionId: joi.string().min(10).max(30).required(),
      t: joi.string().min(10).max(30).required(),
    }

    validateData({req,res,next,obj});
}
