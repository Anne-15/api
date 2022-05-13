import express from "express";
import { check } from "express-validator";
import Delete from "../controllers/Delete";
import { logIn } from "../controllers/getLogin";
import { logInRel } from "../controllers/getLoginRel";
import getOrders from "../controllers/getOrders";
import Profile from "../controllers/getProfile";
import getRetail from "../controllers/getRetail";
import getRiders from "../controllers/getRiders";
import getSignUp from "../controllers/getSignUp";
import getUsers from "../controllers/getUsers";
import MyOrders from "../controllers/MyOrders";
import rider from "../controllers/riders";
import signUpRetail from "../controllers/signUpRetail";

const router = express.Router();

router.post('/login', logIn);
router.post('/retail/login', logInRel);
router.post('/myOrders', getOrders);
router.get('/orders/reports', MyOrders);
router.get('/users', getUsers);
router.post('/retailers', getRetail);
router.post('/signup', getSignUp);
router.post('/retail/signup', signUpRetail);
router.post('/rider', getRiders);
router.get('/rider/info', rider);
router.get('/:id', Profile);
router.delete('/:id', Delete);
// router.post('/api/retailer', getRetail);
// router.post('/api/business', getBusiness);
// router.post('/api/delivery', getDelivery);
// router.post('./api/business/:businessId/products', getProducts);

export {router as backend}