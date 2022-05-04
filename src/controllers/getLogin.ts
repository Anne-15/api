import jwt from "jsonwebtoken";
import dbconnection from "../index";
import { Client } from "../entity/Client";
import bcrypt from "bcrypt";

export const logIn = (req, res) => {
//   console.log(req.body);
  //get user name and password from the database
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send({ Error: "Incomplete details" });
  }
  //temporary id
  const id = new Date().getDate();

  //get user from database
  dbconnection
    .then(async (connection) => {
      let userRepository = connection.getRepository(Client);

      //find user in the database
      await userRepository
        .find({ email: email })
        .then((user) => {

          //password checking
          bcrypt.compare(password, user[0].password).then((result) => {
            if (result == true) {

              //jwt
              const token = jwt.sign(
                { full_name: user[0].full_name, email: user[0].email },
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
