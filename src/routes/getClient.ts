import express from "express";
import { getBusiness, getClients, getDelivery, getRetail, getProducts } from "../controllers/getUsers";

const router = express.Router();

router.post('/api/client', getClients);
router.post('/api/retailer', getRetail);
router.post('/api/business', getBusiness);
router.post('/api/delivery', getDelivery);
router.post('./api/business/:businessId/products', getProducts);

export {router as createUser}