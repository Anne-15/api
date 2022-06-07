import jwt from "jsonwebtoken";
import dbconnection from "../index";
import { Client } from "../entity/Client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const logIn = (req: Request, res: Response) => {
  //get user name and password from the database
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send({ Error: "Incomplete details" });
  }

  //temporary id
  // const id = new Date().getDate();

  //get user from database
  dbconnection
    .then(async (connection) => {
      let userRepository = connection.getRepository(Client);

      //find user in the database
      await userRepository
        .findOne({ email: req.body.email })
        .then((user) => {

          //password checking
          bcrypt.compare(password, user.password).then((result) => {
            if (result == true) {

              //jwt
              const token = jwt.sign(
                { full_name: user.full_name, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );

              //token returned both as a header and response body
              res.setHeader("x-access-token", token);
              res.json(token);
            } else {
              res.status(400).send("Bad credentials")
              // console.log(error);
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



export default logIn;
