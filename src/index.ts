import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import { createClient } from "./routes/getClient";
import { createRetail } from "./routes/getRetailer";

const connection = createConnection();
export default connection;

console.log("Connected!!");

const app = express();

app.use(express.json());

app.use(createClient);
app.use(createRetail);