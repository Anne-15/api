import express from "express";
import { getBusiness, getClients, getDelivery, getRetail } from "../controllers/getUsers";
import { getProducts } from "../controllers/getProducts";
import { getSignUp } from "../controllers/getSignUp";
import { logIn } from "../controllers/getLogin";

const router = express.Router();

router.post('/signup', getSignUp);
router.post('/login', logIn);
// router.post('/api/products', getProducts);
// router.post('/api/retailer', getRetail);
// router.post('/api/business', getBusiness);
// router.post('/api/delivery', getDelivery);
// router.post('./api/business/:businessId/products', getProducts);

export {router as createUser}