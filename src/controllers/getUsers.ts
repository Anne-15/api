import { Client } from "../entity/Client";
import jwt from "jsonwebtoken";
import dbconnection from "../index";

const getUsers = async (req, res) => {
        //get users email
        const decodeToken = jwt.decode(req.header("x-access-token"),{
            complete: true,
        });

        dbconnection.then(async(connection) => {
            let userRepository = connection.getRepository(Client);

            await userRepository
            .find({email: decodeToken.payload.email})
            .then((client) => {
                const{
                    id, 
                    full_name, 
                    email,
                    password,
                    phone_number
                }: {id: number; full_name: string; email: string; password: string; phone_number: number} = client[0];
                
                const userDetails = {id, full_name, email, password, phone_number};
                res.send(userDetails);
        });
    });
};
export default getUsers;

