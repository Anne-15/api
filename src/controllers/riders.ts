import dbconnection from "..";
import { Rider } from "../entity/Rider";

const rider = (req, res) => {
    // res.send("A get request from the database");
    //getting data from the database
    try {
        //getting data from the database
        dbconnection.then(async (connection) => {
            let riderInfo = connection.getRepository(Rider);
            await riderInfo
                .find()
                .then((ride) => {
                    res.send(ride);
                    // console.log(ride);
                })
                .catch((error) => {
                    res.status(402).send({ "Error": "error" })
                    console.log(error)
            })
        })
            .catch((error) => {
                res.status(402).send({ "Error": "error loading" })
                console.log(error);
        })
    } catch (error) {
        res.status(402).send("error with the page");
        console.log(error)
    }
}

export default rider;