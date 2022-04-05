import http from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require("express");
import { createUser } from "./routes/getClient";

const app = express();
//connection to the database
const dbconnection = createConnection("automated");
export default dbconnection;
console.log("Connected!!");

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send("Automated package delivery app!!");
})
app.use(createUser);

//error async
// const errorHandler = require('./middleware/error-handler');
// const notFound = require('./middleware/notFound');
//routes
// app.use(errorHandler);
// app.use(notFound);

//server
const httpServer = http.createServer(app);
const PORT = 6060;
httpServer.listen(PORT, () => 
    console.log(`The server is running on port http://localhost:${PORT}`)
)