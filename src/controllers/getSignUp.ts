import dbconnection from "..";
import { Client } from "../entity/Client";
// let secretPassword: string;
import bcrypt from "bcrypt";

const getSignUp = async (req, res) => {
    //get data from request body
    const {
        full_name,
        email,
        password,
        phone_number
    }: {
        full_name: string;
        email: string;
        password: string;
        phone_number: number;
    } = req.body;
    try {
        if(!(full_name && email && password && phone_number)){
            throw {Error: "Incomplete details"};
        }
        //strong password checking
        //encrypt password
        // bcrypt
        // .hash(password, 10)
        // .then((hash) => (secretPassword = hash))
        // .catch((error) => console.log(error))

        //adding a user
        dbconnection
        .then(async(connection) => {
            let client = new Client();
            client.full_name = full_name;
            client.email = email;
            client.password = password;
            client.phone_number = phone_number;

            await connection.manager.save(client).then((client) => {
                res.status(200).send({"User added ": client.full_name})
            });
        })
        .catch((error) => {
        //duplicate email check
            if(error.code == "23505"){
                res.status(400).send({"Error": "Account with that email already exists"});
            }else{
                res.status(408).send({"Error": "error"});
            }
    });
    }catch (error) {
        res.status(400).send(error);
}
}
export default getSignUp

