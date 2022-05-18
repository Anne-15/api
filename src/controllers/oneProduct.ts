import { Request, Response } from "express";
import dbconnection from "..";
import { Product } from "../entity/Products";

const oneProduct = (req: Request, res: Response) => {
  try {
    dbconnection
      .then(async (connection) => {
        let oneprodRepository = connection.getRepository(Product);
        await oneprodRepository
          .findOne({ number: req.body.number })
          .then((product) => {
            res.send(product);
          })
          .catch((error) => {
            res.status(402).send(error);
            console.log(error);
          });
      })
      .catch((error) => {
        res.status(402).send({ Error: "Error" });
        console.log(error);
      });
  } catch (error) {
    res.status(400).send({ Error: "error" });
    console.log(error);
  }
};

export default oneProduct;
