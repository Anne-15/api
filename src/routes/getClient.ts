import express from "express";
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
import riderLogIn from "../controllers/riderLogIn";
import rider from "../controllers/riders";
import signUpRetail from "../controllers/signUpRetail";
import { authJwt } from "../middleware/authJWT";

const router = express.Router();
//business info routes 
router.post("/retail/login", logInRel); //log in
router.post("/retail/signup", signUpRetail); //sign up
router.post('/retailers', [authJwt], getRetail); //find all logged businesses
router.get("/orders/reports", MyOrders); //find all logged orders
router.post("/myOrders", [authJwt], getOrders); //creating an order and inserting to the database
router.get('/business/profile', [authJwt], businessProfile); //business profile

//user info routes
router.post("/login", logIn); //log in
router.post("/signup", getSignUp); //sign up
router.get('/users/profile', [authJwt], myProfile); //user profile
router.get("/users",[authJwt], getUsers); //get logged user with orders

//rider info routes
router.post("/rider/signup", getRiders); //sign up
router.post("/rider/login", riderLogIn); //log in
router.get('/rider/info',[authJwt], rider); //get logged riders with the orders
router.get('/riders/profile', [authJwt], getProfile); //rider profile

// router.delete('/delete/:id',[authJwt], Delete);

export {router as backend}