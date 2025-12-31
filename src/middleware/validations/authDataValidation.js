import { validateData } from "./jioValidations.js";
import joi from "joi"

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
      sessionId: joi.string().required(),
      t: joi.string().required(),
    }

    validateData({req,res,next,obj});
}

export const loginDataValidation = (req, res, next) => {

    const obj ={
      email: joi.string().email().required(),
      password: joi.string().required(),
    }

    validateData({req,res,next,obj});
  }