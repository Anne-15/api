import { createConnection } from "typeorm";
const jsonProducts = require('./products.json');

const connectionDB = createConnection('automated');
export default connectionDB
console.log("Connected!!!");



