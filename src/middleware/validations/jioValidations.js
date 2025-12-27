import joi from "joi";
import { responseClient } from "../responseClient.js";

export const validateData = ({ req, res, next, obj }) => {
  const schema = joi.object(obj);
  const { error } = schema.validate(req.body);

  if (error) {
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }

  next();
};

