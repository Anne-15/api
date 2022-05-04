import { Client } from "../entity/Client";
import dbconnection from "../index";

const getUsers = async (req, res) => {
    // console.log(req.body);
        //get users email
        // const decodeToken = jwt.decode(req.header("x-access-token"),{
        //     complete: true,
        // });
        try {
            dbconnection.then(async(connection) => {
                let userRepository = connection.getRepository(Client);

                await userRepository
                .find()
                .then((client) => {
                    res.send(client);
                    // console.log(client);
                })
                .catch((error) => {
                    res.status(402).send(error);
                })
        })
        .catch((error) => {
            res.status(402).send({"Error":"error"});
            console.log(error);
        })
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
        }
};
export default getUsers;

