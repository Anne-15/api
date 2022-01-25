import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import { createUser } from "./routes/getClient";

const connection = createConnection();
export default connection;

console.log("Connected!!");

const app = express();

app.use(express.json());

app.use(createUser);