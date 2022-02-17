import express from "express";
import { logIn } from "../controllers/getLogin";
import { logInRel } from "../controllers/getLoginRel";
import getOrders from "../controllers/getOrders";
import getRetail from "../controllers/getRetail";
import getSignUp from "../controllers/getSignUp";
import getUsers from "../controllers/getUsers";
import { signUpRetail } from "../controllers/signUpRetail";

const router = express.Router();

router.post('/login', logIn);
router.post('/retail/login', logInRel);
router.post('/myOrders', getOrders);
router.get('/users', getUsers);
router.post('/retailers', getRetail);
router.post('/signup', getSignUp);
router.post('/retail/signup', signUpRetail);
// router.post('/api/retailer', getRetail);
// router.post('/api/business', getBusiness);
// router.post('/api/delivery', getDelivery);
// router.post('./api/business/:businessId/products', getProducts);

export {router as createUser}