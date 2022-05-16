import dbconnection from "..";
import { Client } from "../entity/Client";
import jwt from "jsonwebtoken";

const myProfile = async (res, req) => {
  //connect to the database
  // const { email } = req.body;
  console.log(req.locals.jwtpayload.email);

  // const decodedToken = jwt.decode(req.header("x-access-token"), {
  //   complete: true,
  // });
  // console.log(decodedToken)
  
  try {
    dbconnection
      .then(async (connection) => {
        let userRepository = connection.getRepository(Client);

        await userRepository
          .findOne({ email: req.locals.jwtpayload.email })
          .then((client) => {
            // const { full_name, email, phone_number }: { full_name: string, email: string } = client;
            // const loggedClient = {full_name, email, phone_number}
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

export default myProfile;
