import http from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import { createUser } from "./routes/getClient";

// import { createUser } from "./routes/getClient";

const app = express();

const dbconnection = createConnection("automated");
export default dbconnection;
console.log("Connected!!");

//middleware
app.use(express.json());

//error async
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/notFound');

//routes
app.get('/', (req, res) => {
    // console.log('[TEST]!');
    res.send("Automated package delivery app!! <a href = '/api/products'>My Products</a>");
})

app.use(createUser);

//routes
// app.use(errorHandler);
// app.use(notFound);

//server
const httpServer = http.createServer(app);
const PORT = 6060;
httpServer.listen(PORT, () => 
    console.log(`The server is running on port ${PORT}`)
)