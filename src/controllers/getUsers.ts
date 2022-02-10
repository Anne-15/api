const { Client } = require ("../entity/Client");
const { Retailer } = require ("../entity/Retailer");
const { Delivery } = require ("../entity/Delivery");
const { Business } = require ("../entity/Business");
const { Product } = require ("../entity/Product");

export const getClients = async (req, res) => {
    const{
        firstName,
        lastName,
        phoneNumber,
        email
    } = req.body;
    const client = Client.create({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email
    })
    await client.save()
    return res.json(client);
}

export const getRetail = async (req, res) => {
    const{
        firstName,
        lastName,
        phoneNumber,
        email,
        igHandle
    } = req.body;
    const retail = Retailer.create({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        ig_handle: igHandle
    })
    await retail.save()
    return res.json(retail);
}

export const getBusiness = async (req, res) => {
   
}

export const getDelivery = async (req, res) => {
    const {
        firstName,
        lastName,
        phoneNumber
    } = req.body
    const deliver = Delivery.create({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
    })
    await deliver.save()
    return res.json(deliver)
}

export const getProducts = async (req, res) => {
    const { businessId } = req.params
    const { productName, description, productPrice } = req.body
    const business = await Business.findOne(parseInt(businessId));
    if(!business){
        return res.json({
            msg: "Business not found"
        })
    }
    const product = Product.save({
        product_name: productName,
        description,
        product_price: productPrice
        // business_id: businessId
    })
}