import { Request, Response } from "express";
import { Client } from "../entity/Client";
import dbconnection from "../index";
import jwt, { JwtPayload } from "jsonwebtoken";

const getUsers = (req: Request, res: Response) => {
  // console.log(req.body);
  //get users email
  // const decodeToken: JwtPayload = jwt.decode(req.header("x-access-token"), {
  //   complete: true,
  // });
  // console.log(decodeToken.payload.email);

  try {
    dbconnection
      .then(async (connection) => {
        let userRepository = connection.getRepository(Client);

        await userRepository
          .find()
          .then((client) => {
            res.send(client);
            console.log(client);
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
export default getUsers;
