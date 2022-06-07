import { Request, Response } from "express";
import dbconnection from ".."
import { Orders } from "../entity/Orders"
import jwt, { JwtPayload } from "jsonwebtoken";

const MyOrders = (req: Request, res: Response) => {
    //getting data from the database
    // const decodeToken: JwtPayload = jwt.decode(req.header("x-access-token"), {
    //   complete: true,
    // });
    // console.log(req.body);
    try {
        dbconnection.then(async(connection) => {
            let red = connection.getRepository(Orders);
            await red
            .find()
            .then((cross) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.send(cross)
                // console.log(cross);
            })
            .catch((error) => {
                res.status(402).send(error)
            })
        })
        .catch((error) => {
            res.status(402).send({"Error":"error"})
            console.log(error)
        })
    } catch (error) {
        res.status(400).send({ "Incoming error code": "Error" });
        console.log(error);
    }
}
export default MyOrders