import dbconnection from "..";

const { Orders } = require("../entity/Orders");

const getOrders = async (req, res) => {
    //get data from request body
    const {
        item,
        description,
        price,
        customer_name,
        customer_number
    }: {
        item: string;
        description: string;
        price: number;
        customer_name: string;
        customer_number: number;
    } = req.body
    try {
        if(!(item && description && price && customer_name && customer_number)){
            throw {Error: "Incomplete details"}
        }
        //adding an order to the database
        dbconnection
        .then(async(connection) => {
            let order = new Orders();
            order.item = item;
            order.description = description;
            order.price = price;
            order.customer_name = customer_name;
            order.customer_number = customer_number;

            await connection.manager.save(order).then((order) => {
                res.status(200).send({"Order added ": order.item});
                // console.log(order.item);
            });
        })
        .catch((error) => {
            if(error.code == "23505"){
                res.status(400).send({"Error": "Order with the same name added"});
            }else{
                res.status(402).send({"Error": "error"});
            }
        })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }

}

export default getOrders