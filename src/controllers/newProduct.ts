import { Request, Response } from "express";
import dbconnection from "..";
import { Product } from "../entity/Products";
import jwt, { JwtPayload } from "jsonwebtoken";

const newProduct = (req: Request, res: Response) => {

  // const decodeToken: JwtPayload = jwt.decode(req.header("x-access-token"), {
  //   complete: true,
  // });

  //get product from the request body.
  const {
    number,
    name,
    price,
    status,
  }: { number: string; name: string; price: string; status: string } = req.body;


  try {
    if (!(name && price && status)) {
      throw { Error: "Incomplete details" };
    }

    //adding a product to the database
    dbconnection
      .then(async (connection) => {
        let prod = new Product();
        prod.number = number;
        prod.name = name;
        prod.price = price;
        prod.status = status;

        await connection.manager.save(prod).then((prod) => {
          res.status(200).send({ product: prod.name });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(400).send({ Error: "something went wrong" });
    console.log(error)
  }
};

export default newProduct;
