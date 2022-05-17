import dbconnection from "..";
import { Rider } from "../entity/Rider";
import { Client } from "../entity/Client";
import { Orders } from "../entity/Orders";
import { Request, Response } from "express";

const getOrders = async (req: Request, res: Response) => {
  //get data from request body
  // console.log(req.body);
  const {
    itemName,
    description,
    price,
    address,
  }: {
    itemName: string;
    description: string;
    price: number;
    address: string;
  } = req.body;

  // console.log(req.body);
  try {
    if (!(itemName && description && address)) {
      throw { Error: "Incomplete details" };
    }

    //adding an order to the database
    dbconnection
      .then(async (connection) => {
        let clientRepository = connection.getRepository(Client);
        let rideReppository = connection.getRepository(Rider);

        let getClient = await clientRepository.findOne({ email: req.body.clientId });
        let getRider = await rideReppository.findOne({ email: req.body.rideId });

        // console.log(getClient);
        // console.log(getRider);

        let order = new Orders();
        order.item_name = itemName;
        order.description = description;
        order.price = price;
        order.address = address;
        order.client = getClient;
        order.ride = getRider;

        await connection.manager.save(order).then((order) => {
          res.status(200).send({ "Order added ": order.item_name });
          // console.log(order.item_name);
        });
      })
      .catch((error) => {
        if (error.code == "23505") {
          res.status(400).send({ Error: "Order with the same name added" });
        } else {
          res.status(402).send({ Error: "error" });
          console.log(error);
        }
      });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export default getOrders;
