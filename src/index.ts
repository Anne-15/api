import http from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import { createUser } from "./routes/getClient";

const app = express();

const connection = createConnection("automated");
export default connection;
console.log("Connected!!");

//middleware
app.use(express.json());
app.use(createUser);

//routes
app.get('/', (req, res) => {
    res.send("My task manager app");
})

//server
const httpServer = http.createServer(app);
const PORT = 6060;
httpServer.listen(PORT, () => 
    console.log(`The server is running on port ${PORT}`)
)