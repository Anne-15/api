import { passwordStrength } from "check-password-strength";
import dbconnection from "..";
import { Client } from "../entity/Client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "@hapi/joi";
import { Request, Response } from "express";
let secretPassword: string;

const getSignUp = async (req: Request, res: Response) => {
  //validation schema
  const schema = {
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
  };
  //get data from request body
  const {
    full_name,
    email,
    password,
    phone_number,
  }: {
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
  } = req.body;
  // console.log(req.body);

  //temporary id
  const id = new Date().getTime();
  try {
    if (!(full_name && email)) {
      throw { Error: "Incomplete details" };
    }

    //validating email
    // const { error } = Joi.validate(req.body, schema);
    // if (error) {
    //   res.status(400).send({ Error: "Bad credentials entered, check again" });
    //   console.log(error);
    // }

    //strong password checking <done>
    const strong_pass = passwordStrength(password);
    if (strong_pass.id == 0 || strong_pass.id == 1) {
      throw { Error: "Password is " + strong_pass.value };
    }

    //encrypt password <done>
    bcrypt
      .hash(password, 8)
      .then((hash) => {
        secretPassword = hash;
        // console.log(hash);
      })
      .catch((error) => console.log(error));

    //adding a user
    dbconnection
      .then(async (connection) => {
        let client = new Client();
        client.full_name = full_name;
        client.email = email;
        client.password = secretPassword;
        client.phone_number = phone_number;

        // console.log(client);

        //jwt
        const token = await jwt.sign(
          { full_name: client.full_name, email: client.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        await connection.manager.save(client).then((client) => {
          res.setHeader("x-access-token", token);
          res.json({
            // email: client.email,
            // password: client.password,
            accessToken: token,
          });
          res.status(200).send({ "User added ": client.full_name });
        });
      })
      .catch((error) => {
        //duplicate email check
        if (error.code == "23505") {
          //is working
          res
            .status(400)
            .send({ Error: "Account with that email already exists" });
        } else {
          res.status(400).send({ Error: "what's up!!" });
          console.log(error);
        }
      });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
export default getSignUp;
