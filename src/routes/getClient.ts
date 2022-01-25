import express from "express";
import { Client } from "../entity/Client";
const router = express.Router();

router.post('/api/client', async (req, res) => {
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
});

export {router as createClient}