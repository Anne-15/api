import express from "express";
import { getSignUp } from "../controllers/getSignUp";
import { logIn } from "../controllers/getLogin";
import getOrders from "../controllers/getOrders";

const router = express.Router();

router.post('/signup', getSignUp);
router.post('/login', logIn);
router.post('/myOrders', getOrders);
// router.post('/api/retailer', getRetail);
// router.post('/api/business', getBusiness);
// router.post('/api/delivery', getDelivery);
// router.post('./api/business/:businessId/products', getProducts);

export {router as createUser}