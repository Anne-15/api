import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbconnection from "../index";
import { Retailer } from "../entity/Retailer";
import { Request, Response } from "express";

export const logInRel = (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  // console.log(email, password);
  if (!(email && password)) {
    res.status(400).send({ Error: "Incomplete details" });
  }
  //temporary id
  const id = new Date().getDate();
  //get user from database
  dbconnection
    .then(async (connection) => {
      let userRepository = connection.getRepository(Retailer);

      await userRepository
        .findOne({ email: req.body.email })
        .then((retail) => {
          //password checking
          bcrypt.compare(password, retail[0].password).then((result) => {
            if (result == true) {
              //jwt
              const token = jwt.sign(
                { full_name: retail.full_name, email: retail.email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              //token returned as a header
              res.setHeader("x-access-token", token);
              res.json(token);
            } else {
              res.status(401).send({ Error: "Wrong credentials" });
            //   console.log(Error);
            }
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ Error: "Correction" });
    });
};
