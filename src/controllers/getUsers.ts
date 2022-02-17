import { Client } from "../entity/Client";
import jwt from "jsonwebtoken";
import dbconnection from "../index";
import { Profile } from "../entity/Profile";

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
                    phone_number,
                    profile
                }: {
                    id: number; 
                    full_name: string; 
                    email: string; 
                    password: string; 
                    phone_number: number
                    profile: Profile
                } = client[0];
                
                const userDetails = {id, full_name, email, password, phone_number, profile};
                res.send(userDetails);
        });
    });
};
export default getUsers;

