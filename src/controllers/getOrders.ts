import dbconnection from "..";

const { Orders } = require("../entity/Orders");

const getOrders = async (req, res) => {
    //get data from request body
    const {
        item_name,
        description,
        order_number,
        price,
        customer_name,
        customer_number,
        address
    }: {
        item_name: string;
        description: string;
        order_number: number;
        price: number;
        customer_name: string;
        customer_number: number;
        address: string;
    } = req.body
    try {
        if(!(item_name && description && price && customer_name && customer_number)){
            throw {Error: "Incomplete details"}
        }
        //adding an order to the database
        dbconnection
        .then(async(connection) => {
            let order = new Orders();
            order.order_number = order_number;
            order.item_name = item_name;
            order.description = description;
            order.price = price;
            order.customer_name = customer_name;
            order.customer_number = customer_number;
            order.address = address;

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
                console.log(error); 
            }
        })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }

}

export default getOrders