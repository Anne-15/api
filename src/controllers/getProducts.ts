// const { Business } = require ("../entity/Business");
const { Product } = require ("../entity/Product");

export const getProducts = async (req, res) => {
    //get data from request body
    const {
        product_name,
        description,
        product_price
    } = req.body
    const product = Product.create({
        product_name,
        description,
        product_price
    })
    await product.save()
    return res.json(product);
    
    //testing
    // res.status(200).json({msg: 'products route'})
}