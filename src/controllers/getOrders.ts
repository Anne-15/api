import dbconnection from "..";

const { Orders } = require("../entity/Orders");
const { Client } = require("../entity/Client");

const getOrders = async (req, res) => {
  //get data from request body
  // console.log(req.body);
  const {
    itemName,
    description,
    price,
    address,
    clientid,
    customerName,
    customerEmail,
    customerNumber,
  }: {
    itemName: string;
    description: string;
    price: number;
    address: string;
    clientid: number;
    customerName: string;
    customerEmail: string;
    customerNumber: number;
  } = req.body;
  try {
    if (!(itemName && customerName && customerNumber)) {
      throw { Error: "Incomplete details" };
    }
    //adding an order to the database
    dbconnection
      .then(async (connection) => {
        //get the client table
        let newClient = new Client();
        newClient.id = clientid;
        newClient.full_name = customerName;
        newClient.email = customerEmail;
        newClient.phone_number = customerNumber;

        let order = new Orders();
        order.item_name = itemName;
        order.description = description;
        order.price = price;
        order.address = address;
        order.client = newClient;

        await connection.manager.save(order).then((order) => {
          res.status(200).send({ "Order added ": order.item });
          // console.log(order.item);
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
