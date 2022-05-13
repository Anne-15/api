// import jwt from "jsonwebtoken";
import { Retailer } from "../entity/Retailer";
import dbconnection from "../index";

const getRetail = async (req, res) => {
  //get users email
  // const decodeToken = jwt.decode(req.header("x-access-token"),{
  //     complete: true,
  // });

//   console.log(req.body);

  try {
    dbconnection
      .then(async (connection) => {
        let userRepository = connection.getRepository(Retailer);
        await userRepository
          .find()
          .then((retail) => {
            res.send(retail);
            console.log(retail);
          })
          .catch((error) => {
            res.status(402).send(error);
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
export default getRetail;
