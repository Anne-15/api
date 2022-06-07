import dbconnection from "..";
import { Rider } from "../entity/Rider";
import { passwordStrength } from "check-password-strength";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
let secretPassword: string;

const getRiders = (req: Request, res: Response) => {
  // res.send("A post request to the database");
  //get data from req body
  // console.log(req.body);
  const {
    name,
    email,
    number,
    password,
  }: {
    name: string;
    email: string;
    number: string;
    password: string;
  } = req.body;

  //temporary id
  const id = new Date().getTime();

  try {
    if (!(name && email && number)) {
      throw { Error: "Incomplete details" };
    }

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

    //adding data to the database
    dbconnection.then(async (connection) => {
      let ride = new Rider();
      ride.name = name;
      ride.email = email;
      ride.password = secretPassword;
      ride.phone_number = number;
      //   console.log(ride);

      //jwt
      const token = await jwt.sign(
        { name: ride.name, email: ride.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      await connection.manager
        .save(ride)
        .then((ride) => {
          res.setHeader("x-access-token", token);
          res.json({
            // email: client.email,
            // password: client.password,
            accessToken: token,
          });
          res.status(200).send({ "rider added": ride.name });
        })
        .catch((error) => {
          res.status(402).send(error);
        })
        .catch((error) => {
          if (error.code == "23505") {
            res
              .status(400)
              .send("Rider with the same credentials added, log in instead");
          } else {
            res.status(402).send(error);
            console.log(error);
          }
        });
    });
  } catch (error) {
    res.status(402).send({ Error: "error" });
    console.log(error);
  }
};

export default getRiders;
