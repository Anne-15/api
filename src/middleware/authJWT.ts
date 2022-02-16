import { NextFunction, Request, Response } from "express";
import { jwt } from "jsonwebtoken";

export const authJwt = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    //get JWT from header
    const token = request.headers["x-access-token"];
    let jwtpayload;

    //try to validate the token and get data
    try {
        jwtpayload = <any> jwt.verify(token, process.env.JWT_SECRET);
        response.locals.jwtpayload = jwtpayload;
    } catch (error) {
        //if token is not valid
        response.status(401).send();
        return;
    }

    //call the next middleware or controller
    next();
};