import dbconnection from "..";
import { Rider } from "../entity/Rider";

const getRiders = (req, res) => {
    // res.send("A post request to the database");
    //get data from req body
    console.log(req.body)
    const {
        name,
        email,
        number,
        password,
        description
    }: {
        name: string;
        email: string;
        number: string;
        password: string;
        description: string
    } = req.body

    try {
        if (!(name && email && number)) {
            throw { Error: "Incomplete details" }
        }
        //adding data to the database
        dbconnection.then(async (connection) => {
            let ride = new Rider();
            ride.name = name;
            ride.email = email;
            ride.password = password;
            ride.phone_number = number;
            ride.description = description;

            await connection.manager.save(ride).then((ride) => {
                res.status(200).send({ "rider added": ride.name })
            })
                .catch((error) => {
                    res.status(402).send(error);
                })
                .catch((error) => {
                    if (error.code == "23505") {
                        res.status(400).send("Rider with the same credentials added, log in instead");
                    } else {
                        res.status(402).send(error)
                        console.log(error);
                    }
                })
        })
    } catch (error) {
        res.status(402).send({ "Error": "error" })
        console.log(error);
    }
}

export default getRiders