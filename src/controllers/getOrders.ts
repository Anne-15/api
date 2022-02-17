const { Orders } = require("../entity/Orders");

const getOrders = async (req, res) => {
    const {
        item,
        description,
        product_price,
        customer_name,
        customer_number
    } = req.body
    const orders = Orders.create({
        item,
        description,
        product_price,
        customer_name,
        customer_number
    })
    await orders.save()
    return res.json(orders);
    // res.send({msg: "Getting your orders"});

}

export default getOrders