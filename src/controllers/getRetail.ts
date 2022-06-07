// import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Retailer } from "../entity/Retailer";
import dbconnection from "../index";
import jwt, { JwtPayload } from "jsonwebtoken";

const getRetail = async (req: Request, res: Response) => {
  //get users email
  // const decodeToken: JwtPayload = jwt.decode(req.header("x-access-token"), {
  //   complete: true,
  // });

  try {
    dbconnection
      .then(async (connection) => {
        let userRepository = connection.getRepository(Retailer);
        await userRepository
          .find()
          .then((retail) => {
            res.send(retail);
            // console.log(retail);
          })
          .catch((error) => {
            res.status(402).send(error);
          });
      })
      .catch((error) => {
        res.status(402).send({ Error: "error" });
        console.log(error);
      });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
export default getRetail;
