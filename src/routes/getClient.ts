import express from "express";
import allProducts from "../controllers/allProducts";
import businessProfile from "../controllers/businessProfile";
import logIn from "../controllers/getLogin";
import { logInRel } from "../controllers/getLoginRel";
import getOrders from "../controllers/getOrders";
import getProfile from "../controllers/getProfile";
import getRetail from "../controllers/getRetail";
import getRiders from "../controllers/getRiders";
import getSignUp from "../controllers/getSignUp";
import getUsers from "../controllers/getUsers";
import MyOrders from "../controllers/MyOrders";
import myProfile from "../controllers/myProfile";
import newProduct from "../controllers/newProduct";
import oneProduct from "../controllers/oneProduct";
import riderLogIn from "../controllers/riderLogIn";
import rider from "../controllers/riders";
import signUpRetail from "../controllers/signUpRetail";
import { authJwt } from "../middleware/authJWT";

const router = express.Router();
//business info routes 
router.post("/retail/login", logInRel); //log in
router.post("/retail/signup", signUpRetail); //sign up

router.get('/business/profile', businessProfile); //business profile
router.get('/retailers', getRetail); //find all logged businesses

router.post("/myOrders", getOrders); //creating an order and inserting to the database
router.get("/orders/reports", MyOrders); //find all logged orders per business

router.post('/products', newProduct); //adding a product to the database
router.get('/products/all', allProducts); //get all products in the database
router.get('/products/one', oneProduct); //get one product in the database

//user info routes
router.post("/login", logIn); //log in
router.post("/signup", getSignUp); //sign up
router.get('/users/profile', myProfile); //user profile

router.get("/users", getUsers); //get all logged user 

//rider info routes
router.post("/rider/signup", getRiders); //sign up
router.post("/rider/login", riderLogIn); //log in
router.get('/riders/profile', getProfile); //rider profile
router.get('/rider/info', rider); //get all logged riders

export {router as backend}