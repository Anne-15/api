import express from "express";
import { getBusiness, getClients, getDelivery, getRetail } from "../controllers/getUsers";

const router = express.Router();

router.post('/api/client', getClients);
router.post('/api/retailer', getRetail);
router.post('/api/business', getBusiness);
router.post('/api/delivery', getDelivery);

export {router as createUser}