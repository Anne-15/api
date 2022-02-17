import jwt from "jsonwebtoken";
import { Retailer } from "../entity/Retailer";
import dbconnection from "../index";

const getRetail = async (req, res) => {
        //get users email
        const decodeToken = jwt.decode(req.header("x-access-token"),{
            complete: true,
        });

        try {
            //db connection
            dbconnection.then(async(connection) => {
            let userRepository = connection.getRepository(Retailer);

            await userRepository
            .find({email: decodeToken.payload.email})
            .then((retail) => {
                const{
                    id, 
                    full_name, 
                    email,
                    password,
                    phone_number,
                    business_name,
                    business_description
                }: {
                    id: number; 
                    full_name: string; 
                    email: string; 
                    password: string; 
                    phone_number: number;
                    business_name: string;
                    business_description: string;
                } = retail[0];
                
                const userDetails = {id, full_name, email, password, phone_number, business_name, business_description};
                res.send(userDetails);
            });
        });
        } catch (error) {
            res.status(400).send(error);
        }
    
};
export default getRetail;