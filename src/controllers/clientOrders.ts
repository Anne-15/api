import dbconnection from "..";
import { Client } from "../entity/Client";

const clientOrders = (res, req) => {
  try {
    dbconnection
      .then(async (connection) => {
        let red = connection.getRepository(Client);
        await red
          .find()
          .then((cross) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(cross);
            console.log(cross);
          })
          .catch((error) => {
            res.status(402).send(error);
          });
      })
      .catch((error) => {
        res.status(402).send({ Error: "error" });
        // console.log(error)
      });
  } catch (error) {
    res.status(400).send({ "Incoming error code": "Error" });
    // console.log(error);
  }
};

export default clientOrders;
