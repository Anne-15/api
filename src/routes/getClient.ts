import express from "express";
import { logIn } from "../controllers/getLogin";
import getOrders from "../controllers/getOrders";
import getSignUp from "../controllers/getSignUp";
import getUsers from "../controllers/getUsers";

const router = express.Router();

router.post('/login', logIn);
router.post('/myOrders', getOrders);
router.get('/users', getUsers);
router.post('/signup', getSignUp);
// router.post('/api/retailer', getRetail);
// router.post('/api/business', getBusiness);
// router.post('/api/delivery', getDelivery);
// router.post('./api/business/:businessId/products', getProducts);

export {router as createUser}