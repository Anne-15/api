import { Request, Response } from "express";
import dbconnection from "..";
import { Product } from "../entity/Products";

const allProducts = (req: Request, res: Response) => {
  try {
    dbconnection
      .then(async (connection) => {
        let prodRepository = connection.getRepository(Product);
        await prodRepository
          .find()
          .then((prod) => res.send(prod))
          .catch((error) => {
            res.status(402).send(error);
            console.log(error);
          });
      })
      .catch((error) => {
        res.status(402).send(error);
        console.log(error);
      });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export default allProducts;
