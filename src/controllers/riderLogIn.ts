import jwt from "jsonwebtoken";
import { Rider } from "../entity/Rider";
import dbconnection from "../index";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const riderLogIn = (req: Request, res: Response) => {
  //get rider email and password

  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send({ Error: "Incomplete details" });
  }

  //get rider from the database

    dbconnection.then(async (connection) => {
        let rideRepository = connection.getRepository(Rider);

        //find the rider in the database

        await rideRepository.findOne({ email: req.body.email }).then((rider) => {
            //password checking
            bcrypt.compare(password, rider.password).then((result) => {
                if (result) {
                    //jwt
                    const token = jwt.sign(
                        { name: rider.name, email: rider.email },
                        process.env.JWT_SECRET,
                        { expiresIn: "1d" }
                    );

                    //token returned both as a header and a response body
                    res.setHeader("x-access-token", token);
                    res.json(token);
                } else {
                    res.status(400).send("Bad credentials")
                }
            });
        }).catch((error) => console.log(error));
    }).catch((error) => {
        console.log(error)
        res.status(400).send({ error: "correction" });
    });
};

export default riderLogIn;
