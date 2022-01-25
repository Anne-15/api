import express from "express";
import { Retailer } from "../entity/Retailer";
const router = express.Router();

router.post('/api/retailer', async (req, res) => {
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
});

export {router as createRetail}