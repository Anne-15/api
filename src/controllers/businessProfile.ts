import { Request, Response } from "express";
import dbconnection from "..";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Retailer } from "../entity/Retailer";

const businessProfile = async (req: Request, res: Response) => {
  // decode token
  const decodedToken: JwtPayload = jwt.decode(req.header("x-access-token"), {
    complete: true,
  });
  console.log(decodedToken);
  //connect to the database;

  try {
    dbconnection
      .then(async (connection) => {
        let userRepository = connection.getRepository(Retailer);

        await userRepository
          .findOne({ email: decodedToken.payload.email })
          .then((owner) => {
            res.send(owner);
            console.log(owner);
          })
          .catch((error) => {
            res.status(402).send(error);
            console.log(error);
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

export default businessProfile;
