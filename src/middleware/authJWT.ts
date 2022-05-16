import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authJwt = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //get JWT from header
  const token = <string>request.headers["x-access-token"];
  let jwtpayload;
  // console.log(token)
  // console.log(process.env.JWT_SECRET)
  //try to validate the token and get data
  try {
    // console.log("one");
    jwtpayload = <any>jwt.verify(token, process.env.JWT_SECRET);
    // console.log("jwtpayload")
    response.locals.jwtpayload = jwtpayload;
  } catch (error) {
    //if token is not valid
    response.status(401).send();
    return;
  }

  //call the next middleware or controller
  next();
};
