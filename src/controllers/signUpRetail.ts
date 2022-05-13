import dbconnection from "..";
import { Retailer } from "../entity/Retailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { passwordStrength } from "check-password-strength";
let secretPassword: string;

export const signUpRetail = (req, res) => {
  //get data from request body
  const {
    full_name,
    email,
    password,
    phone_number,
    business_name,
    handle,
    business_description,
  }: {
    full_name: string;
    email: string;
    password: string;
    phone_number: number;
    business_name: string;
    handle: string;
    business_description: string;
  } = req.body;

  console.log(req.body)

  //temporary id
    const id = new Date().getTime();
    
  try {
    if (
      !(
        full_name &&
        email &&
        phone_number &&
        business_name &&
        business_description
      )
    ) {
      throw { Error: "Incomplete details" };
      }
      
    //strong password checking
    const strong_pass = passwordStrength(password);
    if (strong_pass.id == 0 || strong_pass.id == 1) {
      throw { Error: "Password is " + strong_pass.value };
    }

    //encrypt password
    bcrypt
      .hash(password, 12)
      .then((hash) => {
        secretPassword = hash;
        // console.log(hash);
      })
      .catch((error) => console.log(error));

    //adding a user
    dbconnection
      .then(async (connection) => {
        let retail = new Retailer();
        retail.full_name = full_name;
        retail.email = email;
        retail.password = secretPassword;
        retail.phone_number = phone_number;
        retail.business_name = business_name;
        retail.handle = handle;
        retail.description = business_description;

        //jwt
        const token = await jwt.sign(
          { id, email: retail.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        await connection.manager.save(retail).then((retail) => {
          res.setHeader("x-access-token", token);
          res.status(200).send({ "User added ": retail.full_name });
        });
      })
      .catch((error) => {
        //duplicate email check
        if (error.code == "23505") {
          res
            .status(400)
            .send({ Error: "Account with that email already exists" });
        } else {
          res.status(408).send({ Error: "error" });
          console.log(error);
        }
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

export default signUpRetail;